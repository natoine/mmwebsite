const { SEMAIL, SPWDOVH, SHOST, SPORTSMTP } = require("./secret.js");
module.exports = {
    PWDOVH: process.env.PWDOVH || SPWDOVH,
    EMAIL: process.env.EMAIL || SEMAIL,
    HOST: process.env.HOST || SHOST,
    PORTSMTP: process.env.PORTSMTP || SPORTSMTP
};