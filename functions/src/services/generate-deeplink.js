const DYNAMIK_LINK = "https://padelpromanager.com";
const API_WEB_FIREBASE = "AIzaSyC8aj5yS0qRdb75tQHs101a-mSn2xaUujI";
const fetch = require("node-fetch");

const generateDeepLink = async ({coachId, email, player}) => {

    const body = {
        dynamicLinkInfo: {
          domainUriPrefix: DYNAMIK_LINK,
          link: `https://padelpromanager.com/player_invitation?action=new_player&coach_id=${coachId}&coach_email=${email}&player_email=${player.email}`,
          iosInfo: {
            iosAppStoreId: "1608207639",
            iosBundleId: "com.padelpro",
          },
          navigationInfo: {
            enableForcedRedirect: true,
          },
        },
      };
  
      const url = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${API_WEB_FIREBASE}`;
  
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"},
      });
  
      return await response.json();

}

module.exports = {
    generateDeepLink
}