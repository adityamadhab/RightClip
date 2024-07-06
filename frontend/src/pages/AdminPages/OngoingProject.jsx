import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import OngoingMain from "../../components/Admin-Components/DashBoard/Ongoing/OngoingMain";
import { useEffect } from "react";

export function OngoingProject() {
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
                <OngoingMain />
            </div>
        </div>
    )
}