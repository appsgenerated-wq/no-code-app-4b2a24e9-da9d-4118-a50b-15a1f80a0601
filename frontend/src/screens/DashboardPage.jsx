import React, { useState, useEffect, useCallback } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [grapeVarieties, setGrapeVarieties] = useState([]);
  const [tastingNotes, setTastingNotes] = useState({});
  const [selectedGrape, setSelectedGrape] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteForm, setNoteForm] = useState({ rating: 3, notes: '' });

  const fetchGrapeVarieties = useCallback(async () => {
    setLoading(true);
    try {
      const response = await manifest.from('GrapeVariety').find({ sort: { name: 'asc' } });
      setGrapeVarieties(response.data);
    } catch (error) {
      console.error('Failed to fetch grape varieties:', error);
    } finally {
      setLoading(false);
    }
  }, [manifest]);

  const fetchTastingNotes = useCallback(async (grapeId) => {
    if (!grapeId) return;
    try {
      const response = await manifest.from('TastingNote').find({
        filter: { grapeVariety: { id: grapeId } },
        include: ['author'],
        sort: { createdAt: 'desc' },
      });
      setTastingNotes(prev => ({ ...prev, [grapeId]: response.data }));
    } catch (error) {
      console.error(`Failed to fetch notes for grape ${grapeId}:`, error);
    }
  }, [manifest]);

  useEffect(() => {
    fetchGrapeVarieties();
  }, [fetchGrapeVarieties]);

  const handleSelectGrape = (grape) => {
    setSelectedGrape(grape);
    if (!tastingNotes[grape.id]) {
      fetchTastingNotes(grape.id);
    }
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGrape || !noteForm.notes) return;

    try {
      const newNote = await manifest.from('TastingNote').create({
        ...noteForm,
        grapeVariety: selectedGrape.id,
        author: user.id,
      });
      // Re-fetch notes to show the new one
      fetchTastingNotes(selectedGrape.id);
      setNoteForm({ rating: 3, notes: '' });
    } catch (error) {
      console.error('Failed to create tasting note:', error);
      alert('Could not save your note. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍇</span>
              <span className="text-xl font-bold text-gray-900">GrapeVine Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name} ({user.role})</span>
              <a href="/admin" target="_blank" rel="noopener noreferrer" className="text-sm font-medium bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-300 transition-colors">Admin Panel</a>
              <button onClick={onLogout} className="text-sm font-medium bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition-colors">Logout</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grape List */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Grape Varieties</h2>
                {(user.role === 'admin' || user.role === 'sommelier') && (
                    <a href="/admin/GrapeVariety/new" target="_blank" className="text-blue-600 hover:text-blue-800">
                        <PlusCircleIcon className="h-6 w-6" />
                    </a>
                )}
            </div>
            {loading ? <p>Loading varieties...</p> : (
              <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
                {grapeVarieties.map(grape => (
                  <li key={grape.id}>
                    <button 
                      onClick={() => handleSelectGrape(grape)}
                      className={`w-full text-left p-3 rounded-md transition-colors ${selectedGrape?.id === grape.id ? 'bg-blue-100 text-blue-800 font-semibold' : 'hover:bg-gray-50'}`}>
                      {grape.name} <span className={`text-xs px-2 py-0.5 rounded-full ${grape.color === 'Red' ? 'bg-red-100 text-red-800' : grape.color === 'White' ? 'bg-yellow-100 text-yellow-800' : 'bg-pink-100 text-pink-800'}`}>{grape.color}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Grape Details and Notes */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            {selectedGrape ? (
              <div>
                <div className="border-b pb-4 mb-4">
                    <div className="flex items-start space-x-4">
                        {selectedGrape.image && <img src={selectedGrape.image.thumbnail.url} alt={selectedGrape.name} className="h-24 w-24 rounded-lg object-cover" />}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{selectedGrape.name}</h2>
                            <p className="text-sm text-gray-500">Origin: {selectedGrape.origin}</p>
                            <p className="mt-2 text-gray-700">{selectedGrape.description}</p>
                        </div>
                    </div>
                </div>

                {/* Add Tasting Note Form */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Add Your Tasting Note</h3>
                  <form onSubmit={handleNoteSubmit} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rating</label>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <StarIcon key={star} 
                            onClick={() => setNoteForm({...noteForm, rating: star})}
                            className={`h-6 w-6 cursor-pointer ${noteForm.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}/>
                        ))}
                      </div>
                    </div>
                    <textarea 
                      value={noteForm.notes}
                      onChange={e => setNoteForm({...noteForm, notes: e.target.value})}
                      placeholder={`What did you think of ${selectedGrape.name}?`}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                      required
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm">Save Note</button>
                  </form>
                </div>

                {/* Tasting Notes List */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Community Notes</h3>
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                        {tastingNotes[selectedGrape.id] ? (
                            tastingNotes[selectedGrape.id].length > 0 ? (
                                tastingNotes[selectedGrape.id].map(note => (
                                    <div key={note.id} className="bg-gray-50 p-3 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-sm text-gray-800">{note.author.name}</p>
                                            <div className="flex items-center">
                                                {[...Array(note.rating)].map((_, i) => <StarIcon key={i} className="h-4 w-4 text-yellow-400" />)}
                                                {[...Array(5 - note.rating)].map((_, i) => <StarIcon key={i} className="h-4 w-4 text-gray-300" />)}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mt-1">{note.notes}</p>
                                    </div>
                                ))
                            ) : <p className="text-sm text-gray-500">No notes yet. Be the first!</p>
                        ) : <p className="text-sm text-gray-500">Loading notes...</p>}
                    </div>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="text-4xl mb-4">🍇</span>
                <h2 className="text-xl font-semibold text-gray-800">Select a Grape Variety</h2>
                <p className="text-gray-500">Choose a grape from the list on the left to see its details and tasting notes.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
