import BusNotiNav from "./BusInboxNav";
import ChatList from "./ChatList";
import { ChatWindow } from "./ChatWindow";

export default function BusInboxMain() {
    return (
        <div className="min-h-screen">
            <div className="bg-white w-full p-4 flex-grow">
                <BusNotiNav />
                <div className="flex flex-grow gap-2">
                    <ChatList/>
                    <ChatWindow/>
                </div>
            </div>
        </div>
    )
}