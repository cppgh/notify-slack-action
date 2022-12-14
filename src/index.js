const core = require('@actions/core');
const notifySlack = require('./notify-slack');

notifySlack(core);
