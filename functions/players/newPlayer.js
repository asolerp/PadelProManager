const functions = require("firebase-functions");
const admin = require("firebase-admin");

const fetch = require("node-fetch");
const { USERS, CONVERSATIONS, PLAYERS, REQUESTS, FB_REGION } = require("../utils/constants");
const { createTransporter } = require("../utils/email/config");
const { generateNewPlayerTemplate } = require("../utils/email/newPlayerTemplate");
const { PLAYER_EXISTS } = require("../utils/errorsCode");
const { emptyStats } = require("../utils/emptyStats");

const API_WEB_FIREBASE = "AIzaSyC8aj5yS0qRdb75tQHs101a-mSn2xaUujI";
const DYNAMIK_LINK = "https://padelpromanager.page.link";

const newPlayer = functions
.region(FB_REGION)
.runWith({
  timeoutSeconds: 540,
  memory: "2GB",
})
.https.onCall(async (data,) => {

    const { player, coachId, playerId } = data

    const userRef = admin.firestore().collection(USERS)
    const conversationRef = admin.firestore().collection(CONVERSATIONS)

    const coachQuery = await userRef.doc(coachId).get()
    const coachDoc = coachQuery.data()
    const { email, firstName, secondName, profileImg } = coachDoc
    const fullName = `${firstName} ${secondName}`

    const conversationQuery = await conversationRef.where("coachEmail", "==", coachDoc.email).where("playerEmail", "==", player?.email).get()
    const conversationDocs = conversationQuery.docs?.map(d => ({id: d.id, ...d.data()}))

    const playerCoachQuery = await userRef.doc(coachId).collection(PLAYERS).where("email", "==", player?.email).get()
    const playerCoachDocs = playerCoachQuery.docs?.map(d => ({id: d.id, ...d.data()}))

    if (playerCoachDocs.length > 0) {
      throw new Error(PLAYER_EXISTS);
    }

    if (conversationDocs?.length === 0 || !conversationDocs)  {
      await admin.firestore()
      .collection(CONVERSATIONS)
      .add({
        active: true,
        coachEmail: email,
        playerEmail: player.email?.toLowerCase(),
        members: [email, player.email?.toLowerCase()],
        type: 1,
      });
    }

    await userRef.doc(coachId).collection(PLAYERS).doc(playerId).set({
      ...Object.fromEntries(
        Object.entries(player).filter(([,value]) => !!value),
      ),
      email: player.email?.toLowerCase(),
    })

    await userRef.doc(coachId).collection(PLAYERS).doc(playerId)
        .collection("stats")
        .doc("global")
        .set(emptyStats)
   
    await admin.firestore().collection(REQUESTS).add({
      createdAt: new Date(),
      playerEmail: player.email?.toLowerCase(),
      coachEmail: email,
      coachId: coachId,
      active: false,
    });

    const body = {
      dynamicLinkInfo: {
        domainUriPrefix: DYNAMIK_LINK,
        link: `https://padelpromanager.com/player_invitation?action=new_player&coach_id=${coachId}&coach_email=${email}&player_email=${player.email}`,
        iosInfo: {
          iosAppStoreId: "1608207639",
          iosBundleId: "com.padelpro",
        },
      },
    };

    const url = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${API_WEB_FIREBASE}`;

    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(body),
      headers: {"Content-Type": "application/json"},
    });

    const dataDeepLink = await response.json();
  
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
  newPlayer,
};
