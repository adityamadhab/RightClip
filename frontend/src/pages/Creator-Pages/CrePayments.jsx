import CreatorPaymentsMain from "../../components/Creator-Components/CreatorPayments/CreatorPaymentsMain";
import CreSidebar from "../../components/Creator-Components/CreSidebar";

export function CrePaymentsPage() {
    return (
        <div>
            <div className="flex">
                <CreSidebar />
                <CreatorPaymentsMain />
            </div>
        </div>
    )
}