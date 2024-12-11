"use client";

import ICarColor from "@/models/carColor";
import styles from "./index.module.css";
import Card from "@/components/layout/Card";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import ICarMark from "@/models/carMark";
import ICarModel from "@/models/carModel";
import { useRouter, useSearchParams } from "next/navigation";

export interface IProps {
    colors: ICarColor[];
    models: ICarModel[];
    marks: ICarMark[];
}

export default function CatalogFilter(props: IProps) {

    const searchParams = useSearchParams();
    const router = useRouter();

    const [carColors] = useState<ICarColor[]>(props.colors);
    const [carModels] = useState<ICarModel[]>(props.models);
    const [carMarks] = useState<ICarMark[]>(props.marks);

    const [selectedColorId, setSelectedColorId] = useState<number>(-1);
    const [selectedCarMarkId, setSelectedCarMarkId] = useState<number>(-1);
    const [selectedCarModelId, setSelectedCarModelId] = useState<number>(-1);

    const [vin, setVin] = useState<string>('');

    const onChangeVin = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setVin(event.target.value);
    }, []);

    const onChangeSelectedCarModelId = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const modelId = parseInt(event.target.value);
        setSelectedCarModelId(modelId);
        const markId = carModels.find(c => c.carModelId === modelId)?.mark.carMarkId ?? -1;
        setSelectedCarMarkId(markId)
    }, [carModels]);

    const onChangeSelectedCarMarkId = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCarMarkId(parseInt(event.target.value));
        setSelectedCarModelId(-1);
    }, []);

    const onChangeSelectedCarColorId = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedColorId(parseInt(event.target.value));
    }, []);

    const applyFilter = () => {
        let url = "";
        let firstParam = true;

        if (selectedColorId > 0) {
            url += createQueryParam(
                "color",
                selectedColorId.toString(),
                firstParam
            );
            firstParam = false;
        }

        if (selectedCarMarkId > 0) {
            url += createQueryParam(
                "mark",
                selectedCarMarkId.toString(),
                firstParam
            );
            firstParam = false;
        }

        if (selectedCarModelId > 0) {
            url += createQueryParam(
                "model",
                selectedCarModelId.toString(),
                firstParam
            );
            firstParam = false;
        }

        if (vin?.length > 0) {
            url += createQueryParam(
                "vin",
                vin,
                firstParam
            );
            firstParam = false;
        }else{
            url += createQueryParam(
                "vin",
                '',
                firstParam
            );
            firstParam = false;
        }

        router.push(url);

    }

    const createQueryParam = useCallback((name: string,
        value: string | undefined,
        firstParam: boolean) => {
        if (value == null) {
            return "";
        }

        return `${firstParam ? "?" : "&"}${name}=${encodeURIComponent(value)}`;

    }, [])

    const fillFormByQueryParams = useCallback(async () => {
        const colorId = searchParams.get("color");
        if (colorId) {
            setSelectedColorId(parseInt(colorId));
        }

        const markId = searchParams.get("mark");
        if (markId) {
            setSelectedCarMarkId(parseInt(markId));
        }

        const modelId = searchParams.get("model");
        if (modelId) {
            setSelectedCarModelId(parseInt(modelId));
        }

        const vinFromRoute = searchParams.get("vin");
        if (modelId) {
            setVin(vinFromRoute!);
        }

    }, [searchParams])

    useEffect(() => {
        fillFormByQueryParams();
    }, [searchParams, fillFormByQueryParams]);


    return (
        <Card className={`${styles.formContainer}`}>
            <span className={styles.formLabel}>Поиск по каталогу</span>
            <label>Производитель</label>
            <select className={styles.formInput} value={selectedCarMarkId} onChange={onChangeSelectedCarMarkId} >
                <option value={-1}>Выбрать производителя</option>
                {carMarks.length > 0 && carMarks.map(mark => <option key={mark.carMarkId} value={mark.carMarkId}>{mark.name}</option>)}
            </select>
            <label>Модель</label>
            <select className={styles.formInput} value={selectedCarModelId} onChange={onChangeSelectedCarModelId} >
                <option value={-1}>Выбрать модель</option>
                {carModels.length > 0 && carModels.map(model => <option key={model.carModelId} value={model.carModelId}>{model.name}</option>)}
            </select>
            <label>Цвет авто</label>
            <select className={styles.formInput} value={selectedColorId} onChange={onChangeSelectedCarColorId} >
                <option value={-1}>Выбрать цвет</option>
                {carColors.length > 0 && carColors.map(color => <option key={color.carColorId} value={color.carColorId}>{color.name}</option>)}
            </select>
            <label>VIN</label>
            <input className={styles.formInput} value={vin ?? ''} onChange={onChangeVin}></input>
            <button className="primaryButton" onClick={applyFilter}>Применить фильтр</button>
        </Card>
    );
}