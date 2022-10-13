const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FB_REGION } = require("../utils/constants");

const getGroups = functions
.region(FB_REGION)
.runWith({
  timeoutSeconds: 540,
  memory: "2GB",
})
.https.onCall(async (data,) => {
    const {userId} = data;

    try {
      const groupsQuery = await admin
        .firestore()
        .collection("groups")
        .where("coachId", "==", userId)
        .get();

      const groupDocs = groupsQuery.docs.map((d) => ({id: d.id, ...d.data()}));

      const groupsWithFullData = await Promise.all(
        groupDocs.map(async (group) => {
          const members = await Promise.all(
            group.members.map(async (m) => {
              const userQuery = await admin
                .firestore()
                .collection("users")
                .where("email", "==", m)
                .get();
              const userDoc = userQuery.docs.map((d) => ({
                id: d.id,
                ...d.data(),
              }));
              return userDoc[0];
            }),
          );
          return {
            ...group,
            members,
          };
        }),
      );

      return {
        groupsWithFullData,
      };
    } catch (err) {
      throw new Error(err);
    }
  });

module.exports = {
  getGroups,
};
