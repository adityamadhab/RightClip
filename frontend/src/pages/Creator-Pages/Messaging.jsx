import CreSidebar from "../../components/Creator-Components/CreSidebar";
import CreMessageMain from "../../components/Creator-Components/Message/CreMessageMain";

export function MessagingPage() {
    return (
        <div>
            <div className="flex">
                <CreSidebar />
                <CreMessageMain/>
            </div>
        </div>
    ) 
}