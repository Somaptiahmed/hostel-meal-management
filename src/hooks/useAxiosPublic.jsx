import axios from "axios";

const publicApi = axios.create({
    baseURL: 'https://hotel-management-server-dun.vercel.app'
})

const useAxiosPublic = () => {
    return publicApi;
};

export default useAxiosPublic;