
export const createPostController = async (post, username)=>{
  const url = `http://localhost:8000/in/${username}/post/create`;

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json", // remove
      "Accept": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(post)
  })
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      return body;
    })
    .catch((errorResponse) => {
      // console.log("Fetch to faild /in/:username/post/create : ", errorResponse);
      return undefined;
    });

  return response;
}