import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
}

const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  };

export const isAuthenticated = async (): Promise<boolean> => {
  const authToken = getCookie('AuthToken');
  if (!authToken) {
    return false;
  }

  try {
    const decoded: JwtPayload = jwtDecode(authToken);
    const isExpired = decoded.exp * 1000 < Date.now(); // `exp` is in seconds
    return !isExpired;
  } catch {
    return false;
  }
};
