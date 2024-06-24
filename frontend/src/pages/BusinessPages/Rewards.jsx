import BusSidebar from "../../components/Business-Components/Sidebar";
import BushRatMain from "../../components/Ratings-Components/BusRatMain";

export function Ratings() {
    return (
        <div>
            <div className="flex">
                <BusSidebar />
                <BushRatMain />
            </div>
        </div>
    )
}