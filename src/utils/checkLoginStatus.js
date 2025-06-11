export const checkLoginStatus = async (API_BASE_URL) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return false;

    const response = await fetch(`${API_BASE_URL}/auth/user`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (err) {
    console.error("Error checking login status:", err);
    return false;
  }
};
