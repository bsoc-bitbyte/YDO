const API_BASE_URL = import.meta.env.VITE_API_URL;

const fetchUsers = async (signal) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/profiles`, { signal });
    if (!res.ok) throw new Error("Failed to fetch profiles");
    const data = await res.json();
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

export default fetchUsers;
