# Supabase Setup for Contact Form

## Quick Setup Instructions

### 1. Run the SQL Migrations

Go to your Supabase project dashboard:
1. Navigate to **SQL Editor**
2. Copy and paste the content from each migration file:
   - `supabase/migrations/001_create_contacts_table.sql`
3. Execute the script by clicking "Run"

### 2. Set up Email Notifications (Optional)

You have several options for email notifications:

#### Option A: Resend (Recommended - Free & Easy)
1. Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month)
2. Get your API key from the dashboard
3. Add to your `.env.local` file:
   ```bash
   RESEND_API_KEY=your_resend_api_key_here
   ```

#### Option B: No Email Setup
- Skip this step entirely
- Contact submissions will still be saved to Supabase
- You can view them in the Supabase dashboard

#### Option C: Other Services
- **Nodemailer** with Gmail/Outlook
- **EmailJS** (client-side)
- **Formspree** (third-party form service)

### 3. Test the Contact Form

The contact form will now:
1. ✅ Store submissions in the `contacts` table
2. ✅ Show success/error messages to users
3. ✅ Send email notifications (if configured)
4. ✅ Work without email setup

### 4. View Contact Submissions

To view contact form submissions:
1. Go to **Table Editor** in Supabase
2. Select the `contacts` table
3. View all submissions with timestamps

## Environment Variables Required

Make sure your `.env.local` file has:
```bash
# Required for Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional for email notifications
RESEND_API_KEY=your_resend_api_key_here
```

## Table Schema

The `contacts` table includes:
- `id` (UUID, Primary Key)
- `first_name` (Text, Required)
- `last_name` (Text, Optional)
- `email` (Text, Required)
- `message` (Text, Required)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## Troubleshooting

If the contact form still doesn't work:
1. Check the browser console for errors
2. Check the Supabase logs in the dashboard
3. Verify the table was created successfully
4. Ensure RLS policies are correctly set up
