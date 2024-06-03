export const fetchUserLogin = async (body) => {
  const url = "http://localhost:8000/auth/login";

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((body) => body)
    .catch(() => undefined);

  return response;
};
