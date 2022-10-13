const functions = require("firebase-functions");
const admin = require("firebase-admin");

const {FB_REGION, SESSIONS, ACCOUNTING} = require("../utils/constants");
const { format } = require("date-fns");

const getResumen = functions
    .region(FB_REGION)
    .runWith({
      timeoutSeconds: 540,
      memory: "2GB",
    })
    .https.onCall(async (data, context) => {

      if (!context.auth) {
        throw new functions.https.HttpsError(
            "permission-denied",
            "The function must be called while authenticated.",
        );
      }

      console.log("GETTING ACCOUNTING RESUME");

      const end = new Date();
      end.setHours(23, 59, 59, 59);
      const parsedEnd = Number(format(end, "T"));
    

      const accountingRef = await admin
          .firestore()
          .collection(ACCOUNTING)
          .where("coachId", "==", context?.auth?.uid)
          .where("date", "<=", parsedEnd)
          .get();

      const accountings = accountingRef.docs.map((doc) => ({id: doc.id, ...doc.data()}));

      const accountingWithSessionData = await Promise.all(accountings.map(async (registry) => {
        const sessionRef = await admin
        .firestore()
        .collection(SESSIONS)
        .doc(registry.sessionId)
        .get();
    
        return {
            ...registry,
            session: sessionRef.data()
        }
        
      }));

      const total = accountings.reduce((acc, registry) => {
        return acc + Number(registry.price)
      },0)

      const totalPending = accountings.reduce((acc, registry) => {

          const playersHavePaid = Object.entries(registry?.players)
            .map(([, value]) => value)
            .filter(val => val).length

          const unitPrice = registry?.price / Object.keys(registry?.players).length;
        
        if (playersHavePaid.length === 0) {
            return acc + registry.price
        }

        return acc + (registry?.price - (playersHavePaid * unitPrice))


      },0)

  
   
      return {
        total,
        totalPending,
        accountingWithSessionData
      };
    });

module.exports = {
    getResumen,
};
