import CreSidebar from "../../components/Creator-Components/CreSidebar";
import CreDashMain from "../../components/Creator-Components/Dashboard/CreDashMain";

export function CreDashborad() {
    return (
        <div>
            <div className="flex">
                <CreSidebar />
                <CreDashMain/>
            </div>
        </div>
    )
}