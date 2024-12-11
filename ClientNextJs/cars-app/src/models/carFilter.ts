export default interface ICarFilter {
    carColorId: number | null;
    carMarkId: number | null;
    carModelId: number | null;
    vinFreeText: string | null;
    limit: number | null;
    offset: number | null;
}