import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import { useEffect } from "react";
import CompletedMain from "../../components/Admin-Components/DashBoard/Completed/CompletedMain";

export function CompletedProject() {
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
                <CompletedMain/>
            </div>
        </div>
    )
}