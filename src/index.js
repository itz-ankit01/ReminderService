const express = require('express');
const bodyParser = require('body-parser');
const { PORT, REMINDER_BINDING_KEY } = require('./config/serverConfig');

const { createChannel, subscribeMessage } = require('./utils/messageQueue');

const jobs  = require('./utils/job')
const TicektController = require('./contrllers/ticket-controller');
const EmailService = require('./services/email-service');

const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('/api/v1/tickets', TicektController.create);

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subcribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`Server Started at PORT ${PORT}`);


        // jobs();
           
    })
}

setupAndStartServer();


/**
 * [Service 1(100qps) Publisher] -----> message queue [masg1 msg2 .... msg100] ---> [Service 2(20qps) Subscriber]
 * [Service 2 (Publisher)] ---> message queue [msgs] ----> [Service 1 (Subscriber)]
 */

