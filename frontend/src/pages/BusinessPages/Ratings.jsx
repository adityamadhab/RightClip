import BushRatMain from "../../components/Business-Components/Ratings-Components/BusRatMain";
import BusSidebar from "../../components/Business-Components/Sidebar";

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