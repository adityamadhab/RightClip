import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import AdDashMain from "../../components/Admin-Components/DashBoard/AdDashMain";
import { useEffect } from "react";

export function AdminDashborad() {
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
                <AdDashMain/>
            </div>
        </div>
    )
}