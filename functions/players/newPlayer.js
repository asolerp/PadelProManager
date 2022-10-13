const functions = require("firebase-functions");
const admin = require("firebase-admin");

const fetch = require("node-fetch");
const { USERS } = require("../utils/constants");
const { createTransporter } = require("../utils/email/config");
const { generateNewPlayerTemplate } = require("../utils/email/newPlayerTemplate")

const API_WEB_FIREBASE = "AIzaSyC8aj5yS0qRdb75tQHs101a-mSn2xaUujI";
const DYNAMIK_LINK = "https://padelpromanager.page.link";

const newPlayer = functions.firestore
  .document("users/{userId}/players/{playerId}")
  .onCreate(async (snap, context) => {

    const coachId = context.params.userId;
    const player = snap.data()

    const coachQuery = await admin.firestore().collection(USERS).doc(coachId).get()
    const { email, firstName, secondName, profileImg } = coachQuery.data()

    const fullName = `${firstName} ${secondName}`

    console.log("EMAIL", email)

    const body = {
      dynamicLinkInfo: {
        domainUriPrefix: DYNAMIK_LINK,
        link: `https://padelpromanager.com/player_invitation?action=new_player&coach_id=${coachId}&coach_email=${email}`,
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

    const data = await response.json();

    console.log(data);



    console.log("PLAYER EMAIL", player?.email)
  
    const mailOptions = {
      from: "info@padelpromanager.com",
      to: player?.email,
      subject: "Invitación a equipo de entrenamiento",
      html: generateNewPlayerTemplate(fullName,profileImg,data.shortLink),
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
