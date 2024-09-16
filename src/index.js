const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');

const { sendBasicEmail } = require('./services/email-service')

const jobs  = require('./utils/job')
const TicektController = require('./contrllers/ticket-controller');

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('/api/v1/tickets', TicektController.create);
    
    app.listen(PORT, () => {
        console.log(`Server Started at PORT ${PORT}`);

        // sendBasicEmail(
        //     'Support <support@admin.com>',
        //     'ankitsharma0004d@gmail.com',
        //     'This is a testing mail',
        //     'Hey, how are you, you would have liked our support'
        // );

        jobs();
           
    })
}

setupAndStartServer();

