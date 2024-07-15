import BusNotiNav from "./BusInboxNav";
import ChatList from "./ChatList";

export default function BusInboxMain() {
    return (
        <div className="min-h-screen w-full overflow-x-hidden">
            <div className="bg-white w-full p-4 flex-grow">
                <BusNotiNav />
                <div className="flex flex-col sm:flex-row flex-grow gap-2 mt-8">
                    <ChatList />
                    <div className="hidden sm:flex justify-center items-center mx-auto">
                        <h2 className="text-2xl">Select a creator to start conversation</h2>
                    </div>
                </div>
            </div>
        </div>

    )
}