import ICarMark from "./carMark";

export default interface ICarModel {
    carModelId: number;
    name: string;
    mark: ICarMark;
    imgUrl: string;
}