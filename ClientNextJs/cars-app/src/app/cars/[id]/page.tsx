import Card from "@/components/layout/Card";
import getCar from "@/requests/Queries/getCar";
import type { Metadata } from 'next'
import styles from "./page.module.css";

type pageProps = Promise<{ id: number }>;

type Props = {
    params: pageProps
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props): Promise<Metadata> {
    const { id } = await params;

    const car = (await getCar(id, false)).data;
    const carName = `${car.model.mark.name} ${car.model.name}`;
    const description = `${car.model.mark.name} ${car.model.name} ${car.vin} цена ${car.price}$`

    return {
        title: carName,
        description: description,
        keywords: `${car.model.mark.name} ${car.model.name} ${car.vin} цена ${car.price}$`,
        openGraph: {
            images: [car.model.imgUrl],
            url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/cars/${id}`,
            description: `${car.model.mark.name} ${car.model.name} ${car.vin} цена ${car.price}$`,
            title: carName
        },
    }
}


export default async function Page(props: { params: pageProps }) {
    const { id } = await props.params;
    const car = (await getCar(id, false)).data;
    const carName = `${car.model.mark.name} ${car.model.name}`;

    return (
        <>
            <div className="content-container context-row">
                <h2>Страница деталей об автомобиле</h2>

                <Card className={styles.carContainer}>
                    <img
                        className={styles.carPhoto}
                        src={`${process.env.NEXT_PUBLIC_SERVER_CLIENT_API_HOST}${car.model.imgUrl}`}
                        alt={carName} />

                    <div className={styles.infoContainer}>
                        <h2>{carName}</h2>
                        <div className={styles.infoContainerRow}>
                            <div>Mark:</div>
                            <div>{car.model.mark.name}</div>
                        </div>
                        <div className={styles.infoContainerRow}>
                            <div>Model:</div>
                            <div>{car.model.name}</div>
                        </div>
                        <div className={styles.infoContainerRow}>
                            <div>Color:</div>
                            <div>{car.color.name}</div>
                        </div>
                        <div className={styles.infoContainerRow}>
                            <div>Vin:</div>
                            <div>{car.vin}</div>
                        </div>
                    </div>
                    <div className={styles.price}>
                        {car.price}$
                    </div>
                </Card>
            </div>
        </>


    );
}