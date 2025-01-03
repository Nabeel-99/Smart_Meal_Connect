import { Capacitor, CapacitorCookies } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import axios from "axios";

const BASE_URL =
  Capacitor.getPlatform() === "android"
    ? "https://smart-meal-backend.onrender.com" // Android Emulator
    : window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://smart-meal-backend.onrender.com"; // Production URL*

export default BASE_URL;

export const isNative =
  Capacitor.getPlatform() === "android" || Capacitor.getPlatform() === "ios";

// native
const TOKEN_KEY = "auth_token";

export const saveNativeAuthToken = async (token) => {
  if (isNative) {
    await Preferences.set({
      key: TOKEN_KEY,
      value: token,
    });
  } else {
    console.warn("Non-native platforms should use browser cookies instead.");
  }
};

export const getNativeAuthToken = async () => {
  if (isNative) {
    const { value } = await Preferences.get({ key: TOKEN_KEY });
    return value || null;
  }
  return null;
};

export const clearNativeAuthToken = async () => {
  if (isNative) {
    await Preferences.remove({ key: TOKEN_KEY });
    console.log("Token cleared");
  }
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (isNative) {
      const token = await getNativeAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };

export const base64ToFile = (base64, filename) => {
  if (!base64) {
    throw new Error("Invalid base64 string");
  }

  const splitBase64 = base64.split(",");
  if (splitBase64.length < 2) {
    throw new Error("Invalid base64 string format");
  }

  const [metadata, data] = splitBase64;
  const mime = metadata.match(/:(.*?);/)[1];
  const binaryString = atob(data);
  const byteNumbers = new Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    byteNumbers[i] = binaryString.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new File([byteArray], filename, { type: mime });
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
