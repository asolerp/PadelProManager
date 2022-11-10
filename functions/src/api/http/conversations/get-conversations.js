const functions = require("firebase-functions");
const admin = require("firebase-admin");

const {FB_REGION, CONVERSATIONS, USERS, GROUPS} = require("../../../utils/constants");

const getConversations = functions
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

      const payload = data;
      const {userEmail} = payload;

      const conversationsRef = await admin.firestore().collection(CONVERSATIONS).where("members", "array-contains", userEmail).get()
      const conversations = conversationsRef.docs.map(doc => ({id: doc.id, ...doc.data()}))

      const conversationsWithFullMembers = await Promise.all(conversations.map(async (conve) => {
        
        let group = {};
        let player  = {}

        const members = await Promise.all(conve.members.map(async (member) => {
          const membersQuery = await admin.firestore().collection(USERS).where("email", "==", member).get()
          const membersResponse = membersQuery.docs.map(doc => ({id: doc, ...doc.data()}))
          return membersResponse[0]
        }))

        const coach = members.find(m => m.role === "coach" || m.role === "admin")
        
        if (conve.type === 2 && conve.groupId) {
          const groupRef = await admin.firestore().collection(GROUPS).doc(conve.groupId).get()
          group = groupRef.data()
        } else {
           player = conve.type === 1 ? members.find(m => m.role === "player") : null
        } 

        return {
          ...conve,
          coach,
          group,
          player,
          members
        }
         
      }))

      return {
        conversationsWithFullMembers
      }

    });

module.exports = {
    getConversations,
};
