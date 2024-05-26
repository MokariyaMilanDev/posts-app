export const registerController = async (body) => {
  const url = "http://localhost:8000/auth/register";

  const response = await fetch(url, {
    method: "post",
    Credential: "omit",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      return body;
    })
    .catch((errorResponse) => {
      console.log("Fetch to faild /auth/register : ", errorResponse);
      return errorResponse.json();
    }).catch((errorResponseBody)=>{
      console.log("error response body : ", errorResponseBody);
    })

  return response;
};