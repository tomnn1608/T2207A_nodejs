const nodemailer = require("nodemailer");
const config = {
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "hoatq4@fpt.edu.vn",
        pass:"gnyaaqjofsdnbbcx"
    }
}
const transport = nodemailer.createTransport(config);
module.exports = transport;