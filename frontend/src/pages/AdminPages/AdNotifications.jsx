import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import BusNotiMain from "../../components/Business-Components/Notification/BusNotiMain";

export function AdNotifications() {
    return (
        <div>
            <div className="flex">
                <AdminSidebar />
                <BusNotiMain />
            </div>
        </div>
    )
}