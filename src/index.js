const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');

const { sendBasicEmail } = require('./services/email-service')
const cron = require('node-cron');

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`Server Started at PORT ${PORT}`);

        // sendBasicEmail(
        //     'Support <support@admin.com>',
        //     'ankitsharma0004d@gmail.com',
        //     'This is a testing mail',
        //     'Hey, how are you, you would have liked our support'
        // );

        cron.schedule('*/2 * * * *', () => {
            console.log('running a task every 2 minutes');
            
        })
        
    })
}

setupAndStartServer();

