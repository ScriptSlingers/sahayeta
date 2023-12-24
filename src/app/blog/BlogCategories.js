import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TabSelectorBlog() {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState();
    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`)
            .then((res) => {
                setBlogs(res.data);
                const uniqueCategories = [...new Set(res.data.map((item) => item.category))];
                setCategories(uniqueCategories);


                setActiveCategory(uniqueCategories[0]);
            })
            .catch((error) => {
                console.error("Error fetching blogs:", error);
            })

    }, []);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    return (
        <div className="flex flex-col gap-3">

            <div className="flex gap-6">
                {categories.map((item) => (
                    <div
                        key={item}
                        className={`text-lg font-poppins font-semibold cursor-pointer ${activeCategory === item ? 'text-[#2540C4]' : ''}`}
                        onClick={() => handleCategoryClick(item)}
                    >
                        {item}
                    </div>
                ))}
            </div>

        </div>
    );
}
