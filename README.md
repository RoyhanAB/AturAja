# AyoAtur - Project Management Workspace

AyoAtur is a modern, full-stack Kanban board and project management application built with React and Supabase. It features real-time task management, a drag-and-drop interface, comprehensive analytics, and a premium design system.

## Key Features

- **Full-Stack Architecture**: Client-side React integrated directly with a Supabase PostgreSQL backend.
- **Secure Authentication**: JWT-based user authentication and Row Level Security (RLS) policies to ensure data privacy.
- **Interactive Kanban Board**: Smooth drag-and-drop task management powered by `@hello-pangea/dnd`.
- **Advanced CRUD Operations**: Create, read, update, and delete tasks with instant optimistic UI updates and toast notifications.
- **Data Visualization**: Real-time analytics dashboard rendering task distribution using `recharts`.
- **Modern UI/UX**: Custom CSS implementation of Glassmorphism, dynamic SVG icons, and a highly responsive layout.

## Tech Stack

- **Frontend**: React (Vite), Lucide React (Icons), Recharts, React Hot Toast
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Styling**: Vanilla CSS with CSS Variables for theme management

## Getting Started

### Prerequisites
- Node.js (v18+)
- A Supabase account and project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RoyhanAB/AyoAtur.git
   cd AyoAtur/Web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Initialize the Database:
   Execute the `setup.sql` script in your Supabase SQL Editor to create the necessary tables and Row Level Security policies.

5. Start the development server:
   ```bash
   npm run dev
   ```

## Security

This project implements Supabase Row Level Security (RLS) to guarantee that user data is isolated. Authentication state is synchronized across the application to manage protected routes securely.

## License

MIT
