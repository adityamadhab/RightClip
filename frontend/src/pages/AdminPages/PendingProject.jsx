import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import PendingMain from "../../components/Admin-Components/DashBoard/Pending/PendingMain";

export function PendingProject() {
    return (
        <div>
            <div className="flex">
                <AdminSidebar />
                <PendingMain />
            </div>
        </div>
    )
}