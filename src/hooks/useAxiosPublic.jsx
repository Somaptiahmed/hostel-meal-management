import axios from "axios";

const publicApi = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosPublic = () => {
    return publicApi;
};

export default useAxiosPublic;