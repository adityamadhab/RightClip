import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BusSidebar from "../../components/Business-Components/Sidebar";
import CompletedAssMain from "../../components/Business-Components/Dashboard/Completed/CompletedAssMain";

export function CompletedAssigmnets() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex">
                <BusSidebar/>
                <CompletedAssMain />
            </div>
        </div>
    )
}