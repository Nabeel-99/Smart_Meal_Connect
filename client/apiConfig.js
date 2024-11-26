import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";

const BASE_URL =
  Capacitor.getPlatform() === "android"
    ? "http://10.0.2.2:8000" // Android Emulator
    : window.location.hostname === "localhost"
    ? "http://localhost:8000" // For local development
    : "http://192.168.100.19:8000"; // Production URL

export default BASE_URL;

export const isNative =
  Capacitor.getPlatform() === "android" || Capacitor.getPlatform() === "ios";

// native
const TOKEN_KEY = "auth_token";
export const saveNativeAuthToken = async (token) => {
  await Preferences.set({ key: TOKEN_KEY, value: token });
};
export const getNativeAuthToken = async () => {
  const { value } = await Preferences.get({ key: TOKEN_KEY });
  return value;
};
