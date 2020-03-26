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


export const update = (userID, token,user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: user
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const follow = (userID, token,followId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({userID,followId})
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};




export const remove = (userID, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userID}`, {
    method: "DELETE",
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


export const list = ()=>{
  return fetch(`${process.env.REACT_APP_API_URL}/users`,{
    method:"GET"
  } )
  .then(response=>{
    return response.json()
  })
  .catch(err=>{
    console.log(err);
  })
}

export const updateUser = (user,next)=>{

  if( typeof window !== undefined){
     if(localStorage.getItem("jwt")){
       let auth = JSON.parse(localStorage.getItem("jwt"))
       auth.user=user
       localStorage.setItem('jwt',JSON.stringify(auth))
       next();
     }
  }

}