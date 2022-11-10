const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FB_REGION, PLAYERS, USERS, STATS, GLOBAL, CONVERSATIONS } = require("../../../utils/constants");
const { emptyStats } = require("../../../utils/emptyStats");


const onInvitation = functions
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

    const {playerId, coachId} = data;
    console.log("LOGS", playerId, coachId)
    try {

        const coachPlayerRef = admin
        .firestore()
        .collection(USERS)
        .doc(coachId)
        
        const playerRef = admin
        .firestore()
        .collection(USERS)
        .doc(playerId)
        
        const playerQuery =  await playerRef.get()
        const coachQuery = await coachPlayerRef.get()
        
        const playerDoc = playerQuery.data()
        const coachDoc = coachQuery.data()
        
        delete playerDoc.id
        
        const findPlayerQuery = await coachPlayerRef.collection(PLAYERS).where("email", "==", playerDoc.email).get()
        const findPlayerDocs = findPlayerQuery.docs.map(d => ({id: d.id, ...d.data()}))

        if (findPlayerDocs.length > 0) {
            if (findPlayerDocs[0].active) {
              return
            }
            await coachPlayerRef.collection(PLAYERS).doc(findPlayerDocs[0].id).update({...playerDoc, active: true})
        } else {
          await coachPlayerRef.collection(PLAYERS).add({
            ...playerDoc,
            active: true
        }).then(async d => {
          await coachPlayerRef
          .collection(PLAYERS)
          .doc(d.id)
          .collection(STATS)
          .doc(GLOBAL)
          .set({...emptyStats});
        })
      }

      const conversationRef = admin.firestore().collection(CONVERSATIONS)
      const conversationQuery = await conversationRef.where("coachEmail", "==", coachDoc.email).where("playerEmail", "==", playerDoc?.email).get()
      const conversationDocs = conversationQuery.docs?.map(d => ({id: d.id, ...d.data()}))
  

      if (conversationDocs?.length === 0 || !conversationDocs)  {
        await admin.firestore()
        .collection(CONVERSATIONS)
        .add({
          active: true,
          coachEmail: coachDoc?.email,
          playerEmail: playerDoc?.email,
          members: [coachDoc?.email, playerDoc?.email],
          type: 1,
        });
      }

      await playerRef.update({
        coachId: coachId,
        coachEmail: coachDoc.email,
        active: true,
      })
     
    } catch (err) {
      throw new Error(err);
    }
  });

module.exports = {
  onInvitation,
};
