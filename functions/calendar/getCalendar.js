const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {format} = require('date-fns');
const {FB_REGION, SESSIONS} = require('../utils/constants');

const DATE_FORMAT = 'yyyy-MM-dd';

const getCalendar = functions
  .region(FB_REGION)
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'The function must be called while authenticated.',
      );
    }

    console.log('OBTENIENDO SESIONES');

    const calendarRef = await admin
      .firestore()
      .collection(SESSIONS)
      .where('coachId', '==', context?.auth?.uid)
      .get();

    const sessions = calendarRef.docs.map(doc => ({id: doc.id, ...doc.data()}));

    const parsedSessions = sessions.map(s => ({
      ...s,
      date: format(s.date, DATE_FORMAT),
    }));

    const groupedSessions = parsedSessions.reduce((r, a) => {
      r[a.date] = r[a.date] || [];
      r[a.date].push(a);
      return r;
    }, {});

    const markers = Object.keys(groupedSessions).reduce((acc, val) => {
      return {
        ...acc,
        [val]: {marked: true},
      };
    }, {});

    return {
      markers,
      status: '202',
      sessions: groupedSessions,
    };
  });

module.exports = {
  getCalendar,
};
