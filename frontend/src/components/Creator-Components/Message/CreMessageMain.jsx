import CreMessageNav from "./CreMessageNav";
import MessageList from "./MessageList";

export default function CreMessageMain() {
    return (
        <div className="min-h-screen">
            <div className="bg-white w-full p-4 flex-grow">
                <CreMessageNav />
                <div className="flex flex-grow gap-2 mt-4">
                    <MessageList/>
                    <div className="flex justify-center items-center mx-auto">
                        <h2 className="text-2xl">Select a creator to start conversation</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}