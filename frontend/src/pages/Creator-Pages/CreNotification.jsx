import CreNotiMain from "../../components/Creator-Components/Notification/CreNotiMain";
import CreSidebar from '../../components/Creator-Components/CreSidebar';


export function CreNotification() {
    return (
        <div>
            <div className="flex">
                <CreSidebar />
                <CreNotiMain />
            </div>
        </div>
    )
}