import BusRewMain from "../../components/Business-Components/Rewards/BusRewMain";
import BusSidebar from "../../components/Business-Components/Sidebar";

export function Rewards() {
    return (
        <div>
            <div className="flex">
                <BusSidebar />
                <BusRewMain/>
            </div>
        </div>
    )
}