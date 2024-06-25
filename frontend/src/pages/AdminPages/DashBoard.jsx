import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import AdDashMain from "../../components/Admin-Components/DashBoard/AdDashMain";

export function AdminDashborad() {
    return (
        <div>
            <div className="flex">
                <AdminSidebar />
                <AdDashMain/>
            </div>
        </div>
    )
}