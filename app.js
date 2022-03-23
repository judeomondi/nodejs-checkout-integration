/**
 * Author: howard.mnengwa@cellulant.com
 * Date: 2019-05-02
 *
 * Author: john.wambua@cellulant.com
 * Date: 2021-04-09
 *
 * Description: An illustration of merchant payload encryption in Nodejs
 * Resources: https://nodejs.org/api/crypto.html, https://www.wikiwand.com/en/Advanced_Encryption_Standard
 */
'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const Encryption = require('./encryption')
const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.post('/checkout-encryption', (req, res) => {

    const ivKey = process.env.IV_KEY;
    const secretKey = process.env.SECRET_KEY;
    const accessKey = process.env.ACCESS_KEY;

    const algorithm = "aes-256-cbc";
    const requestBody = req.body;

    console.log(req.body);


    const encryption = new Encryption(ivKey,secretKey, algorithm);
    const payload = JSON
        .stringify(requestBody)
        .replace(/\//g, '\\/');
        

       console.log(`https://developer.tingg.africa/checkout/v2/express/?params=${encryption.encrypt(payload)}&accessKey=${accessKey}&countryCode=${requestBody.countryCode}`)
    res.json({
        params: encryption.encrypt(payload),
        accessKey,
        countryCode: requestBody.countryCode
    });
})

app.listen(PORT, () => console.log(`Mula express checkout illustration listening to ${PORT}!`));
