import CatalogFilter from "@/components/pagesContent/home/CatalogFilter";
import ICarFilter from "@/models/carFilter";
import getCars from "@/requests/Queries/getCars";
import getCarColors from "@/requests/Queries/getCarColors";
import getCarModels from "@/requests/Queries/getCarModels";
import getCarMarks from "@/requests/Queries/getCarMarks";
import styles from "./page.module.css";
import CarCard from "@/components/pagesContent/home/CarCard";
import Pagination from "@/components/Pagination";
export const dynamic = "force-dynamic";


export default async function Home({ searchParams }
  : {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }) {

  const colors = (await getCarColors()).data;
  const models = (await getCarModels()).data;
  const marks = (await getCarMarks()).data;

  const { mark, model, color, vin, limit, offset } = await searchParams;

  const limitNumber = limit == null ? 10 : parseInt(limit.toString())
  const offsetNumber = offset == null ? 0 : parseInt(offset.toString());

  const carFilter: ICarFilter = {
    carColorId: color == null ? null : parseInt(color.toString()),
    carMarkId: mark == null ? null : parseInt(mark.toString()),
    carModelId: model == null ? null : parseInt(model.toString()),
    vinFreeText: vin == null ? null : vin.toString(),
    limit: limitNumber,
    offset: offsetNumber,
  };


  const carsResponse = await getCars(carFilter, false);
  const cars = carsResponse.data;
  const totalCount = parseInt(carsResponse.headers["x-total-count"]);

  return (
    <>
      <div className="content-container context-row">
        <CatalogFilter colors={colors} models={models} marks={marks} />
        <h2>Всего машин по запросу: {totalCount}</h2>
      </div>
      <div className={`${styles.carsContainer} content-container context-row`}>
        {cars.length == 0 &&
          <h1>Подходящие машины не найдены</h1>
        }
        {cars.length != 0 && cars.map(car =>
          <CarCard key={car.carId} car={car} />
        )}
      </div>
      <div className="content-container context-row">
        <Pagination
          itemsOnPage={limitNumber}
          totalItemsCount={totalCount}
          offset={offsetNumber}
          searchParams={await searchParams} 
          baseUrl="/"
          />
      </div>
    </>

  );
}
