
export const fetchUserRegister = async (body) => {
  const url = "http://localhost:8000/auth/register";

  const response = await fetch(url, {
    method: "post",
    Credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((body) => body)
    .catch(() => undefined);

  return response;
};
