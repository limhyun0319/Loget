import axios from 'axios';

export const postSignup = async (signupData: any) => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("EXPO_PUBLIC_API_URL is undefined. Check client/.env and restart expo with -c.");
  }

  const url = `${API_URL.replace(/\/$/, "")}/auth/signup`;
  console.log("POST:", url); // 디버그용

  const response = await axios.post(url, signupData, {
    headers: { "Content-Type": "application/json" },
    timeout: 15000,
  });

  return response.data;
};