-- Complete fix for contact form issues
-- This script removes the problematic email trigger and ensures clean contact form functionality

-- Step 1: Remove the problematic email trigger that's causing 500 errors
DROP TRIGGER IF EXISTS send_contact_email_trigger ON public.contacts;
DROP FUNCTION IF EXISTS public.send_contact_email();

-- Step 2: Ensure the contacts table exists with proper structure
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 3: Enable RLS with proper policies
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow contact form submissions" ON public.contacts;
DROP POLICY IF EXISTS "Allow contact form reads" ON public.contacts;

-- Create new policies
CREATE POLICY "Allow contact form submissions" ON public.contacts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow contact form reads" ON public.contacts
    FOR SELECT USING (true);

-- Step 4: Ensure update timestamp function works properly
DROP TRIGGER IF EXISTS handle_contacts_updated_at ON public.contacts;
DROP FUNCTION IF EXISTS public.handle_updated_at();

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_contacts_updated_at
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Step 5: Create indexes for performance
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON public.contacts(email);

-- Verification: Test that everything works
-- This should succeed without any errors
INSERT INTO public.contacts (first_name, email, message) 
VALUES ('Test', 'test@example.com', 'Test message') 
ON CONFLICT DO NOTHING;

-- Clean up test data
DELETE FROM public.contacts WHERE first_name = 'Test' AND email = 'test@example.com';
