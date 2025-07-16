-- Complete setup for contact form functionality
-- Run this in your Supabase SQL editor at https://app.supabase.com/project/[your-project]/sql

-- Step 1: Clean up any existing problematic triggers
DROP TRIGGER IF EXISTS send_contact_email_trigger ON public.contacts;
DROP FUNCTION IF EXISTS public.send_contact_email() CASCADE;

-- Step 2: Create the contacts table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 3: Enable Row Level Security (RLS)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS policies for the contacts table
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow contact form submissions" ON public.contacts;
DROP POLICY IF EXISTS "Allow contact form reads" ON public.contacts;

-- Create new policies
CREATE POLICY "Allow contact form submissions" ON public.contacts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow contact form reads" ON public.contacts
    FOR SELECT USING (true);

-- Step 5: Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 6: Create trigger for updated_at
DROP TRIGGER IF EXISTS handle_contacts_updated_at ON public.contacts;
CREATE TRIGGER handle_contacts_updated_at
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Step 7: Create indexes for performance
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON public.contacts(email);

-- Step 8: Test the setup
-- This should work without any errors
INSERT INTO public.contacts (first_name, email, message) 
VALUES ('Test User', 'test@example.com', 'This is a test message to verify the contact form is working') 
ON CONFLICT DO NOTHING;

-- Verify the test data was inserted
SELECT * FROM public.contacts WHERE email = 'test@example.com';

-- Clean up test data (optional)
-- DELETE FROM public.contacts WHERE email = 'test@example.com';

-- Grant necessary permissions
GRANT ALL ON public.contacts TO authenticated;
GRANT ALL ON public.contacts TO service_role;
GRANT ALL ON public.contacts TO anon;