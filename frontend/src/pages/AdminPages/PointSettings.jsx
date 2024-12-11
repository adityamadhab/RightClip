import AdminSidebar from "../../components/Admin-Components/AdminSidebar";
import PointSettingsMain from "../../components/Admin-Components/PointSettings/PointSettingsMain";

export function PointSettings() {
    return (
        <div>
            <div className="flex">
                <AdminSidebar />
                <PointSettingsMain />
            </div>
        </div>
    );
} 