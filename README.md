# AyoAtur - Project Management Workspace

AyoAtur is a modern, full-stack Kanban board and project management application built with React and Supabase. It features real-time task management, a drag-and-drop interface, comprehensive analytics, advanced filtering, keyboard shortcuts, and a premium design system.

## ✨ Key Features

### Core Features
- **Full-Stack Architecture**: Client-side React integrated directly with a Supabase PostgreSQL backend.
- **Secure Authentication**: JWT-based user authentication and Row Level Security (RLS) policies to ensure data privacy.
- **Interactive Kanban Board**: Smooth drag-and-drop task management powered by `@hello-pangea/dnd`.
- **Advanced CRUD Operations**: Create, read, update, and delete tasks with instant optimistic UI updates and toast notifications.
- **Data Visualization**: Real-time analytics dashboard rendering task distribution using `recharts`.
- **Modern UI/UX**: Custom CSS implementation of Glassmorphism, dynamic SVG icons, and a highly responsive layout.

### 🆕 New Advanced Features

#### 📅 Due Date Management
- Real date picker for task deadlines
- Visual indicators for overdue tasks (red highlight)
- Due date sorting and filtering
- Overdue task counter in dashboard

#### 🔍 Advanced Filter & Sort System
- **Filter by Priority**: High, Medium, Low
- **Filter by Tags**: Multi-select tag filtering
- **Filter Overdue Tasks**: Show only tasks past their deadline
- **Sort Options**:
  - Position (default)
  - Priority (High → Low)
  - Due Date (earliest first)
  - Created Date (newest first)
- Active filter counter badge
- One-click clear all filters

#### ⌨️ Keyboard Shortcuts
- `Ctrl/Cmd + K` - Create new task
- `Ctrl/Cmd + F` - Focus search
- `Ctrl/Cmd + /` - Show shortcuts help
- `1` - Navigate to Dashboard
- `2` - Navigate to Kanban Board
- `3` - Navigate to Analytics
- `4` - Navigate to Settings
- `Esc` - Close modals

#### 📤 Export Data
- **Export to JSON**: Complete data backup with all task details
- **Export to CSV**: Excel-compatible format for reporting
- Timestamped file names
- One-click download

#### 📊 Enhanced Dashboard
- Overdue tasks counter with visual alerts
- Recent tasks with status and due date
- Color-coded priority indicators
- Real-time statistics

## Tech Stack

- **Frontend**: React (Vite), Lucide React (Icons), Recharts, React Hot Toast
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Styling**: Vanilla CSS with CSS Variables for theme management
- **Drag & Drop**: @hello-pangea/dnd

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

## 🎯 Usage Tips

### Productivity Shortcuts
- Use keyboard shortcuts for faster navigation
- Filter tasks by priority to focus on what matters
- Export data regularly for backup
- Set due dates to track deadlines

### Best Practices
- Use tags to categorize tasks (e.g., "Frontend", "Bug", "Feature")
- Set priorities to organize your workflow
- Review overdue tasks daily from the dashboard
- Use the search function to quickly find tasks

## Database Schema

The application uses a single `tasks` table with the following structure:

```sql
- id (UUID, Primary Key)
- created_at (Timestamp)
- user_id (UUID, Foreign Key to auth.users)
- content (Text) - Task title
- description (Text) - Task details
- priority (Text) - High, Medium, Low
- tags (Text Array) - Task labels
- column_id (Text) - Current status column
- position (Numeric) - Order in column
- due_date (Date) - Task deadline
- archived (Boolean) - Archive status
- archived_at (Timestamp) - Archive date
```

## Security

This project implements Supabase Row Level Security (RLS) to guarantee that user data is isolated. Authentication state is synchronized across the application to manage protected routes securely.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Changelog

### Version 2.0 (Latest)
- ✅ Added real due date picker with calendar
- ✅ Implemented advanced filter & sort system
- ✅ Added keyboard shortcuts for productivity
- ✅ Export data to JSON/CSV
- ✅ Enhanced dashboard with overdue tracking
- ✅ Improved task card with due date indicators
- ✅ Updated database schema for new features

### Version 1.0
- Initial release with basic Kanban functionality
- User authentication
- Drag & drop tasks
- Basic analytics
