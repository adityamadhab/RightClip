import CreDashCount from "../Dashboard/CreDashCount";
import CreAssInsideNav from "./AssInsideNav";
import CreAssNav from "./CreAssNav";
import WorkingActivity from "./WorkingActivity";

export default function CreAssMain() {
    return (
        <div>
            <div className=" bg-white w-full p-4">
                <CreAssNav />
                <CreDashCount />
                <CreAssInsideNav/>
                <WorkingActivity/>
            </div>
        </div>
    )
}