'use client'

import Card from "@/components/layout/Card";
import ICar from "@/models/car";
import styles from "./index.module.css";
import { useRouter } from 'next/navigation'

export interface IProps {
    car: ICar;
}

export default function CarCard(props: IProps) {
    
    const router = useRouter()

    const carName = `${props.car.model.mark.name} ${props.car.model.name}`;
    return (
        <Card className={styles.carContainer}>
            <img
                className={styles.carPhoto}
                src={`${process.env.NEXT_PUBLIC_SERVER_CLIENT_API_HOST}${props.car.model.imgUrl}`}
                alt={carName} />

            <div className={styles.infoContainer}>
                <h2>{carName}</h2>
                <div className={styles.infoContainerRow}>
                    <div>Mark:</div>
                    <div>{props.car.model.mark.name}</div>
                </div>
                <div className={styles.infoContainerRow}>
                    <div>Model:</div>
                    <div>{props.car.model.name}</div>
                </div>
                <div className={styles.infoContainerRow}>
                    <div>Color:</div>
                    <div>{props.car.color.name}</div>
                </div>
                <div className={styles.infoContainerRow}>
                    <div>Vin:</div>
                    <div>{props.car.vin}</div>
                </div>
            </div>
            <div className={styles.price}>
                {props.car.price}$
            </div>
            <button onClick={() => router.push(`/cars/${props.car.carId}`)} className="primaryButton">Подробности</button>
        </Card>
    );
}