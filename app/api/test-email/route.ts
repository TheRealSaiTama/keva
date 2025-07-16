import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  try {
    console.log('🧪 Testing Resend API key...');
    
    const apiKey = process.env.RESEND_API_KEY;
    console.log('📧 API Key exists:', !!apiKey);
    console.log('📧 API Key format:', apiKey?.substring(0, 10) + '...');
    
    if (!apiKey) {
      return NextResponse.json({ error: 'No API key found' }, { status: 500 });
    }
    
    const resend = new Resend(apiKey);
    
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['hello@keva.agency'],
      subject: '🧪 Test Email from Contact Form API',
      html: '<h1>Test Email</h1><p>This is a test email to verify Resend is working.</p>'
    });
    
    console.log('✅ Test email result:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      result: result
    });
    
  } catch (error) {
    console.error('❌ Test email failed:', error);
    return NextResponse.json({ 
      error: 'Test email failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
