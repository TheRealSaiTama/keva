import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import sgMail from "npm:@sendgrid/mail@8";

// Set the API key from the Supabase secret
const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
} else {
  console.warn("SENDGRID_API_KEY is not set. Email sending will be disabled.");
}

console.log("Starting send-contact-email function");

serve(async (req) => {
  // This is the core logic for the Edge Function.
  try {
    // The request body from the trigger *is* the contact data.
    const contactData = await req.json();
    console.log("Function invoked with payload:", contactData);

    // Destructure the CORRECT properties from the payload: first_name and last_name.
    const { first_name, last_name, email, message } = contactData;

    // Update validation to check for the correct fields.
    if (!first_name || !email || !message) {
      console.error("Missing required fields in payload:", contactData);
      throw new Error("Missing required fields: first_name, email, or message");
    }

    // Safely combine first and last name.
    const fullName = `${first_name} ${last_name || ''}`.trim();

    const msg = {
      to: "hello@keva.agency",
      from: {
        email: 'hello@keva.agency', // Verified SendGrid sender
        name: 'Keva Website Contact Form'
      },
      replyTo: email,
      subject: `New Contact Form Submission from ${fullName}`, // Use the combined full name
      html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
            <p>You have received a new message from your website's contact form.</p>
            <hr style="border: none; border-top: 1px solid #eee;">
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #4F46E5;">${email}</a></p>
            <h3 style="color: #4F46E5;">Message:</h3>
            <p style="background-color: #f4f4f5; padding: 15px; border-radius: 5px; border: 1px solid #e4e4e7;">
              ${message.replace(/\n/g, '<br>')}
            </p>
            <hr style="border: none; border-top: 1px solid #eee;">
            <p style="font-size: 0.8em; color: #777;">This email was sent automatically from keva.agency.</p>
          </div>
        `,
    };

    await sgMail.send(msg);
    console.log("Email sent successfully to:", msg.to);

    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}); 