import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import PenReqMain from "../../components/Admin-Components/Creator/PenReqMain";

export function PendingRequest() {
    return (
        <div>
            <div className="flex">
                <AdminSidebar />
                <PenReqMain />
            </div>
        </div>
    )
}