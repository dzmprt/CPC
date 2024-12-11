import ICar from "@/models/car";
import ICarFilter from "@/models/carFilter";
import Axios, { AxiosResponse } from "axios";


const controller = new AbortController();
const url = 'api/v1/Cars';

export default function getCars(filter: ICarFilter,isClientRender: boolean = false): Promise<AxiosResponse<ICar[]>> {
    const host = isClientRender ? process.env.NEXT_PUBLIC_SERVER_CLIENT_API_HOST : process.env.NEXT_PUBLIC_SERVER_HOST;

    return Axios.get<ICar[]>(
        host + url,
        {
            params: {...filter},
            signal: controller.signal
        });
}