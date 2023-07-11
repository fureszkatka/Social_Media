export const createPost = (userId,token,post) =>{
    return fetch(`http://localhost:5000/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const posts = (postId) =>{
    return fetch(`http://localhost:5000/post/${postId}`, {
        method: "GET",
       
    })
    .then(response => {
        return response.json()
    })
}

export const List = () =>{
    return fetch(`http://localhost:5000/posts`, {
        method: "GET",
       
    })
    .then(response => {
        return response.json()
    })
}

export const removePost = (postId,token) =>{
    return fetch(`http://localhost:5000/post/${postId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
}



export const ListByUser = (token,userId) =>{
    return fetch(`http://localhost:5000/posts/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
}

export const updatePost = (postId,token,post) =>{
    return fetch(`http://localhost:5000/post/${postId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const like = (userId,token,postId) =>{
    return fetch(`http://localhost:5000/post/like`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userId, postId)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const unlike = (userId,token,postId) =>{
    return fetch(`http://localhost:5000/post/unlike`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userId, postId)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}