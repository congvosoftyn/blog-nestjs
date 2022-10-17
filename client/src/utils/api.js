import { AxiosInstance } from "./axios.instance"

export const getRequest = async (URL) =>{
    return await AxiosInstance.get(`${URL}`)
}