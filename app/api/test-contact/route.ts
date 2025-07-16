import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  console.log('🧪 Testing contact form setup...');
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        details: {
          hasSupabaseUrl: !!supabaseUrl,
          hasServiceKey: !!supabaseKey
        }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Test database connection
    const { data, error } = await supabase
      .from('contacts')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Database test failed:', error);
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        details: {
          code: error.code,
          message: error.message,
          hint: error.hint
        }
      });
    }

    console.log('✅ Database connection successful');
    return NextResponse.json({
      success: true,
      message: 'Contact form setup is working correctly',
      database: {
        connected: true,
        tableExists: true
      },
      environment: {
        hasSupabaseUrl: !!supabaseUrl,
        hasServiceKey: !!supabaseKey,
        hasResendKey: !!process.env.RESEND_API_KEY
      }
    });

  } catch (error) {
    console.error('❌ Test failed:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error
    });
  }
}