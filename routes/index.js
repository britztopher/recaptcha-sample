var express = require('express');
var router = express.Router();
var path = require('path')
    , request = require('request')
    , logger = require('winston');

/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile(path.resolve('client/index.html'));
});

router.post('/email/send', function (req, res) {

    var sender = req.body;

    //send request to recaptcha verification server
    request.post('http://www.google.com/recaptcha/api/verify', {
            //should always store private keys as environment variables for many reasons
            form: {privatekey: process.env.RECAPTCHA_PRIVATE_KEY,
                //need requestors ip address
                remoteip: req.connection.remoteAddress,
                challenge: sender.captcha.challenge,
                response: sender.captcha.response}
        },
        function (err, res, body) {

            //if the request to googles verification service returns a body which has false within it means server failed
            //validation, if it doesnt verification passed
            if (body.match(/false/) === null) {

               res.send(200,'email sent');
            } else {
                res.send(500, {message: "Recaptcha Validation Failed.  Please Re-Enter the reCAPTCHA challenge."})
            }

        }
    );
});

module.exports = router;
