import BushDashMain from "../../components/Business-Components/Dashboard/BusDashMain";
import BusSidebar from "../../components/Business-Components/Sidebar";

export function BusDashborad() {
    return (
        <div className="flex h-screen">
            <BusSidebar/>
            <BushDashMain/>
        </div>
    )
}