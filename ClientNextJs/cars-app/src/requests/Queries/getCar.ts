import ICar from "@/models/car";
import Axios, { AxiosResponse } from "axios";


const controller = new AbortController();
const url = 'api/v1/Cars';

export default function getCar(carId: number,isClientRender: boolean = false): Promise<AxiosResponse<ICar>> {
    const host = isClientRender ? process.env.NEXT_PUBLIC_SERVER_CLIENT_API_HOST : process.env.NEXT_PUBLIC_SERVER_HOST;
    return Axios.get<ICar>(
        host + url + `/${carId}`,
        {
            signal: controller.signal
        });
}