import CreAssMain from "../../components/Creator-Components/Assignment/CreAssMain";
import CreSidebar from "../../components/Creator-Components/CreSidebar";

export function CreAssigment() {
    return (
        <div>
            <div className="flex">
                <CreSidebar />
                <CreAssMain/>
            </div>
        </div>
    )
}