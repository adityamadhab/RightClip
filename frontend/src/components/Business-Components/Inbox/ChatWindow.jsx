export function ChatWindow() {
    return (
        <div className="flex flex-col flex-grow bg-[#FFEADD] p-4 rounded-lg h-[600px]">
            <div className="flex-grow">
                <div className="flex flex-col space-y-4">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="self-start bg-white p-2 rounded max-w-md">
                            <p>Message content goes here.</p>
                        </div>
                    ))}
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="self-end bg-teal-500 text-white p-2 rounded max-w-md">
                            <p>Message content goes here.</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center bg-white p-2 rounded mt-4 h-[50px]">
                <button className="p-2 rounded">
                    <svg width="40" height="40" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_851_770)">
                            <rect y="23.7889" width="47.6032" height="47.6032" transform="rotate(-29.9824 0 23.7889)" fill="white" />
                            <path d="M40.8366 23.1276L45.7927 31.7178C47.37 34.4517 47.7966 37.7002 46.9788 40.7487C46.1609 43.7972 44.1656 46.396 41.4317 47.9733C38.6978 49.5506 35.4492 49.9772 32.4007 49.1594C29.3523 48.3416 26.7535 46.3462 25.1762 43.6123L17.2466 29.868C16.195 28.0454 15.9106 25.8797 16.4558 23.8474C17.001 21.815 18.3313 20.0825 20.1539 19.031V19.031C21.9765 17.9795 24.1422 17.695 26.1745 18.2403C28.2068 18.7855 29.9393 20.1157 30.9909 21.9383L38.9205 35.6826C39.4463 36.5939 39.5885 37.6768 39.3159 38.6929C39.0433 39.7091 38.3782 40.5754 37.4668 41.1011C36.5555 41.6269 35.4727 41.7691 34.4565 41.4965C33.4404 41.2239 32.5741 40.5588 32.0484 39.6475L24.1187 25.9032" stroke="black" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_851_770">
                                <rect y="23.7889" width="47.6032" height="47.6032" transform="rotate(-29.9824 0 23.7889)" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                <input type="text" className="flex-grow mx-2 p-2 border rounded" placeholder="Type a message..." />
                <button className="p-2 text-white rounded">
                    <svg width="44" height="44" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M37.5801 40.5419L30.3779 26.1375C29.2686 23.9189 28.7139 22.8096 29.2236 22.2999C29.7333 21.7903 30.8426 22.3449 33.0612 23.4542L65.6588 39.7531C67.2199 40.5336 68.0005 40.9239 68.0005 41.5419C68.0005 42.16 67.2199 42.5502 65.6588 43.3308L33.0612 59.6296C30.8426 60.7389 29.7333 61.2936 29.2236 60.7839C28.7139 60.2743 29.2686 59.1649 30.3779 56.9463L37.5801 42.5419L51.9274 42.5419C52.4797 42.5419 52.9274 42.0942 52.9274 41.5419C52.9274 40.9896 52.4797 40.5419 51.9274 40.5419L37.5801 40.5419Z" fill="#222222" />
                    </svg>
                </button>
            </div>
        </div>
    )
}