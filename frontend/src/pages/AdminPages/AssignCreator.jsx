import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import AssignMain from "../../components/Admin-Components/Creator/AssignMain";

export function AssignCreator() {
    return (
        <div>
            <div className="flex">
                <AdminSidebar />
                <AssignMain />
            </div>
        </div>
    )
}