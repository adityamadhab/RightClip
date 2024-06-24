export default function BusDashDetails() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-[#FFEADD] rounded-xl">
            {[
                { title: 'Pending Assignments', assignments: ['Assignment 1', 'Assignment 2', 'Assignment 3'] },
                { title: 'Arriving Soon', assignments: ['Assignment 4', 'Assignment 5', 'Assignment 6'] },
                { title: 'Rework', assignments: ['Assignment 7', 'Assignment 8', 'Assignment 9'] },
            ].map((section, index) => (
                <div key={index} className="bg-secondary p-6 rounded-lg">
                    <div className="text-md border border-gray-300 bg-white rounded-xl text-center h-[40px] flex items-center justify-center mb-4">
                        {section.title}
                    </div>
                    <ul>
                        {section.assignments.map((assignment, idx) => (
                            <li key={idx} className="bg-input p-3 rounded-lg mb-2 text-center">
                                {assignment}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
