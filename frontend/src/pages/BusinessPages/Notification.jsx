import BusNotiMain from "../../components/Business-Components/Notification/BusNotiMain";
import BusSidebar from "../../components/Business-Components/Sidebar";

export function Notification() {
    return (
        <div>
            <div className="flex">
                <BusSidebar />
                <BusNotiMain />
            </div>
        </div>
    )
}