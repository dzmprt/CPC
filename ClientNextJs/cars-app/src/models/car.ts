import ICarColor from "./carColor";
import ICarModel from "./carModel";

export default interface ICar{
    carId: number;
    model: ICarModel;
    color: ICarColor;
    vin: string;
    price: number;
}