

export const userController = async (username)=>{
 const url = `http://localhost:8000/in/${username}`;

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",// remove
      "Accept":"application/json"
    },
    credentials: "include",
  })
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      return body;
    })
    .catch((errorResponse) => {
      console.log("Fetch to faild /in/:username : ", errorResponse);
      return undefined;
    });

  return response;
}
