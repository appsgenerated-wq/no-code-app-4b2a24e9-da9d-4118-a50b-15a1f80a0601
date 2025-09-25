# GrapeVine - Grape Variety Catalog

Welcome to GrapeVine, a full-stack application for exploring grape varieties and logging tasting notes. This application is built with a React frontend and a 100% Manifest-powered backend.

## Features

- **User Authentication**: Secure user login and registration powered by Manifest's built-in `authenticable` feature.
- **Role-Based Access**: Three user roles (enthusiast, sommelier, admin) with distinct permissions managed by Manifest's `access_policies`.
- **Grape Catalog**: Browse a list of grape varieties. Sommeliers and Admins can add and edit entries.
- **Image Uploads**: Grape varieties feature images handled by Manifest's file storage.
- **Tasting Notes**: Logged-in users can create, view, edit, and delete their own tasting notes for any grape.
- **Data Relationships**: A clear relational structure between Users, Grape Varieties, and Tasting Notes.
- **Auto-Generated Admin Panel**: A complete admin dashboard available at `/admin` for managing all data.

## Tech Stack

- **Backend**: Manifest (YAML-based configuration)
- **Frontend**: React, Vite, Tailwind CSS
- **API Communication**: Manifest SDK (`@mnfst/sdk`)

## Getting Started

Follow the setup guide to get the application running locally.

### Demo Credentials

- **Role**: Enthusiast
  - **Email**: `enthusiast@demo.com`
  - **Password**: `password`

- **Role**: Sommelier
  - **Email**: `sommelier@demo.com`
  - **Password**: `password`

- **Admin Panel**: Visit `/admin`
  - **Email**: `admin@manifest.build`
  - **Password**: `admin`