import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import { useEffect } from "react";
import OrderSetupMain from "../../components/Admin-Components/OrderSetup/OrderSetupMain";

export function OrderSetup() {
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
                <OrderSetupMain />
            </div>
        </div>
    )
}