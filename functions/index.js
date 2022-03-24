const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {updatePlayerInMatch} = require('./updatePlayerInMatch');

const {savePlayersStats} = require('./savePlayerStats');
const {recursiveDelete} = require('./recursiveDelete');
const {validateReceipt} = require('./validateReceipt');
const {newUserChecker} = require('./newUserChecker');
const {getCalendar} = require('./getCalendar');
const {newSession} = require('./newSession');
const {deleteSession} = require('./deleteSession');
const {newPoint} = require('./newPoint');

admin.initializeApp(functions.config().firebase);

exports.updatePlayerInMatch = updatePlayerInMatch;
exports.savePlayersStats = savePlayersStats;
exports.recursiveDelete = recursiveDelete;
exports.validateReceipt = validateReceipt;
exports.newUserChecker = newUserChecker;
exports.deleteSession = deleteSession;
exports.getCalendar = getCalendar;
exports.newSession = newSession;
exports.newPoint = newPoint;
