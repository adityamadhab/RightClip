import PaymentsMain from "../../components/Business-Components/Payments/PaymentsMain";
import BusSidebar from "../../components/Business-Components/Sidebar";

export function BusPayments() {
    return (
        <div>
            <div className="flex">
                <BusSidebar />
                <PaymentsMain />
            </div>
        </div>
    )
}