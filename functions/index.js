const functions = require("firebase-functions");
const admin = require("firebase-admin");

const {updatePlayerInMatch} = require("./players/updatePlayerInMatch");

const {handleRelations} = require("./coach/handleRelations");
const {savePlayersStats} = require("./players/savePlayerStats");
const {recursiveDelete} = require("./admin/recursiveDelete");
const {validateReceipt} = require("./admin/validateReceipt");
const {newUserChecker} = require("./admin/newUserChecker");
const {deleteSession} = require("./calendar/deleteSession");
const {newPlayer} = require("./players/newPlayer");

const {getCalendar} = require("./calendar/getCalendar");
const {newSession} = require("./calendar/newSession");
const {newPoint} = require("./match/newPoint");

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
