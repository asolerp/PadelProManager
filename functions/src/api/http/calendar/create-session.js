const functions = require("firebase-functions");
const admin = require("firebase-admin");
const moment = require("moment");
const {firebaseIDGenerator} = require("../../../utils/firebaseIDGenerator");
const {getPhotoIfUserExists} = require("../../../utils/getPhotoIfUserExists");
const {FB_REGION, SESSIONS, ACCOUNTING} = require("../../../utils/constants");
const { createTransporter } = require("../../../utils/email/config");
const ical = require("ical-generator");
const { generateNewSessionTemplate } = require("../../../utils/email/newSessionTemplate");



const newSession = functions
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

      const payload = data.payload;
      const {week} = payload;

      const start = moment(new Date());
      const end = moment(new Date(new Date().getFullYear(), 11, 31));

      const sessionInternalId = firebaseIDGenerator();

      const result = [];

      const {players} = payload;

      const playersId = players.reduce((acc, player) => {
        return {
          ...acc,
          [player.id]: false
        }
      },{})

      let playersWithUserImage;

      playersWithUserImage = await Promise.all(
          players.map(async (player) => {
            const userImg = await getPhotoIfUserExists(player.email);
            if (userImg) {
              return {...player, profileImg: userImg};
            } else {
              return player;
            }
          }),
      );

      if (week && week.length > 0) {
        const batch = admin.firestore().batch();

        week.forEach((day) => {
          const current = start.clone();
          while (current.day(7 + day).isBefore(end)) {
            result.push(current.clone());
          }
        });

        result.forEach(async (date) => {
          const docRef = admin.firestore().collection(SESSIONS).doc();
          const accountingDocRef = admin.firestore().collection(ACCOUNTING).doc()


          batch.set(accountingDocRef, {
              date: date.valueOf(),
              coachId: payload.coachId,
              currency: payload.currency,
              price: payload.price,
              players: playersId,
              sessionId: docRef.id
          })

          batch.set(docRef, {
            ...payload,
            players: playersWithUserImage,
            accountingId: accountingDocRef.id,
            date: date.valueOf(),
            internalId: sessionInternalId,
          });
        });

        await batch.commit();

      } else {

        const sessionRef = admin.firestore().collection(SESSIONS).doc();
        const accountingDocRef = admin.firestore().collection(ACCOUNTING).doc()

        console.log("[[SESSION]]", {
          ...payload,
          players: playersWithUserImage,
          accountingId: payload.type === "session" ? accountingDocRef.id : null,
        })

        await sessionRef.set({
          ...payload,
          players: playersWithUserImage,
          accountingId: payload.type === "session" ? accountingDocRef.id : null,
        });

        if (payload.type === "session") {
          await accountingDocRef.set({
            date: payload.date,
            coachId: payload.coachId,
            currency: payload.currency,
            price: payload.price,
            players: playersId,
            sessionId: sessionRef.id
          })
        }

        let eventObj = {
          start: new Date(payload.startTime),
          end: new Date(payload.endTime),
          summary: payload.notes,
          sequence: 0,
          status: "confirmed"
        }

        let cal = ical({
          title: payload.title
        });

        cal.createEvent(eventObj);

        let emailTransporter = await createTransporter();

        await Promise.all(payload.playersEmail.map(pemail => {

          const mailOptions = {
            from: "info@padelpromanager.com",
            to: pemail,
            subject: "Tu entrenador a creado una nueva sesión",
            html: generateNewSessionTemplate(payload.notes),
            icalEvent: {
              method: "request",
              content: cal.toString()
              }
          };

          emailTransporter.sendMail(mailOptions, (error,) => {
            if (error) {
              console.log(error);
              return;
            }
            console.log("Sent!");
          });

        }))

   
      
  
      


      }
    });

module.exports = {
  newSession,
};
