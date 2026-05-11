-- Run this SQL in your Supabase SQL Editor to setup the database for AyoAtur

-- 1. Create the Tasks table
CREATE TABLE public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    content TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'Medium',
    tags TEXT[] DEFAULT '{}',
    column_id TEXT DEFAULT 'column-1',
    position NUMERIC DEFAULT 0,
    due_date DATE,
    archived BOOLEAN DEFAULT false,
    archived_at TIMESTAMP WITH TIME ZONE
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- 3. Create Security Policies
-- Allow users to only see their own tasks
CREATE POLICY "Users can view their own tasks" ON public.tasks
    FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert tasks assigned to themselves
CREATE POLICY "Users can insert their own tasks" ON public.tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own tasks
CREATE POLICY "Users can update their own tasks" ON public.tasks
    FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own tasks
CREATE POLICY "Users can delete their own tasks" ON public.tasks
    FOR DELETE USING (auth.uid() = user_id);

-- 4. Create indexes for performance
CREATE INDEX idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX idx_tasks_column_id ON public.tasks(column_id);
