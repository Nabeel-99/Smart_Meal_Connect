import { Capacitor } from "@capacitor/core";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000" // For local development
    : Capacitor.getPlatform() === "android"
    ? "http://10.0.2.2:8000" // Android
    : "http://192.168.100.19:8000"; // iOS
export default BASE_URL;
