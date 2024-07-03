import ProjectDetailsForm from "../../components/Business-Components/CreateProject/BusProjectMain";
import BusSidebar from "../../components/Business-Components/Sidebar";

export function BusProject() {
    return (
        <div className="flex min-h-screen">
            <BusSidebar />
            <div className="flex-1 flex justify-start bg-white">
                <ProjectDetailsForm />
            </div>
        </div>
    );
}
