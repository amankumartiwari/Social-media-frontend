export const read = (userID, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
