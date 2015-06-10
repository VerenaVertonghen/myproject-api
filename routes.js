module.exports = function(app, passport) {
	
	// load routes
	var IndexRoute          = require('./app/routes/index');
	var UserRoute           = require('./app/routes/users'); 
	var NotificationRoute   = require('./app/routes/notifications');
	var StateRoute          = require('./app/routes/states');
	var CategoryRoute       = require('./app/routes/categories');
	var MessageRoute        = require('./app/routes/messages');
	var mongoose 			= require('mongoose');
	var async 				= require('async');
	var sendgrid  			= require('sendgrid')("pM4ZPKQCaJ", "wPBRpDdFh6");
	var passport 			= require('passport');
	var express 			= require('express');
	var router 				= express.Router();

	// models
	var Category 			= require('./app/models/category.js');
	var User 				= require('./app/models/user.js');
	var State 				= require('./app/models/state.js');
	var Notification 		= require('./app/models/notification.js');
	var Message 			= require('./app/models/message.js');

	// use routes
	app.use('/', IndexRoute);
	app.use('/users', UserRoute);
	app.use('/notifications', NotificationRoute);
	app.use('/states', StateRoute);
	app.use('/categories', CategoryRoute);
	app.use('/messages', MessageRoute);
	
	//email
	var content = '<!DOCTYPE html><html lang="en"><head><title>Cozy Care</title><link rel="shortcut icon" href="http://verenavertonghen.be/images/icon2.png"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"><style type="text/css"> /* CLIENT-SPECIFIC STYLES */ #outlook a{padding:0;}/* Force Outlook to provide a "view in browser" message */ .ReadMsgBody{width:100%;}.ExternalClass{width:100%;}/* Force Hotmail to display emails at full width */ .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;}/* Force Hotmail to display normal line spacing */ @font-face{font-family: "Regular"; src: url("fonts/Montserrat-Regular.otf");}@font-face{font-family: "Hairline"; src: url("fonts/Montserrat-Hairline.otf");}@font-face{font-family: "Hairline"; src: url("fonts/Montserrat-Hairline.otf");}@font-face{font-family: "Hairline"; src: url("fonts/Montserrat-Hairline.otf");}body, table, td, a{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;}/* Prevent WebKit and Windows mobile changing default text sizes */ table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;}/* Remove spacing between tables in Outlook 2007 and up */ img{-ms-interpolation-mode:bicubic;}/* Allow smoother rendering of resized image in Internet Explorer */ /* RESET STYLES */ body{margin:0; padding:0;font-family: "Hairline" !important;}img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}table{border-collapse:collapse !important;}body{height:100% !important; margin:0; padding:0; width:100% !important;}/* iOS BLUE LINKS */ .appleBody a{color:#112539; text-decoration: none;}.appleFooter a{color:#112539; text-decoration: none;}/* MOBILE STYLES */ @media screen and (max-width: 525px){/* COSY CARE COLOURS green #16a085 white #ffffff dark blue #112539 */ /* ALLOWS FOR FLUID TABLES */ table[class="wrapper"]{width:100% !important;}/* ADJUSTS LAYOUT OF LOGO IMAGE */ td[class="logo"]{text-align: left; padding: 20px 0 20px 0 !important;}td[class="logo"] img{margin:0 auto!important;}/* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */ td[class="mobile-hide"]{display:none;}img[class="mobile-hide"]{display: none !important;}img[class="img-max"]{max-width: 100% !important; height:auto !important;}/* FULL-WIDTH TABLES */ table[class="responsive-table"]{width:100%!important;}/* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */ td[class="padding"]{padding: 10px 5% 15px 5% !important;}td[class="padding-copy"]{padding: 20px 5% 20px 5% !important; text-align: center;}td[class="padding-meta"]{padding: 30px 5% 0px 5% !important; text-align: center;}td[class="no-pad"]{padding: 0 0 20px 0 !important;}td[class="no-padding"]{padding: 0 !important;}td[class="section-padding"]{padding: 10px 15px 10px 15px !important;}td[class="section-padding-bottom-image"]{padding: 50px 15px 0 15px !important;}/* ADJUST BUTTONS ON MOBILE */ td[class="mobile-wrapper"]{padding: 10px 5% 15px 5% !important;}table[class="mobile-button-container"]{margin:0 auto; width:100% !important;}a[class="mobile-button"]{width:80% !important; padding: 15px !important; border: 0 !important; font-size: 16px !important;}}</style></head><body style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;font-family: &quot;Hairline&quot; !important;height: 100% !important;width: 100% !important;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td bgcolor="#ffffff" align="center" width="100%" style="padding: 20px 15px 20px 15px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="section-header"> <div style="display: none; font-size: 1px; color: #112539; line-height: 1px; font-family: font-family:Hairline, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> </div><table border="0" cellpadding="0" cellspacing="0" width="500" class="wrapper" align="center" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td align="center" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td bgcolor="#ffffff" align="center" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><a href="http://verenavertonghen.be/cosycare" target="_blank" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;"><img alt="Logo" src="http://verenavertonghen.be/images/logodark.png" width="400" style="display: block;font-family: Hairline,Helvetica, Arial, sans-serif;color: #112539;font-size: 16px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;" border="0"></a></td></tr></table> </td></tr></table> </td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td bgcolor="#112539" align="center" style="padding: 40px 15px 70px 15px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="section-padding"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> <table width="100%" border="0" cellspacing="0" cellpadding="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td class="padding-copy" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> <table width="100%" border="0" cellspacing="0" cellpadding="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td align="center" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> <img src="http://verenavertonghen.be/images/mail.png" width="100" border="0" alt="Insert alt text here" style="display: block;padding: 0;color: #fff;text-decoration: none;font-family: Hairline,Helvetica, arial, sans-serif;font-size: 16px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;" class="img-max"> </td></tr></table> </td></tr><tr> <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> <table width="100%" border="0" cellspacing="0" cellpadding="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td align="center" style="font-size: 36px;font-family: Regular,Helvetica, Arial, sans-serif;color: #fff;padding-top: 30px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="padding-copy">Hi %username%, <br><span align="center" style="font-size: 24px; font-family: Hairline,Helvetica, Arial, sans-serif; color: #fff; padding-top: 30px;" class="padding-copy">we hope to provide you some helpful care!</span></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table><!-- <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#112539" align="center" style="padding: 0 15px 70px 15px;" class="section-padding"> <table border="0" cellpadding="0" cellspacing="0" width="500" style="padding:0 0 20px 0;" class="responsive-table"> <tr> <td align="center" valign="middle" style="font-size: 12px; line-height: 18px; font-family: Hairline,Helvetica, Arial, sans-serif; color:#fff;"> <tr> <td align="center" style="padding: 0 25px 25px 0; font-size: 22px; font-family: Regular,Helvetica, Arial, sans-serif; font-weight: normal; color: #fff;" class="padding-copy">???</td></tr><br><tr> <td align="center" style="padding: 15px 25px 15px 0" class="padding-copy"> <a style="padding: 15px;" href="mailto:info@craftworkz.co"><img src="icons/summer-circle.png" width="125px"></a> <a style="padding: 15px;"href="#"><img src="icons/internship-circle.png" width="125px"></a> <a style="padding: 15px;" href="#"><img src="icons/brain-circle.png" width="125px"></a> </td></tr><tr> <td align="center" style="padding: 10px 0 15px 0px; font-size: 14px; line-height: 24px; font-family: Hairline,Helvetica, Arial, sans-serif; color: #fff;" class="padding-copy">???</td></tr></td></tr></table> </td></tr></table> --><!-- <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 0 15px 70px 15px;" class="section-padding"> <table border="0" cellpadding="0" cellspacing="0" width="500" style="padding:0 0 20px 0;" class="responsive-table"> <tr> <td style="padding: 40px 0 0 0;" class="no-padding"> <table border="0" cellspacing="0" cellpadding="0" width="100%"> <tr> <td align="left" style="padding: 0 25px 15px 0; font-size: 22px; font-family: Regular,Helvetica, Arial, sans-serif; font-weight: normal; color: #112539;" class="padding-copy">Meet Cosy</td></tr><tr> <td align="left" style="padding: 10px 25px 15px 0; font-size: 16px; line-height: 24px; font-family: Hairline,Helvetica, Arial, sans-serif; color: #112539;" class="padding-copy">Cosy is our mascot, but most of all he is our friend. He will guide you in the app, send you messages, ask if you are doing okay and a lot more! <br><a href="#" target="_blank" style="font-size: 18px; font-family: Hairline,Helvetica, Arial, sans-serif; font-weight: normal; color: #fff; text-decoration: none; background-color: #112539;border-top: 15px solid #112539; border-bottom: 15px solid #112539; border-left: 25px solid #112539; border-right: 25px solid #112539; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 3px; display: inline-block;margin-top:15px; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; box-shadow: 0 3px #050c12;" class="mobile-button">Follow Cosy on twitter</a></td></tr></table> </td><td valign="top" style="padding: 40px 0 0 0;" class="mobile-hide"><a href="#" target="_blank"><img src="icons/summer-circle.png" alt="alt text here" width="150" height="200" border="0" style="display: block; font-family: Hairline,Arial; color: #112539; font-size: 14px;"></a></td></tr></table> </td></tr></table> --><table border="0" cellpadding="0" cellspacing="0" width="100%" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 0 15px 70px 15px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="section-padding"> <table border="0" cellpadding="0" cellspacing="0" width="500" style="padding: 0 0 20px 0;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;" class="responsive-table"> <tr> <td valign="top" style="padding: 40px 0 0 0;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="mobile-hide"><a href="#" target="_blank" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;"><img src="http://verenavertonghen.be/images/question-big.png" alt="alt text here" width="200" border="0" style="display: block;font-family: Hairline,Arial;color: #112539;font-size: 14px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"></a></td><td style="padding: 40px 0 0 0;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="no-padding"> <table border="0" cellspacing="0" cellpadding="0" width="100%" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td align="left" style="padding: 0 0 0 25px;font-size: 22px;font-family: Regular,Helvetica, Arial, sans-serif;font-weight: normal;color: #112539;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="padding-copy">How does it work?</td></tr><tr> <td align="left" style="padding: 10px 0 15px 25px;font-size: 16px;line-height: 24px;font-family: Hairline,Helvetica, Arial, sans-serif;color: #112539;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="padding-copy">Cosy Care offers a range of functionality that will help you take care of yourself. <ul style="list-style-type: disc;"> <li>Express your feelings</li><li>Receive notifications</li><li>Customize the app</li></ul> </td></tr></table> </td></tr></table> </td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 0 15px 70px 15px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="section-padding"> <table border="0" cellpadding="0" cellspacing="0" width="500" style="padding: 0 0 20px 0;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;" class="responsive-table"> <tr> <td style="padding: 40px 0 0 0;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="no-padding"> <table border="0" cellspacing="0" cellpadding="0" width="100%" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td align="left" style="padding: 0 25px 0 0;font-size: 22px;font-family: Regular,Helvetica, Arial, sans-serif;font-weight: normal;color: #112539;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="padding-copy">Try it!</td></tr><tr> <td align="left" style="padding: 10px 25px 15px 0;font-size: 16px;line-height: 24px;font-family: Hairline,Helvetica, Arial, sans-serif;color: #112539;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="padding-copy">The only thing left to do now is try it out. We would love to hear what you think about our app. We will do our best to improve the experience of the app as we go along. <br><a href="mailto:cosycare.app@gmail.com" target="_blank" style="font-size: 18px;font-family: Hairline,Helvetica, Arial, sans-serif;font-weight: normal;color: #fff;text-decoration: none;background-color: #112539;border-top: 15px solid #112539;border-bottom: 15px solid #112539;border-left: 25px solid #112539;border-right: 25px solid #112539;border-radius: 4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;box-shadow: 0 3px #050c12;display: inline-block;margin-top: 15px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;" class="mobile-button">Give feedback</a></td></tr></table> </td><td valign="top" style="padding: 40px 0 0 0;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="mobile-hide"><a href="#" target="_blank" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;"><img src="http://verenavertonghen.be/images/question-big.png" alt="alt text here" width="200" border="0" style="display: block;font-family: Hairline,Arial;color: #666666;font-size: 14px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"></a></td></tr></table> </td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td bgcolor="#112539" align="center" style="padding: 10px 15px 30px 15px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> <table width="100%" border="0" cellspacing="0" cellpadding="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> <table width="100%" border="0" cellspacing="0" cellpadding="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td align="center" style="font-size: 25px;font-family: Regular,Helvetica, Arial, sans-serif;color: #112539;padding-top: 30px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="padding-copy"><img alt="Logo" src="http://verenavertonghen.be/images/logowhite.png" width="300" style="display: block;font-family: Hairline,Helvetica, Arial, sans-serif;color: #112539;font-size: 16px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;" border="0"></td></tr><tr> <td align="center" style="padding: 0 0 0 0;font-size: 16px;line-height: 25px;font-family: Hairline,Helvetica, Arial, sans-serif;color: #fff;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="padding-copy">"Make yourself a priority once in a while. It’s not selfish. It’s necessary."</td></tr></table> </td></tr><tr> <td align="center" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mobile-button-container" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td align="center" style="padding: 25px 0 0 0;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="padding-copy"> <table border="0" cellspacing="0" cellpadding="0" class="responsive-table" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td align="center" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><a href="http://verenavertonghen.be/cosycare" target="_blank" style="font-size: 18px;font-family: Hairline,Helvetica, Arial, sans-serif;font-weight: normal;color: #112539;text-decoration: none;background-color: #fff;border-top: 15px solid #fff;border-bottom: 15px solid #fff;border-left: 25px solid #fff;border-right: 25px solid #fff;border-radius: 4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;display: inline-block;box-shadow: 0 3px #e6e6e6;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;" class="mobile-button">Take a look at our website</a></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table><table border="0" cellpadding="0" cellspacing="0" width="100%" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td bgcolor="#112539" align="center" style="padding: 0px 0px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> <table width="500" border="0" cellspacing="0" cellpadding="0" align="center" class="responsive-table" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;"> <tr> <td align="center" valign="middle" style="font-size: 12px;line-height: 18px;font-family: Hairline,Helvetica, Arial, sans-serif;color: #fff;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> </td></tr><tr> <td align="center" style="padding: 0 0px 30px 0;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="padding-copy"><!-- <a style="padding: 15px;"href="#"><img src="img/social/twitter.png" width="50px"></a> <a style="padding: 15px;"href="#"><img src="img/social/twitter.png" width="50px"></a> --> <a style="padding: 15px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;" href="https://twitter.com/CosyCareApp"><img src="http://verenavertonghen.be/images/twitter.png" width="50px" style="-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"></a> </td></tr></table></td></tr><tr> <td align="center" valign="middle" style="font-size: 12px;line-height: 18px;font-family: Hairline,Helvetica, Arial, sans-serif;color: #112539;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> </td></tr></table> </body></html>';
	var email = new sendgrid.Email();

	/* Specific routes
	-------------------------------------*/

	app
	/* USER
	-------------------------------------*/
	// view your profile (accessed at PUT http://localhost:8080/myprofile)
	.get('/myprofile', passport.authenticate('basic', { session: false}),
		function(req, res, next) {
			User.findById(req.user.id,{}).populate('states').exec(function (err, post) {
				if (err) return next(err);
				res.json(post);  
			});
		})

	// update your profile (accessed at PUT http://localhost:8080/updateprofile)
	// change languagesetting
	// change notificationsetting
	// change themesetting
	.put('/updateprofile', passport.authenticate('basic', { session: false}),
		function(req, res, next) {
			//console.log(req.body);
			User.findByIdAndUpdate(req.user.id, req.body, function (err, post) {
				if (err) return next(err);
				res.json(post);
		  //res.json({ message: 'User updated!' });
		});
		})

	// delete your profile (accessed at DELETE http://localhost:8080/deleteprofile)
	.delete('/deleteprofile', passport.authenticate('basic', { session: false}),
		function(req, res, next) {
			User.findByIdAndRemove(req.user.id, req.body, function (err, post) {
				if (err) return next(err);
				res.json(post);
		  //res.json({ message: 'User deleted!' });
		});
		})


	// signup (accessed at POST http://localhost:8080/signup)
	.post('/signup', function(req, res, next) {
		User.create(req.body, function (err, post) {
			if (err) return next(err);
			res.json(post);
			email.addTo(post.email);
			email.setFrom("cosycare.app@gmail.com");
			email.setSubject("Welcome to Cosy Care!");
			email.setHtml(content);
			email.addSubstitution("%username%", post.firstname);
			sendgrid.send(email);
		});
	})

	/* STATE
	-------------------------------------*/
	.post('/addstatetouser', passport.authenticate('basic', { session: false}),
		function(req, res, next) {
			State.findById(req.body.state, function(err, post) {
			//console.log('finding state', post);
			if (err) return next(err);

			User.findByIdAndUpdate(req.user.id, { $push: {"states": post._id}}, {  safe: true, upsert: true} , function (err, post) {
				if (err) return next(err);
				res.json(post);
			});
		});
		})

	// get all your states (accessed at GET http://localhost:8080/states)
	.get('/mystates', passport.authenticate('basic', {
		session: false
	}), function(req, res, next) {
		User.findById(req.user.id,{}).populate('states').exec(function (err, user) {
			if (err) return next(err);
			var modifiedStates = [];
			async.forEach(user.states, function(state,callback) {
				//console.log("modifying" + state);
				State.populate(
					state,
					{ "path": "category" },
					function(err,output) {
						if (err) {
							throw err;
						}
						//console.log("pushing " + output);
						modifiedStates.push(output);
						callback();
					}
					);
			},function(err) {
				if (err) console.log( err );
				res.json(modifiedStates);
			});

		});
	})

	/* MESSAGE
	-------------------------------------*/

	.get('/messagebytype/:type', passport.authenticate('basic', { session: false}),
		function(req, res, next) {
			console.log("req.params.type",req.params.type);

			Message.find({}).where('type').equals(req.params.type)
			.exec(function (err, messages) {
				if (err) return next(err);

				console.log(messages);
				console.log('count',messages.length);
				var randomNumber = Math.floor((Math.random() * (messages.length) ));
				console.log('randomNumber',randomNumber);
				res.json(messages[randomNumber]);  	
			});
		})


	/* NOTIFICATION
	-------------------------------------*/
	.post('/addnotificationtouser', passport.authenticate('basic', { session: false}),
		function(req, res, next) {
			Notification.findById(req.body.notification, function(err, post) {
			//console.log('finding notification', post);
			if (err) return next(err);

			User.findByIdAndUpdate(req.user.id, { $push: {"notifications": post._id}}, {  safe: true, upsert: true} , function (err, post) {
				if (err) return next(err);
				res.json(post);
			});
		});
		})

	// get all your notifications (accessed at GET http://localhost:8080/notifications)
	.get('/mynotifications', passport.authenticate('basic', {
		session: false
	}), function(req, res, next) {
		User.findById(req.user.id,{}).populate('notifications').exec(function (err, user) {
			if (err) return next(err);
			var modifiedNotifications = [];
			async.forEach(user.notifications, function(notification,callback) {
				//console.log("modifying" + notification);
				Notification.populate(
					notification,
					{ "path": "category" },
					function(err,output) {
						if (err) {
							throw err;
						}
						//console.log("pushing " + output);
						modifiedNotifications.push(output);
						callback();
					}
					);
			},function(err) {
				if (err) console.log( err );
				res.json(modifiedNotifications);
			});

		});
	})

	.get('/randomnotification', passport.authenticate('basic', { session: false}),
		function(req, res, next) {
			Notification.count({},function(err,count){
				if (err) return handleError(err);

			//console.log('count',count);
			var randomNumber = Math.floor((Math.random() * count));
			//console.log('randomNumber',randomNumber);
			Notification.find({}).limit(-1).skip(randomNumber).populate('category').exec(function (err, notifications) {
				if (err) return next(err);
				res.json(notifications);  
			});	
		});	
		})

	.get('/notificationsbycategory/:catid', passport.authenticate('basic', { session: false}),
		function(req, res, next) {
			console.log("req.params.catid",req.params.catid);
			console.log("req.params.type",req.params.type);

			Notification.find({}).where('category').equals(req.params.catid).populate('category')
			.exec(function (err, notifications) {
				if (err) return next(err);

				console.log(notifications);
				console.log('count',notifications.length);
				var randomNumber = Math.floor((Math.random() * (notifications.length) ));
				console.log('randomNumber',randomNumber);
				res.json(notifications[randomNumber]);  	
			});
		})

	.get('/notificationsbytype/:type', passport.authenticate('basic', { session: false}),
		function(req, res, next) {
			console.log("req.params.catid",req.params.catid);
			console.log("req.params.type",req.params.type);

			Notification.find({}).where('type').equals(req.params.type).populate('category')
			.exec(function (err, notifications) {
				if (err) return next(err);

				console.log(notifications);
				console.log('count',notifications.length);
				var randomNumber = Math.floor((Math.random() * (notifications.length) ));
				console.log('randomNumber',randomNumber);
				res.json(notifications[randomNumber]);  	
			});
		})

	.get('/notificationsbycategory/:catid/type/:type', passport.authenticate('basic', { session: false}),
		function(req, res, next) {
			console.log("req.params.catid",req.params.catid);
			console.log("req.params.type",req.params.type);

			Notification.find({}).where('category').equals(req.params.catid).where('type').equals(req.params.type).populate('category')
			.exec(function (err, notifications) {
				if (err) return next(err);

				console.log(notifications);
				console.log('count',notifications.length);
				var randomNumber = Math.floor((Math.random() * (notifications.length) ));
				console.log('randomNumber',randomNumber);
				res.json(notifications[randomNumber]);  	
			});
		})

	.get('/reminder', passport.authenticate('basic', { session: false}), 
		function(req, res, next) {
			if (req.user.role === "admin") {
				User.find({}).exec(
					function(err, users) {
						if (err) return next(err);

						async.forEach(users, function(user,callback){
							if(user.role!== "admin"){
								console.log("working on user: ",user);	
								var now = new Date();
								var timediff = Math.abs(now.getTime() - user.updated_at.getTime());
								var diffDays = Math.ceil(timediff/(1000*3600*24));
								console.log("time difference: ", diffDays);
								if(diffDays>=0){
							//sturen met die mail
							email.addTo(user.email);
							email.setFrom("cosycare.app@gmail.com");
							email.setSubject("Reminder Cosy Care!");
							email.setHtml(content);
							email.addSubstitution("%username%", user.firstname);
							sendgrid.send(email);

							user.updated_at = new Date();
							user.save(function(err){
								if (err) console.log(err);
							});
							callback();
						}
					}
				},function(err) {
					if (err) console.log( err );
				})
						res.send("done");
					});
			} else {
				return res.status(403).send("You don't belong here");
			}
		})

	;
};