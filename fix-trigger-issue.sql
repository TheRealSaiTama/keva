-- Fix the trigger issue by removing the problematic email trigger
DROP TRIGGER IF EXISTS send_contact_email_trigger ON public.contacts;
DROP FUNCTION IF EXISTS public.send_contact_email();

-- Keep the table and update timestamp functionality
-- Remove and recreate the update timestamp function cleanly
DROP TRIGGER IF EXISTS handle_contacts_updated_at ON public.contacts;
DROP FUNCTION IF EXISTS public.handle_updated_at();

-- Recreate just the update timestamp function (without email trigger)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the update timestamp trigger
CREATE TRIGGER handle_contacts_updated_at
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
