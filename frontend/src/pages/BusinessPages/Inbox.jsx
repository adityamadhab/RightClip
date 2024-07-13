import BusInboxMain from "../../components/Business-Components/Inbox/BusInboxMain";
import BusSidebar from "../../components/Business-Components/Sidebar";

export function Inbox() {
    return (
        <div>
            <div className="flex">
                <BusSidebar />
                <BusInboxMain/>
            </div>
        </div>
    ) 
}