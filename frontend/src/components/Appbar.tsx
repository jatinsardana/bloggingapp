import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
    return (
        <div className="relative border-b bg-white shadow-md flex justify-between items-center px-8 py-3">
            {/* Branding */}
            <Link to={'/blogs'} className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition duration-300 cursor-pointer">
                Medium
            </Link>

            {/* Actions */}
            <div className="flex items-center">
                {/* Publish Button */}
                <Link to={`/publish`}>
                    <button 
                        type="button" 
                        className="mr-4 text-white bg-gradient-to-r from-green-400 to-green-600 hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-green-300 font-semibold rounded-full text-sm px-6 py-2 transition duration-300 shadow-lg"
                    >
                        New Post
                    </button>
                </Link>

                {/* Avatar */}
                <Avatar size={"big"} name="jatin" />
            </div>
        </div>
    );
};
