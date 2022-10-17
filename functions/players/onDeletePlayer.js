const functions = require("firebase-functions");
const admin = require("firebase-admin");


const { USERS, CONVERSATIONS } = require("../utils/constants");

const onDeletePlayer = functions.firestore
  .document("users/{userId}/players/{playerId}")
  .onDelete(async (snap, context) => {

    const coachId = context.params.userId;
    const deletedPlayer = snap.data()

    const playerQuery = await admin.firestore().collection(USERS).where("email", "==", deletedPlayer?.email).get()
    const playerDocs = playerQuery.docs.map(d => ({id: d.id, ...d.data()}))
    const player = playerDocs?.[0]
    
    const coachQuery = await admin.firestore().collection(USERS).doc(coachId).get()
    const coach = coachQuery.data()

    const converSationQuery = await admin.firestore().collection(CONVERSATIONS).where("coachEmail", "==", coach?.email).where("playerEmail", "==", player?.email).get()
    const conversationDocs = converSationQuery.docs?.map(d => ({id: d.id, ...d.data()}))
    const conversation = conversationDocs?.[0]

    if (conversation) {
      await admin.firestore().collection(CONVERSATIONS).doc(conversation?.id).update({
        active: false
      })
    }

    if (!player) {
      return
    }

    if (!player.coachId) {
        return
    }

    if (player.coachId !== coachId) {
        return
    }

    await admin.firestore().collection(USERS).doc(player.id).update({
        coachId: admin.firestore.FieldValue.delete()
    })


  });

module.exports = {
    onDeletePlayer,
};
