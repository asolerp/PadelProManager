const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { USERS,REQUESTS, FB_REGION, PLAYERS } = require("../../../utils/constants");

const responseInvitation = functions
.region(FB_REGION)
.runWith({
  timeoutSeconds: 540,
  memory: "2GB",
})
.https.onCall(async (data,context) => {

  if (!context.auth) {
    throw new functions.https.HttpsError(
        "permission-denied",
        "The function must be called while authenticated.",
    );
  }

    const { requestId, playerEmail, response } = data

    const userRef = admin.firestore().collection(USERS)
    const requestRef = admin.firestore().collection(REQUESTS)
    const requestQuery = await requestRef.doc(requestId).get()
    const requestDoc = {id: requestQuery.id, ...requestQuery.data()}

    if (response) {
        
        const playerQuery = await userRef.doc(requestDoc.coachId).collection(PLAYERS).where("email", "==", playerEmail).get()
        const playerDoc = playerQuery.docs.map(d => ({id: d.id, ...d.data()}))

        if (playerDoc.length > 0) {
            await userRef.doc(requestDoc.coachId).collection(PLAYERS).doc(playerDoc?.[0]?.id).update({
                active: true
            })
        }

        await userRef.doc(context.auth.uid).update({
            coachId: requestDoc.coachId,
            coachEmail: requestDoc.coachEmail
        })

        await requestRef.doc(requestId).delete()

    } else {
        await requestRef.doc(requestId).delete()
    }

  });

module.exports = {
    responseInvitation,
};
