import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Resend for email notifications
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  console.log('🚀 Contact API route called');
  
  try {
    // Parse the request body
    const body = await request.json();
    console.log('📝 Request body received');
    
    const { firstName, lastName, email, message } = body;

    // Basic validation
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (First Name, Email, and Message).' },
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Create Supabase client
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

    console.log('📊 Attempting to save contact data...');

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert(contactData)
      .select('id, created_at')
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save your message. Please try again or contact us directly at hello@keva.agency.' },
        { status: 500 }
      );
    }

    console.log('✅ Contact saved successfully:', data?.id);

    // Send email notification using Resend
    if (resend) {
      try {
        console.log('📧 Sending email notification...');
        
        const emailResult = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: ['shesoul19@gmail.com'],
          replyTo: email,
          subject: `🚀 New Contact: ${firstName} ${lastName || ''}`.trim(),
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
                🌐 From: keva.agency contact form
              </p>
            </div>
          `
        });
        
        console.log('✅ Email sent successfully:', emailResult.data?.id);
      } catch (emailError) {
        console.error('⚠️ Email sending failed (non-critical):', emailError);
        // Don't fail the request if email fails
      }
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
