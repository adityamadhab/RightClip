import BusSidebar from "../../components/Business-Components/Sidebar";
import BushTemMain from "../../components/Business-Components/Templat/BusTemMain";

export function BusTemplates() {
    return (
        <div>
            <div className="flex">
                <BusSidebar />
                <BushTemMain />
            </div>
        </div>
    )
}