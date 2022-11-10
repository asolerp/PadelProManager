
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { USERS } = require("../../../utils/constants");



const onCreateConversation = functions.firestore
  .document("conversations/{conversationId}")
  .onUpdate(async (change,context) => {

    const conversation = change.after.data(); 

    const members = conversation.members

    const membersTokens = await Promise.all(members.filter(m => m !== conversation.lastMessage.user._id).map(async m => {
      const userRef = await admin.firestore().collection(USERS).where("email", "==", m).get()
      const userDocs = userRef.docs.map(d => d.data())
      const token = userDocs[0].token
      return token
    }))

    let notification = {
      title: "Nuevo mensaje",
      body: "Tienes un nuevo mensaje",
    };

    let data = {
      type: "chat",
      docId: context.params.conversationId,
    };

    await admin.messaging().sendMulticast({
      tokens: membersTokens,
      notification,
      apns: {
        payload: {
          aps: {
            "content-available": 1,
            mutableContent: 1,
            sound: "default",
          },
        },
      },
      data,
    });

  });

module.exports = {
  onCreateConversation,
};
