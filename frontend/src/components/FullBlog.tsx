// import React from 'react';
import { motion } from 'framer-motion';
// import { Calendar, User, MessageCircle } from 'lucide-react';
import { Calendar, User } from 'lucide-react';
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Appbar />
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-8"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <motion.div 
                        className="lg:col-span-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                            {blog.title}
                        </h1>
                        <div className="flex items-center text-gray-600 mb-6">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span>Posted on 2nd December 2023</span>
                        </div>
                        <motion.div 
                            className="prose prose-lg max-w-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            {blog.content}
                        </motion.div>
                    </motion.div>
                    
                    <motion.div 
                        className="lg:col-span-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                <User className="inline-block w-5 h-5 mr-2" />
                                Author
                            </h2>
                            <div className="flex items-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {blog.author.name || "Anonymous"}
                                    </h3>
                                    <p className="text-gray-600 mt-1">
                                        Captivating minds with words that inspire and stories that resonate.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

const Avatar = ({ name, size = "small" }: { name: string; size?: "small" | "big" }) => {
    const sizeClasses = size === "small" ? "w-10 h-10 text-lg" : "w-16 h-16 text-2xl";
    return (
        <div className={`${sizeClasses} bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold`}>
            {name[0].toUpperCase()}
        </div>
    );
};

export default FullBlog;