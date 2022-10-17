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
const {activePlayer} = require("./admin/activePlayer")

const {getCalendar} = require("./calendar/getCalendar");
const {newSession} = require("./calendar/newSession");
const {newPoint} = require("./match/newPoint");

const {getResumen} = require("./accounting/getResumen")
const {updatePlayer} = require("./players/updatePlayer")
const {updatePlayerByCoach} = require("./players/updatePlayerByCoach")
const {getConversations} = require("./chat/getConversations")
const { newMessageNotification } = require("./chat/newMessageNotification")
const {getGroups} = require("./admin/getGroups")
const {deleteConversation} = require("./chat/deleteConversation")
const {checkNewUser} = require("./admin/checkNewUser")
const {handleInvitations} = require("./coach/handlnvitation")
const {leaveCoach} = require("./players/leaveCoach")
const {onDeletePlayer} = require("./players/onDeletePlayer")

admin.initializeApp(functions.config().firebase);

exports.newMessageNotification = newMessageNotification
exports.updatePlayerInMatch = updatePlayerInMatch;
exports.updatePlayerByCoach = updatePlayerByCoach;
exports.deleteConversation = deleteConversation;
exports.handleInvitations = handleInvitations;
exports.savePlayersStats = savePlayersStats;
exports.getConversations = getConversations;
exports.recursiveDelete = recursiveDelete;
exports.handleRelations = handleRelations;
exports.validateReceipt = validateReceipt;
exports.newUserChecker = newUserChecker;
exports.deleteSession = deleteSession;
exports.onDeletePlayer=onDeletePlayer;
exports.updatePlayer = updatePlayer;
exports.checkNewUser = checkNewUser;
exports.activePlayer = activePlayer;
exports.getCalendar = getCalendar;
exports.leaveCoach = leaveCoach;
exports.newSession = newSession;
exports.getResumen = getResumen;
exports.getGroups = getGroups;
exports.newPlayer = newPlayer;
exports.newPoint = newPoint;
