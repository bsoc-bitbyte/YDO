const API_BASE_URL = import.meta.env.VITE_API_URL;

const fetchUsers = async (signal) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/all`, { signal });
    if (!res.ok) throw new Error("Failed to fetch profiles");
    const data = await res.json();
    return { data };
  } catch (error) {
    if (error.name === "AbortError") {
    console.warn("Fetch aborted by user or unmount.");
    return { error: "aborted" };
  }
  console.error("Fetch error:", error);
  return { error: error.message };
  }
};

export default fetchUsers;
