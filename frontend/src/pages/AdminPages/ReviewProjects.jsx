import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import PendingMain from "../../components/Admin-Components/DashBoard/Pending/PendingMain";
import { useEffect } from "react";
import ReviewMain from "../../components/Admin-Components/DashBoard/Review/ReviewMain";

export function ReviewProjects() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('AdminToken');
        if (!token) {
            navigate('/');
        }
    }, []);

    return (
        <div>
            <div className="flex">
                <AdminSidebar />
                <ReviewMain />
            </div>
        </div>
    )
}