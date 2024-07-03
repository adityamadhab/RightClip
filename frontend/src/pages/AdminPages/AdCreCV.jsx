import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import CVMain from "../../components/Admin-Components/Creator/CVMain";
import PenReqMain from "../../components/Admin-Components/Creator/PenReqMain";

export function AdCreCV() {
    return (
        <div>
            <div className="flex">
                <AdminSidebar />
                <CVMain />
            </div>
        </div>
    )
}