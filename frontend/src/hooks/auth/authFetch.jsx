export const authFetch = async (url, options = {}) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (user?.token) {
    headers.Authorization = `Bearer ${user.token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token invalid or expired
    localStorage.removeItem("user");
    window.location.href = "/login"; // hard redirect to reset state
    throw new Error("Unauthorized");
  }

  return response;
};
