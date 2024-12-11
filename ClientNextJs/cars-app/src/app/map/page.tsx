export const dynamic = "force-dynamic";
import UserLocationInfo from "@/components/pagesContent/map/UserLocation";

export default async function Map() {
    return (
        <div className="content-container context-row">
            <div>
                <h1>Карта</h1>
                <UserLocationInfo />
            </div>
        </div>
    );
}