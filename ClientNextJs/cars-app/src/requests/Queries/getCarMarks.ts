import ICarMark from "@/models/carMark";
import Axios, { AxiosResponse } from "axios";


const controller = new AbortController();
const url = 'api/v1/Cars/Marks';

export default function getCarMarks(isClientRender: boolean = false): Promise<AxiosResponse<ICarMark[]>> {
    const host = isClientRender ? process.env.NEXT_PUBLIC_SERVER_CLIENT_API_HOST : process.env.NEXT_PUBLIC_SERVER_HOST;

    return Axios.get<ICarMark[]>(
        host + url,
        {
            signal: controller.signal
        });
}