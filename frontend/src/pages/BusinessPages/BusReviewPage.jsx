import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BusSidebar from "../../components/Business-Components/Sidebar";
import BusReviewMain from "../../components/Business-Components/Dashboard/Reviews/BusReview";

export function BusReviewPage() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex">
                <BusSidebar/>
                <BusReviewMain />
            </div>
        </div>
    )
}