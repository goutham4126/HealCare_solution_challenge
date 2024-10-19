import { NextResponse } from 'next/server';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp-relay.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_USER,
        pass: process.env.NEXT_PUBLIC_GMAIL_PASSWORD,
    },
});

export async function POST(req) {
    if (req.method === 'POST') {
        try {
            const body = await req.json();
            const message = `
                Name: ${body.name}
                Email: ${body.email}
                Phone Number: ${body.phone}
                Education: ${body.education}
                Treatment Specialization: ${body.treatment}
            `;
            const mailOptions = {
                from: process.env.NEXT_PUBLIC_GMAIL_USER, 
                to: process.env.NEXT_PUBLIC_GMAIL_USER, 
                replyTo: body.email,
                subject: "Message to Goutham's portfolio",
                text: message,
            };

            await transporter.sendMail(mailOptions);
            return NextResponse.json({ message: 'Email sent successfully' });
        } catch (err) {
            return NextResponse.json({ error: err.message });
        }
    } else {
        return NextResponse.json({ error: 'Method Not Allowed' });
    }
}

