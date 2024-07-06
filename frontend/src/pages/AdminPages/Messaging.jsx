import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import BusInboxMain from "../../components/Business-Components/Inbox/BusInboxMain";
import { useEffect } from "react";

export function Messaging() {
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
                <BusInboxMain/>
            </div>
        </div>
    )
}