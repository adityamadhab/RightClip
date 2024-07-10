import { useNavigate } from "react-router-dom";
import BusSidebar from "../../components/Business-Components/Sidebar";
import PendingAssMain from "../../components/Business-Components/Dashboard/Pending/PendingMain";

export function PendingAssigmnets() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex">
                <BusSidebar/>
                <PendingAssMain />
            </div>
        </div>
    )
}