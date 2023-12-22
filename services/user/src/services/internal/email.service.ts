import nodemailer from "nodemailer";
import { AsyncError } from "../../handlers/error.handler";

const transporter = nodemailer.createTransport({
  host: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail(to: string, subject: string, text: string) {
  try {
    await transporter.sendMail({
      from: "Mainnet",
      to,
      subject,
      text,
    });
  } catch (error: any) {
    throw new AsyncError(error.message);
  }
}

async function sendEmailVerification(to: string, token: string) {
    const subject = "Verify your email";
    const text = `Click this link to verify your email: ${process.env.CLIENT_URL}/verify-email?token=${token}`;
    await sendEmail(to, subject, text);

    return;
}

async function sendPasswordReset(to: string, token: string) {
    const subject = "Reset your password";
    const text = `Click this link to reset your password: ${process.env.CLIENT_URL}/reset-password?token=${token}`;
    await sendEmail(to, subject, text);

    return;
}

async function sendPasswordChanged(to: string) {
    const subject = "Password changed";
    const text = `Your password has been changed successfully.`;
    await sendEmail(to, subject, text);

    return;
}

async function sendPostSignup(to: string) {
    const subject = "Welcome to Mainnet";
    const text = `Thank you for signing up to Mainnet!`;
    await sendEmail(to, subject, text);

    return;
}

export {
  sendEmailVerification,
  sendPasswordReset,
  sendPasswordChanged,
  sendPostSignup,
};



