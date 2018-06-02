const express = require('express');
var router = express.Router();
var mailSender = require('@sendgrid/mail');

router.post('/forgotPassword', async (req, res, next) => {
  console.log("forgotPassword");

  mailSender.setApiKey(process.env.MAIL_TOKEN);

  const msg = {
    to: 'twilkes149@gmail.com',
    from: 'twilkes149@gmail.com',
    subject: 'Reset Password',
    text: 'Email confirmation',
    html: '<p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://remoteidea.com/images/IdeaTek_logo_hor_4c.png" width="621" height="207" /></p>' +
      '<p>&nbsp;</p>' +
      '<p style="text-align: center;">You recently registered an email account with our app.&nbsp;</p>' +
      `<p style="text-align: center;">Please take a moment to confirm your email by clicking here</p>` +
      '<p style="text-align: center;">&nbsp;</p>' +
      '<p style="text-align: center;">If you feel you are receiving this email by mistake, please ignore it or contact Ideatek at&nbsp;</p>' +
      '<p style="text-align: center;">620-543-5555 or send us an email:</p>' +
      '<p style="text-align: center;"><a href="mailto:help@ideatek.com">help@ideatek.com</a></p>' +
      '<p style="text-align: center;">&nbsp;</p>' +
      '<table style="height: 96px; width: 327px; background-color: #d9dadb; margin-left: auto; margin-right: auto;">' +
      '<tbody>' +
      '<tr>' +
      '<td style="width: 319px; text-align: center;">' +
      '<p><img src="http://remoteidea.com/images/IdeaTek_logo_hor_4c.png" width="387" height="129" /></p>' +
      '<p>&nbsp;</p>' +
      '<p><a href="tel:8554332835">855-IDEATEK</a></p>' +
      '<p><a href="mailto:ideatek@ideatek.com">ideatek@ideatek.com</a></p>' +
      '<p>111 Old Mill Lane&nbsp;<br />Buhler, KS 67522</p>' +
      '</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>' +
      '<p style="text-align: center;">&nbsp;</p>' +
      '<p style="text-align: center;">&nbsp;</p>' +
      '<p style="text-align: center;">&nbsp;</p>' +
      '<p style="text-align: center;"><strong>&nbsp;</strong></p>',
  };
  mailSender.send(msg);
  res.status(200).send({success: true, message: "Sent email"});
});

module.exports = router;

//'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'
