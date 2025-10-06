const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Use LocalAuth to save session and avoid re-scanning the QR code on every start
const client = new Client({
    authStrategy: new LocalAuth()
});

let isClientReady = false;

// Initialize the WhatsApp client
const initializeWhatsAppClient = () => {
    console.log('Initializing WhatsApp client...');

    client.on('qr', (qr) => {
        console.log('--- SCAN THIS QR CODE WITH YOUR PHONE ---');
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        isClientReady = true;
        console.log('✅ WhatsApp client is ready!');
    }); 

    client.on('auth_failure', msg => {
        console.error('❌ WHATSAPP AUTHENTICATION FAILURE', msg);
    });

    client.initialize();
};

// Function to send a message
const sendMessage = async (toNumber, message) => {
    if (!isClientReady) {
        console.log('Client is not ready yet.');
        throw new Error('WhatsApp client is not ready.');
    }

    try {
        // WhatsApp numbers need to be in the format: [countrycode][number]@c.us
        // Example: 919876543210@c.us (for India)
        const chatId = `${toNumber}@c.us`;
        
        console.log(`Sending message to ${chatId}`);
        const response = await client.sendMessage(chatId, message);
        console.log('Message sent successfully.');
        return { success: true, messageId: response.id.id };
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        throw new Error('Failed to send message.');
    }
};

module.exports = { initializeWhatsAppClient, sendMessage };