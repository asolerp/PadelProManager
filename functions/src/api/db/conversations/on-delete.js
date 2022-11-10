
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {  CONVERSATIONS } = require("../../../utils/constants");


const onDeleteConversation = functions.firestore
  .document("groups/{groupId}")
  .onDelete(async (_,context) => {

    const conversationRef = admin.firestore().collection(CONVERSATIONS).where("groupId", "==", context.params.groupId)
    const conversationQuery = await conversationRef.get()
    const conversationDocs = conversationQuery.docs.map(d => d.id)

    await Promise.all(conversationDocs.map(async cId => await admin.firestore().collection(CONVERSATIONS).doc(cId).delete()))

  });

module.exports = {
  onDeleteConversation,
};
