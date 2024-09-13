// import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from 'lucide-react';
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
// import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            <main className="container mx-auto px-4 py-8">
                <motion.h1 
                    className="text-3xl font-bold text-gray-800 mb-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Latest Blog Posts
                </motion.h1>
                
                <AnimatePresence>
                    {loading ? (
                        <motion.div
                            className="flex flex-col items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Loader className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                            <p className="text-gray-600">Loading blog posts...</p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {blogs.slice().reverse().map((blog, index) => (
                                <motion.div
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <BlogCard
                                        id={blog.id}
                                        authorName={blog.author.name || "Anonymous"}
                                        title={blog.title}
                                        content={blog.content}
                                        publishedDate="Today"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Blogs;