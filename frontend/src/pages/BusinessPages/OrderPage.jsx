import OrderMain from "../../components/Business-Components/Order/OrderMain";
import BusSidebar from "../../components/Business-Components/Sidebar";

export function OrderPage() {
    return (
        <div>
            <div className="flex h-screen">
                <BusSidebar />
                <OrderMain/>
            </div>
        </div>
    )
}