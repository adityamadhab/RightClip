import BushDashMain from "../../components/Business-Components/Dashboard/BusDashMain";
import BusSidebar from "../../components/Business-Components/Sidebar";

export function BusDashborad() {
    return (
        <div>
            <div className="flex">
                <BusSidebar />
                <BushDashMain />
            </div>
        </div>
    )
}