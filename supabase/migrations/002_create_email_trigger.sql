-- Create the email trigger for new contact form submissions
CREATE OR REPLACE FUNCTION public.send_contact_email()
RETURNS TRIGGER AS $$
BEGIN
    -- Call the Edge Function to send email
    PERFORM
        net.http_post(
            url := 'https://uoolqzykvmwroilcoomf.supabase.co/functions/v1/send-contact-email',
            headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key', true) || '"}'::jsonb,
            body := jsonb_build_object(
                'first_name', NEW.first_name,
                'last_name', NEW.last_name,
                'email', NEW.email,
                'message', NEW.message,
                'created_at', NEW.created_at
            )
        );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger that fires after insert
CREATE TRIGGER send_contact_email_trigger
    AFTER INSERT ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION public.send_contact_email();
