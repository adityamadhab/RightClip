import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import OngoingMain from "../../components/Admin-Components/DashBoard/Ongoing/OngoingMain";

export function OngoingProject() {
    return (
        <div>
            <div className="flex">
                <AdminSidebar />
                <OngoingMain text={"Ongoing"} />
            </div>
        </div>
    )
}