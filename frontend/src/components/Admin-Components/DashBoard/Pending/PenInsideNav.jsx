export default function PenInsideNav() {
    return (
        <div className="flex justify-between p-4">
            <h2>Pending Approvals</h2>
            <div className="flex gap-2">
                <button className="bg-[#E3F3FD] rounded-l-xl p-2 text-sm">Client</button>
                <button className="bg-[#E3F3FD] rounded-r-xl p-2 text-sm">Creator</button>
            </div>
            <div>
            </div>
        </div>
    )
}