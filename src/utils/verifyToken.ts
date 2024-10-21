import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
