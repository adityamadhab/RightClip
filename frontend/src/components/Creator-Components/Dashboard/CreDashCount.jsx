export default function CreDashCount() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#8FD8CF] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Ongoing Assignment</div>
                <div className="text-2xl font-bold">0</div>
            </div>
            <div className="bg-[#FFA4A5] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Completed Assignment</div>
                <div className="text-2xl font-bold">0</div>
            </div>
            <div className="bg-[#FFC098] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Total earnings</div>
                <div className="text-2xl font-bold">0 pts</div>
            </div>
            <div className="bg-[#E7CBA3] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Total quality Soon</div>
                <div className="text-2xl font-bold">0 Ser</div>
            </div>
        </div>
    );
}
