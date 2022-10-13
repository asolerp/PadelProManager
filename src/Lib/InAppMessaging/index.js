import inAppMessaging from '@react-native-firebase/in-app-messaging';

export async function suppressInAppMessaging() {
  try {
    await inAppMessaging().setMessagesDisplaySuppressed(true);
  } catch (error) {
    console.error('Error suppressing in-app messaging', error);
  }
}

export async function initInAppMessaging() {
  try {
    await inAppMessaging().setMessagesDisplaySuppressed(false);
  } catch (error) {
    console.error('Error suppressing in-app messaging', error);
  }
}
