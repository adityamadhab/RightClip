import BusNotiNav from "./BusInboxNav";
import ChatList from "./ChatList";

export default function BusInboxMain() {
    return (
        <div className="min-h-screen">
            <div className="bg-white w-full p-4 flex-grow">
                <BusNotiNav />
                <div className="flex flex-grow gap-2">
                    <ChatList/>
                    <div className="flex justify-center items-center mx-auto">
                        <h2 className="text-2xl">Select a creator to start conversation</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}