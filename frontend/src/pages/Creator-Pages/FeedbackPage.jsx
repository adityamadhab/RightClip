import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreSidebar from "../../components/Creator-Components/CreSidebar";
import CreDashNav from "../../components/Creator-Components/Dashboard/CreDashNav";
import FeedbackView from "../../components/Creator-Components/Assignment/FeedbackView";

export function FeedbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('CreToken');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="flex">
            <CreSidebar />
            <div className="w-full overflow-x-hidden">
                <div className="bg-white w-full p-4">
                    <CreDashNav />
                    <FeedbackView />
                </div>
            </div>
        </div>
    );
} 