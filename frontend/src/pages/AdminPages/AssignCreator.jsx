import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import AssignMain from "../../components/Admin-Components/Creator/AssignMain";
import { useEffect } from "react";

export function AssignCreator() {
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
                <AssignMain />
            </div>
        </div>
    )
}