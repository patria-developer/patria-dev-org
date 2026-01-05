export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const subject = data.get('subject') as string;
  const message = data.get('message') as string;

  // Validate the data
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Patria Dev Contact <onboarding@resend.dev>', // Use verified domain in production
      to: ['patria.comunity@gmail.com'],
      replyTo: email,
      subject: `New Contact Form: ${subject || 'No Subject'}`,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
      `
    });

    if (error) {
      console.error('Resend Error:', error);
      return new Response(
        JSON.stringify({
          message: error.message || "Failed to send email",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Message sent successfully!",
        id: emailData?.id
      }),
      { status: 200 }
    );
  } catch (e: any) {
    console.error('Server Error:', e);
    return new Response(
      JSON.stringify({
        message: e.message || "Internal Server Error",
      }),
      { status: 500 }
    );
  }
};
