import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import { useEffect } from "react";
import AdCreatorPaymentsMain from "../../components/Admin-Components/Payments/CreatorPayments/CreatorPaymentsMain";

export function CreatorPayments() {
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
                <AdCreatorPaymentsMain />
            </div>
        </div>
    )
}