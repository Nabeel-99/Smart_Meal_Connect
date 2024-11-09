import { Capacitor } from "@capacitor/core";

const BASE_URL =
  Capacitor.getPlatform() === "android"
    ? "http://10.0.2.2:8000" // Android Emulator
    : window.location.hostname === "localhost"
    ? "http://localhost:8000" // For local development
    : "https://your-production-url.com"; // Production URL

export default BASE_URL;

export const isNative =
  Capacitor.getPlatform() === "android" || Capacitor.getPlatform() === "ios";
