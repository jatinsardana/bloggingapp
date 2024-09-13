// import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Clock, Circle as CircleIcon } from 'lucide-react';

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <motion.div 
                className="p-4 border-b border-slate-200 pb-4 w-full max-w-screen-md cursor-pointer hover:bg-slate-50 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className="flex items-center mb-2">
                    <Avatar name={authorName} />
                    <div className="font-light text-sm ml-2 text-gray-600">{authorName}</div>
                    <CircleIcon className="w-1 h-1 mx-2 text-slate-400" />
                    <div className="font-light text-sm text-slate-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {publishedDate}
                    </div>
                </div>
                <motion.h2 
                    className="text-xl font-semibold mb-2 text-gray-800"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 500 }}
                >
                    {title}
                </motion.h2>
                <p className="text-md font-light text-gray-600 mb-3">
                    {content.slice(0, 100) + "..."}
                </p>
                <div className="text-slate-500 text-sm font-light flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {`${Math.ceil(content.length / 100)} minute read`}
                </div>
            </motion.div>
        </Link>
    );
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    const sizeClasses = size === "small" ? "w-6 h-6 text-xs" : "w-10 h-10 text-base";
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-indigo-100 rounded-full ${sizeClasses}`}>
            <span className="font-medium text-indigo-600">
                {name[0].toUpperCase()}
            </span>
        </div>
    );
}

export default BlogCard;