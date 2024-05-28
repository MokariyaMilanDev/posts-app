export const loginController = async (body) => {
  const url = "http://localhost:8000/auth/login";

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      return body;
    })
    .catch((errorResponse) => {
      console.log("Fetch to faild /auth/login : ", errorResponse);
      return undefined;
    });

  return response;
};
