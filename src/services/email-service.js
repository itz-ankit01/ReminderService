const sender = require('../config/email-config');
const TicketRepository = require('../repository/ticket-repository');

const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        const response = await sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const fetchPendingEmails = async (timestamp) => {
    try {
        const response = await repo.get({status: "PENDING"});
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateTicket = async (ticketId, data) => {
    try {
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) => {
    try {
        console.log(data);
        const ticket = await repo.create(data);
        return ticket;
    } catch (error) {
        console.log(error);
        
    }
} 

const subcribeEvents = async(payload) => {
    try {
        let service = payload.service;
        let data = payload.data;
        switch(service){
            case 'CREATE_TICKET':
                await createNotification(data);
                break;
            case 'SEND_BASIC_MAIL':
                await sendBasicEmail(data);
                break;
            default:
                console.log('No valid event received');
                break;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subcribeEvents
}

