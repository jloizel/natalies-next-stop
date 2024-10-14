import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { render } from "@react-email/render";
import { EmailTemplate } from '../../../components/contactForm/emailTemplate';

export async function POST(request: NextRequest) {
  const { company, job, message, name, email, phoneNumber } = await request.json();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Ensure to await the render function to get the HTML string
  const htmlContent = await render(EmailTemplate({ name: name, emailAddress: email, message: message }));

  const mailOptions: Mail.Options = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Message from ${name} from (${company})`,
    text: `${message} ${job} ${phoneNumber}`,
    html: htmlContent, // Now this is the awaited string content
  };

  const sendMailPromise = () =>
    new Promise<void>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err: any) {
        if (!err) {
          resolve(); // Resolve successfully if no error
        } else {
          reject(err.message); // Reject if there's an error
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
