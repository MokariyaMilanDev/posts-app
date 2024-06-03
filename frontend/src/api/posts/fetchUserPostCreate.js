export const fetchUserPostCreate = async (post, username) => {
  const url = `http://localhost:8000/in/${username}/post/create`;

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((body) => body)
    .catch(() => undefined);

  return response;
};
