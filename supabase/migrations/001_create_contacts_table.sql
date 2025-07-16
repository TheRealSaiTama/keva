-- Create contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add RLS (Row Level Security)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (anyone can submit contact form)
CREATE POLICY "Allow contact form submissions" ON public.contacts
    FOR INSERT WITH CHECK (true);

-- Create policy to allow reads (for admin access)
CREATE POLICY "Allow contact form reads" ON public.contacts
    FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER handle_contacts_updated_at
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create index for performance
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON public.contacts(email);
