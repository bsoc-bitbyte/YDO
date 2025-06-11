export const fetchUserData = async (API_BASE_URL) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/auth/user`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};
