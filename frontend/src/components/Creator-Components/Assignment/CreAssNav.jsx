import { Link } from "react-router-dom";

export default function CreAssNav() {
    return (
        <div className="border-b-2 border-[#E7CBA3] bg-white w-full sm:w-[1200px] mb-6">
            <div className="bg-white mb-3 flex justify-between items-center">
                <Link to={'/dashboard'} className="header--title cursor-pointer flex gap-4">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1">
                        <path d="M22.7502 16.3334V13.9167C22.7502 12.0311 22.7502 11.0883 22.1644 10.5025C21.5786 9.91669 20.6358 9.91669 18.7502 9.91669H16.2403C15.4228 9.91669 15.0141 9.91669 14.6466 9.76445C14.279 9.61221 13.99 9.32317 13.4119 8.74511L12.2551 7.58826C11.677 7.0102 11.388 6.72117 11.0204 6.56893C10.6529 6.41669 10.2441 6.41669 9.42664 6.41669H8.0835C6.19788 6.41669 5.25507 6.41669 4.66928 7.00247C4.0835 7.58826 4.0835 8.53107 4.0835 10.4167V17.5834C4.0835 19.469 4.0835 20.4118 4.66928 20.9976C5.25507 21.5834 6.19788 21.5834 8.0835 21.5834H17.5002" stroke="#222222" />
                        <path d="M19.8335 21.5834H22.7502M22.7502 21.5834H25.6668M22.7502 21.5834V24.5M22.7502 21.5834V18.6667" stroke="#222222" />
                    </svg>
                    <h2 className="text-lg font-extrabold text-black hidden sm:block">Assignment</h2>
                    <h2 className="text-sm font-bold text-black sm:hidden mt-1">Assignment</h2>
                </Link>
            </div>
        </div>
    )
}