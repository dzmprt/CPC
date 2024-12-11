'use client'

import { useState } from "react";


export default function UserLocationInfo() {

    const [geolocationCoordinates, setGeolocationCoordinates] = useState<GeolocationCoordinates | null>(null);
    const isAvailableGeolocation = "geolocation" in navigator;

    if (isAvailableGeolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setGeolocationCoordinates(position.coords)
        });
    }

    return (
        <div>
            {(!isAvailableGeolocation || geolocationCoordinates == null) && <h2>Геолокация недоступна</h2>}
            {isAvailableGeolocation && geolocationCoordinates != null &&
                <>
                    <h2>Широта: {geolocationCoordinates.latitude}<br />Долгота: {geolocationCoordinates.longitude}</h2>
                    <a href={`https://yandex.ru/maps/?pt=${geolocationCoordinates.longitude},${geolocationCoordinates.latitude}&z=12&l=map`}>Ссылка в Яндекс картах</a>
                </>

            }

        </div>
    );
}