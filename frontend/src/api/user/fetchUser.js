export const fetchUser = async (username) => {
  console.log("OK");
  const url = `http://localhost:8000/in/${username}`;

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json", // remove
      Accept: "application/json",
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((body) => body)
    .catch(() => undefined);

  return response;
};
