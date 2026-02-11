import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/"
})

export const oldMathod = () => {
    return api.get('/posts');
}

export const getApi = async (pageNumber) => {
    try {
        const res = await api.get(`/posts?_start=${pageNumber}&_limit=16`)
        if (res.status === 200) return res.data
    } catch (error) {
        console.log(error);
    }
    // return api.get("/posts?_start=0&_limit=20")
}

export const getIndvData = async (id) => {
    try {
        const res = await api.get(`/posts/${id}`);
        if (res.status === 200) return res.data
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => {
    return api.delete(`/posts/${id}`)
}


export const updatePost = (id) => {
    return api.patch(`/posts/${id}`, { title: "I have Updated" })
}