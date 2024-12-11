import ICarColor from "@/models/carColor";
import Axios, { AxiosResponse } from "axios";


const controller = new AbortController();
const url = 'api/v1/Cars/Colors';

export default function getCarColors(isClientRender: boolean = false): Promise<AxiosResponse<ICarColor[]>> {
    const host = isClientRender ? process.env.NEXT_PUBLIC_SERVER_CLIENT_API_HOST : process.env.NEXT_PUBLIC_SERVER_HOST;

    return Axios.get<ICarColor[]>(
        host + url,
        {
            signal: controller.signal
        });
}