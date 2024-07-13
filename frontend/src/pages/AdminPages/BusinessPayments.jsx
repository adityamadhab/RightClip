import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import { useEffect } from "react";
import AdBusinessPaymentsMain from "../../components/Admin-Components/Payments/BusinessPayments/BusinessPaymentsMain";

export function BusinessPayments() {
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
                <AdBusinessPaymentsMain />
            </div>
        </div>
    )
}