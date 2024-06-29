import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import OngoingMain from "../../components/Admin-Components/DashBoard/Ongoing/OngoingMain";

export function CompletedProject() {
    return (
        <div>
            <div className="flex">
                <AdminSidebar />
                <OngoingMain text={"Completed"} />
            </div>
        </div>
    )
}