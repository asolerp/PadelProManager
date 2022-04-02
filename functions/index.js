const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {updatePlayerInMatch} = require('./updatePlayerInMatch');

const {handleRelations} = require('./coach/handleRelations');
const {savePlayersStats} = require('./savePlayerStats');
const {recursiveDelete} = require('./recursiveDelete');
const {validateReceipt} = require('./validateReceipt');
const {newUserChecker} = require('./newUserChecker');
const {deleteSession} = require('./deleteSession');
const {newPlayer} = require('./players/newPlayer');

const {getCalendar} = require('./getCalendar');
const {newSession} = require('./newSession');
const {newPoint} = require('./newPoint');

admin.initializeApp(functions.config().firebase);

exports.updatePlayerInMatch = updatePlayerInMatch;
exports.savePlayersStats = savePlayersStats;
exports.recursiveDelete = recursiveDelete;
exports.handleRelations = handleRelations;
exports.validateReceipt = validateReceipt;
exports.newUserChecker = newUserChecker;
exports.deleteSession = deleteSession;
exports.getCalendar = getCalendar;
exports.newSession = newSession;
exports.newPlayer = newPlayer;
exports.newPoint = newPoint;
