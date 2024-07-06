import { useEffect } from "react";
import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import CVMain from "../../components/Admin-Components/Creator/CVMain";
import { useNavigate } from "react-router-dom";

export function AdCreCV() {
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
                <CVMain />
            </div>
        </div>
    )
}