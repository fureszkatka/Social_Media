import { isAuthenticated } from "../auth"

export const Read = (userId,token) =>{
    return fetch(`http://localhost:5000/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
}

export const Update = (userId,token,user) =>{
    console.log("userDataUpdate: ", user)
    return fetch(`http://localhost:5000/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const remove = (userId,token) =>{
    return fetch(`http://localhost:5000/user/${userId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
}


export const List = () =>{
    return fetch(`http://localhost:5000/users`, {
        method: "GET",
       
    }).then(response => {
        return response.json()
    })
}

export const updateUser = (user,next) =>{
    if(typeof window !== "undefined"){
        if(localStorage.getItem("jwt")){
            let auth = JSON.parse(localStorage.getItem("jwt"))
            auth.user = user
            localStorage.setItem('jwt', JSON.stringify(auth))
            next()
        }
    }
}

export const Follow = (userId,token,followId) =>{
    return fetch(`http://localhost:5000/user/follow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({userId, followId})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const unFollow = (userId,token,unfollowId) =>{
    return fetch(`http://localhost:5000/user/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({userId, unfollowId})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const findPeople =  (userId,token) =>{
    return fetch(`http://localhost:5000/user/findpeople/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}