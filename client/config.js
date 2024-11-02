const BASE_URL =
  window.location.hostname === "localhost" //localhost is for development
    ? "http://localhost:8000" // For local development
    : "http://192.168.100.19:8000"; // IP address

export default BASE_URL;
