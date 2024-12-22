import { PushNotifications } from "@capacitor/push-notifications";
import { axiosInstance } from "../../apiConfig";

/**
 * @typedef {import('@capacitor/push-notifications').PushNotificationSchema} PushNotificationSchema
 * @typedef {import('@capacitor/push-notifications').Token} Token
 * @typedef {import('@capacitor/push-notifications').ActionPerformed} ActionPerformed
 */

let notificationTimeout;

/**
 * Handle push received
 * @param {import('@capacitor/push-notifications').PushNotificationSchema} notification
 */
export const handlePushReceived = async (
  notification,
  setMessage,
  setShowNotificationBar
) => {
  const message = {
    title: notification?.title || "Notification",
    body: notification?.body || "You have a new notification!",
  };
  setMessage(message);
  setShowNotificationBar(true);
  PushNotifications.removeAllDeliveredNotifications();
  if (notificationTimeout) {
    clearTimeout(notificationTimeout);
  }
  notificationTimeout = setTimeout(() => {
    setShowNotificationBar(false);
  }, 3500);
};

export const requestPushNotificationPermissions = (
  isNative,
  userData,
  setShowNotificationBar,
  setMessage
) => {
  if (isNative && userData) {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === "granted") {
        PushNotifications.register();
      } else {
        console.log("not granted");
      }
    });

    PushNotifications.addListener(
      "registration",
      /** @param {Token} token */ (token) => {
        saveNotificationToken(token.value);
      }
    );

    PushNotifications.addListener("registrationError", (error) => {
      alert("Error on registration: " + JSON.stringify(error));
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        handlePushReceived(notification, setMessage, setShowNotificationBar);
      }
    );

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      /** @param {ActionPerformed} notification */ (notification) => {
        // alert("Push action performed: " + JSON.stringify(notification));
        console.log("push action", JSON.stringify(notification));
      }
    );
  }
};

export const saveNotificationToken = async (notificationToken) => {
  try {
    await axiosInstance.post(`/api/auth/save-notification-token`, {
      fcmToken: notificationToken,
    });
  } catch (error) {
    console.log("error saving token", error);
  }
};
