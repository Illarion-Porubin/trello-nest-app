import axios from "axios";
const apiUrl = "http://localhost:5000/";


export function getLists(){
    return axios.get(apiUrl + "lists")
}

export function addUser(body) {
    return axios.post(apiUrl + "users", body);
}

export function addList(body) {
    return axios.post(apiUrl + "lists", body);
}

export function addCard(body) {
    return axios.post(apiUrl + "card", body)
}

export function changeDate(body) {
    console.log(body, "changeDate")
    return axios.patch(apiUrl + "card", body)
}

