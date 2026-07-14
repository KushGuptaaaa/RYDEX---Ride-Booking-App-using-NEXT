import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL as string,
        pass: process.env.PASS as string
    }
})

export const sendMail = async (to: string, subject: string, html: string) => {
    await transporter.sendMail({
        from: `"RYDEX" <${process.env.EMAIL}>`,
        to,
        subject,
        html
    })
}