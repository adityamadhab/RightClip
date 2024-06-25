export default function AdDashCount() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#8FD8CF] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Ongoing Projects</div>
                <div className="text-2xl font-bold">0</div>
            </div>
            <div className="bg-[#FFA4A5] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Completed Pieces</div>
                <div className="text-2xl font-bold">0</div>
            </div>
            <div className="bg-[#FFC098] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Pending Approvals(Creators & Clients)</div>
                <div className="text-2xl font-bold">0</div>
            </div>
        </div>
    );
}