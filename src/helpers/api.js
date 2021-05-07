import axios from "axios";

const axiosGet = (url) => {
    const headers = {
        "Authorization": `Bearer ${process.env.VUE_APP_API_TOKEN}`
    };
    axios.get(url, { headers })
        .then(response => {
           return response
        })
}


export {
    axiosGet
}