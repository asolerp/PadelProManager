const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {updatePlayerInMatch} = require('./updatePlayerInMatch');

const {savePlayersStats} = require('./savePlayerStats');
const {recursiveDelete} = require('./recursiveDelete');
const {validateReceipt} = require('./validateReceipt');
const {newUserChecker} = require('./newUserChecker');
const {getCalendar} = require('./getCalendar');

admin.initializeApp(functions.config().firebase);

exports.savePlayersStats = savePlayersStats;
exports.updatePlayerInMatch = updatePlayerInMatch;
exports.recursiveDelete = recursiveDelete;
exports.validateReceipt = validateReceipt;
exports.newUserChecker = newUserChecker;
exports.getCalendar = getCalendar;
