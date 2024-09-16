import twilio from "twilio";


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export async function sendSMS(to: string, body: string): Promise<void> {
   await client.messages.create({
    body: body,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to
   })
   .then((message) => console.log(`Message sent successfully! SID: ${message.sid}`))
   .catch((error) => console.error('Error sending message:', error))
}


// Function to send WhatsApp notification
export async function sendWhatsApp(to: string, body: string): Promise<void> {
   await client.messages
   .create({
       body: body,
       from: 'whatsapp:+14155238886',
       to: 'whatsapp:+918130635690'
   })
   .then(message => console.log(message.sid))
   .catch((error) => console.error('Error sending message:', error))
}