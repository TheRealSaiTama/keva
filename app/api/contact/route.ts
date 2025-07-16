import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Debug: Log environment variables (safely)
console.log('🔧 API Route loaded. Checking environment...');
console.log('📧 RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
console.log('📧 RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);
console.log('📧 RESEND_API_KEY starts with:', process.env.RESEND_API_KEY?.substring(0, 10) || 'Not found');

// Initialize Resend (optional - only if you want email notifications)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
console.log('📧 Resend client initialized:', !!resend);

export async function POST(request: NextRequest) {
  console.log('🚀 Contact API route called');
  
  try {
    // Parse the request body
    const body = await request.json();
    console.log('📝 Request body:', body);
    
    const { firstName, lastName, email, message } = body;

    // Basic validation
    if (!firstName || !email || !message) {
      console.log('❌ Validation failed: missing required fields');
      return NextResponse.json(
        { error: 'Please fill in all required fields (First Name, Email, and Message).' },
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: invalid email format');
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Create Supabase client with explicit configuration
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Prepare contact data
    const contactData = {
      first_name: String(firstName).trim(),
      last_name: lastName ? String(lastName).trim() : null,
      email: String(email).trim().toLowerCase(),
      message: String(message).trim()
    };

    console.log('📊 Contact data to insert:', contactData);

    // Insert into Supabase with explicit error handling
    const { data, error } = await supabase
      .from('contacts')
      .insert(contactData)
      .select('id, created_at')
      .single();

    if (error) {
      console.error('❌ Supabase error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      
      // Handle specific error cases
      if (error.code === '42P01') {
        return NextResponse.json(
          { error: 'Database table not found. Please set up the contacts table first.' },
          { status: 500 }
        );
      }
      
      if (error.code === '42501') {
        return NextResponse.json(
          { error: 'Database permission denied. Please check RLS policies.' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to save your message. Please try again or contact us directly at hello@keva.agency.' },
        { status: 500 }
      );
    }

    console.log('✅ Contact saved to Supabase:', data);

    // Optional: Send email notification using Resend
    console.log('📧 Email section reached. Resend client exists:', !!resend);
    if (resend) {
      try {
        console.log('📧 Attempting to send email via Resend...');
        console.log('📧 Using API key:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');
        
        const emailData = {
          from: 'onboarding@resend.dev', // This works immediately without verification
          to: ['shesoul19@gmail.com'], // Your verified email - change to hello@keva.agency after domain verification
          cc: [], // Add hello@keva.agency here after domain verification
          replyTo: email,
          subject: `🚀 New Contact Form Submission from ${firstName} ${lastName || ''}`.trim(),
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #6366f1;">📬 New Contact Form Submission</h2>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>👤 Name:</strong> ${firstName} ${lastName || ''}</p>
                <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>💬 Message:</strong></p>
                <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #6366f1;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <p style="color: #64748b; font-size: 14px;">
                📅 Received: ${new Date().toLocaleString()}<br>
                🌐 This email was sent automatically from keva.agency contact form.
              </p>
            </div>
          `
        };
        
        console.log('📧 Email data prepared:', {
          from: emailData.from,
          to: emailData.to,
          subject: emailData.subject
        });
        
        const emailResult = await resend.emails.send(emailData);
        console.log('✅ Email sent successfully via Resend. Full Result:', JSON.stringify(emailResult, null, 2));
      } catch (emailError) {
        console.error('❌ Email sending failed. Full error:', emailError);
        if (emailError instanceof Error) {
          console.error('❌ Error name:', emailError.name);
          console.error('❌ Error message:', emailError.message);
          console.error('❌ Error stack:', emailError.stack);
        }
        // Don't fail the whole request if email fails
      }
    } else {
      console.log('❌ Resend not configured - RESEND_API_KEY missing or invalid');
      console.log('❌ Current API key value:', process.env.RESEND_API_KEY || 'undefined');
    }

    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        id: data?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Contact API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
