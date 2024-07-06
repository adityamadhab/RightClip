import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import BusNotiMain from "../../components/Business-Components/Notification/BusNotiMain";
import { useEffect } from "react";

export function AdNotifications() {
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
                <BusNotiMain />
            </div>
        </div>
    )
}