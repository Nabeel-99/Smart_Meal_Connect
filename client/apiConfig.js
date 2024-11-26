import { Capacitor, CapacitorCookies } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import axios from "axios";

const BASE_URL =
  Capacitor.getPlatform() === "android"
    ? "http://10.0.2.2:8000" // Android Emulator
    : window.location.hostname === "localhost"
    ? "http://localhost:8000" // For local development
    : "https://smart-meal-finder.onrender.com"; // Production URL

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
    console.log("Token saved:", token);
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
