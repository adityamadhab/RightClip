import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BusSidebar from "../../components/Business-Components/Sidebar";
import ActiveMain from "../../components/Business-Components/Dashboard/Active/ActiveMain";

export function ActiveAssigmnets() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex">
                <BusSidebar/>
                <ActiveMain />
            </div>
        </div>
    )
}