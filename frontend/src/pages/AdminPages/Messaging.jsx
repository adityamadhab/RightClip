import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import BusInboxMain from "../../components/Business-Components/Inbox/BusInboxMain";

export function Messaging() {
    return (
        <div>
            <div className="flex">
                <AdminSidebar />
                <BusInboxMain/>
            </div>
        </div>
    )
}