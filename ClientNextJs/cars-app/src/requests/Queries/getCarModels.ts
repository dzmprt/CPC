import ICarModel from "@/models/carModel";
import Axios, { AxiosResponse } from "axios";


const controller = new AbortController();
const url = 'api/v1/Cars/Models';

export default function getCarModels(isClientRender: boolean = false): Promise<AxiosResponse<ICarModel[]>> {
    const host = isClientRender ? process.env.NEXT_PUBLIC_SERVER_CLIENT_API_HOST : process.env.NEXT_PUBLIC_SERVER_HOST;

    return Axios.get<ICarModel[]>(
        host + url,
        {
            signal: controller.signal
        });
}