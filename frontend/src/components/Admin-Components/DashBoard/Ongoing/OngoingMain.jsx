import AdDashNav from "../AdDashNav";

export default function OngoingMain({ text }) {
    return (
        <div>
            <div className=" bg-white w-full p-4">
                <AdDashNav />
                {text} Projects
            </div>
        </div>
    )
}