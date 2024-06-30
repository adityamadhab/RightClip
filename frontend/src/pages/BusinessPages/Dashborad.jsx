import { useEffect, useState } from "react";
import BushDashMain from "../../components/Business-Components/Dashboard/BusDashMain";
import BusSidebar from "../../components/Business-Components/Sidebar";
import axios from 'axios';

export function BusDashborad() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/business/user', {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setUsername(response.data.firstname);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUser();
    },[]);

    return (
        <div>
            <div className="flex">
                <BusSidebar />
                <BushDashMain username={username}/>
            </div>
        </div>
    )
}