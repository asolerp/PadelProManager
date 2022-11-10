const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {format} = require("date-fns");
const {FB_REGION, SESSIONS, USERS} = require("../../../utils/constants");
const { uuid } = require("uuidv4");


const CALENDAR_DATE_FORMAT = "yyyy-MM-dd";

const getCalendar = functions
    .region(FB_REGION)
    .runWith({
      timeoutSeconds: 540,
      memory: "2GB",
    })
    .https.onCall(async (data, context) => {
      console.log("CONTEXT", context)
      if (!context.auth) {
        throw new functions.https.HttpsError(
            "permission-denied",
            "The function must be called while authenticated.",
        );
      }

      console.log("OBTENIENDO SESIONES");

      const userRef = await admin.firestore().collection(USERS).doc(context?.auth?.uid).get()
      const userDoc = userRef.data()
      let calendarRef;


      if (userDoc.role === "coach" || userDoc.role === "admin") {
        calendarRef = await admin
            .firestore()
            .collection(SESSIONS)
            .where("coachId", "==", context?.auth?.uid)
            .get();
  
      } else {
        calendarRef = await admin
          .firestore()
          .collection(SESSIONS)
          .where("playersEmail", "array-contains", userDoc?.email)
          .get();
      }

     const sessions = calendarRef.docs.map((doc) => ({id: doc.id, ...doc.data()}));

      const parsedSessions = sessions.map((s) => ({
        ...s,
        date: format(s.date, CALENDAR_DATE_FORMAT),
      }));

      const groupedSessions = parsedSessions.reduce((r, a) => {
        r[a.date] = r[a.date] || [];
        r[a.date].push(a);
        return r;
      }, {});

      const generateEmptyDot = () => ({key: uuid(), color: "#2196f3"})	
      

      const markers = Object.keys(groupedSessions).reduce((acc, val) => {

        if (groupedSessions[val].length > 1) {
          return {
            ...acc,
            [val]: {...acc.val, dots: groupedSessions[val].map(() => generateEmptyDot())},
          };
        }
        return {
          ...acc,
          [val]: {marked: true, dots: [generateEmptyDot()]},
        };
      }, {});

      return {
        markers,
        status: "202",
        sessions: groupedSessions,
      };
    });

module.exports = {
  getCalendar,
};
