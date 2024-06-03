export const fetchUserPosts = async (username) => {
  const url = `http://localhost:8000/in/${username}/posts`;

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((body) => body)
    .catch(() => undefined);

  return response;
};
