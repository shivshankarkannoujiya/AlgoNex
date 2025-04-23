import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "PinakAlgoX",
            link: "https://mailgen.js/",
        },
    });

    const emailText = mailGenerator.generatePlaintext(options.mailGenContent);
    const emailHtml = mailGenerator.generate(options.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
    });

    const mail = {
        from: "abc@gmail.com",
        to: options.email,
        subject: options.subject,
        text: emailText,
        html: emailHtml,
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.log("Failed to send Mail: ", error);
    }
};

const emailVerificationMailGenContent = (username, emailVerificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to APP! We're very excited to have you on board.",
            action: {
                instructions: "To verify email, please click here:",
                button: {
                    color: "#22BC66",
                    text: "verify your email",
                    link: emailVerificationUrl,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset your password.",
            action: {
                instructions: "To change your password click the button:",
                button: {
                    color: "#22BC66",
                    text: "reset password",
                    link: passwordResetUrl,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

export {
    sendEmail,
    emailVerificationMailGenContent,
    forgotPasswordMailGenContent,
};
