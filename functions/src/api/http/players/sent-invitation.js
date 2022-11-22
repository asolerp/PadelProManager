const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { USERS,REQUESTS, FB_REGION, COAH_REQUESTS } = require("../../../utils/constants");
const { createTransporter } = require("../../../utils/email/config");
const { generateNewPlayerTemplate } = require("../../../utils/email/newPlayerTemplate");


const { generateCoachRequestCode } = require("../../../utils/generateCoachRequestCode");
const { generateDeepLink } = require("../../../services/generate-deeplink");

const sentInvitation = functions
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

    const { player, coachId } = data

    const userRef = admin.firestore().collection(USERS)

    const coachRequestRef = admin.firestore().collection(COAH_REQUESTS)
    const requestRef = admin.firestore().collection(REQUESTS)

    const coachQuery = await userRef.doc(coachId).get()
    const coachDoc = {id: coachQuery.id, ...coachQuery.data()}
    const { email, firstName, secondName, profileImg } = coachDoc
    const fullName = `${firstName} ${secondName}`

    const coachRequestCode = generateCoachRequestCode()

    await coachRequestRef.add({
      coachId: coachDoc.id,
      coachEmail: email,
      code: coachRequestCode,
      createdAt: new Date()
    })

    const requestQuery = await requestRef.where("coachEmail", "==", email).where("playerEmail", "==", player.email).get()
    const requestDocs = requestQuery.docs.map(d => ({id: d.id, ...d.data()}))

    if (requestDocs.length > 0) {
        throw new functions.https.HttpsError(
            "already-sent",
            "The invitation has been already sent.",
        );
    }
  
    await admin.firestore().collection(REQUESTS).add({
      createdAt: new Date(),
      playerEmail: player.email?.toLowerCase(),
      coachEmail: email,
      coachId: coachId,
      active: false,
    });

    const dataDeepLink = await generateDeepLink({ coachId, player, email})

    const mailOptions = {
        from: "info@padelpromanager.com",
        to: player?.email,
        subject: "Invitación a equipo de entrenamiento",
        html: generateNewPlayerTemplate(fullName,profileImg,dataDeepLink.shortLink),
      };
    
    let emailTransporter = await createTransporter();


    return emailTransporter.sendMail(mailOptions, (error,) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Sent!");
    });

  });

module.exports = {
    sentInvitation,
};
