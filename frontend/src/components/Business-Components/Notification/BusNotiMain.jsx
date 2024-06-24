import { BusFooter } from "../BusFooter";
import BusNotiNav from "./BusNotiNav";

const NotificationItem = ({ time, message }) => (
    <div className="h-[60px] w-[1100px] bg-[#FFEADD] rounded-xl flex justify-between">
        <div className="flex gap-4 justify-center items-center ml-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="16" fill="white" />
            </svg>
            <p className="text-sm">{message}</p>
        </div>
        <div className="flex gap-8 justify-center items-center mr-4">
            <p className="text-sm">{time}</p>
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="20" rx="7" fill="white" />
            </svg>
        </div>
    </div>
);

export default function BusNotiMain() {
    const notifications = [
        { time: "00:00", message: "Lorem ipsum dolor sit amet." },
        { time: "00:00", message: "Lorem ipsum dolor sit amet." },
        { time: "00:00", message: "Lorem ipsum dolor sit amet." },
        { time: "00:00", message: "Lorem ipsum dolor sit amet." },
        { time: "00:00", message: "Lorem ipsum dolor sit amet." },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-white w-full p-4 flex-grow">
                <BusNotiNav />
                <div className="p-10 flex flex-col gap-6">
                    {notifications.map((noti, index) => (
                        <NotificationItem key={index} time={noti.time} message={noti.message} />
                    ))}
                </div>
            </div>
            <BusFooter />
        </div>
    );
}
