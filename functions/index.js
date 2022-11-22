const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { onCreateConversation } = require("./src/api/db/conversations/on-create");
const { onUpdatePlayer } = require("./src/api/db/players/on-update");
const { onDeleteConversation } = require("./src/api/db/conversations/on-delete");
const { onInvitation } = require("./src/api/http/relations/on-invitation");
const { savePlayersStats } = require("./src/api/http/players/save-stats");
const { getConversations } = require("./src/api/http/conversations/get-conversations");
const {recursiveDelete} = require("./src/services/recursive-delete");
const {validateReceipt} = require("./src/services/validate-receipt");

const { onUpdateRelation } = require("./src/api/db/relations/on-update");
const { onCreateUser } = require("./src/api/auth/on-create");
const { onCreateUser: onCreateUserDB } = require("./src/api/db/user/on-create");

const { deleteSession } = require("./src/api/http/calendar/delete-session");
const { onDeletePlayer } = require("./src/api/db/players/on-delete");
const {updatePlayer} = require("./src/api/http/players/update-player");
const { checkNewUser } = require("./src/api/http/users/check-new-user");
const { onSyncPlayer } = require("./src/api/http/relations/on-sync-player");
const { getCalendar } = require("./src/api/http/calendar/get-calendar");
const { leaveCoach } = require("./src/api/http/players/leave-coach");
const { newSession } = require("./src/api/http/calendar/create-session");
const { getResumen } = require("./src/api/http/accounting/get-resumen");
const { getGroups } = require("./src/api/http/groups/get-groups");
const { newPoint } = require("./src/api/http/match/new-point");
const { newPlayer } = require("./src/api/http/players/new-player");
const { deleteAccount } = require("./src/api/http/auth/delete-account");
const { sentInvitation } = require("./src/api/http/players/sent-invitation");
const { responseInvitation } = require("./src/api/http/players/response-invitation");


admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ ignoreUndefinedProperties: true })


// USERS
exports.onCreateUserDB = onCreateUserDB;
exports.onCreateUser = onCreateUser;
exports.checkNewUser = checkNewUser;
exports.deleteAccount = deleteAccount;

// CONVERSATIONS
exports.getConversations = getConversations;
exports.onCreateConversation = onCreateConversation
exports.onDeleteConversation = onDeleteConversation;

// PLAYERS
exports.responseInvitation = responseInvitation;
exports.sentInvitation = sentInvitation;
exports.onUpdatePlayer = onUpdatePlayer;
exports.onDeletePlayer=onDeletePlayer;
exports.savePlayersStats = savePlayersStats;
exports.updatePlayer = updatePlayer;
exports.onSyncPlayer = onSyncPlayer;
exports.leaveCoach = leaveCoach;
exports.getGroups = getGroups;

// RELATIONS
exports.onInvitation = onInvitation;
exports.onUpdateRelation = onUpdateRelation;

// CALENDAR
exports.deleteSession = deleteSession;
exports.getCalendar = getCalendar;
exports.newSession = newSession;

// ACCOUNTING
exports.getResumen = getResumen;

// MATCH
exports.newPoint = newPoint;

//SERVICES
exports.recursiveDelete = recursiveDelete;
exports.validateReceipt = validateReceipt;

exports.newPlayer = newPlayer;
