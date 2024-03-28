import React, { useState } from "react";
import { useContext } from 'react';
import { SearchContext } from './SearchContext';
import Videos from './Videos';

function Home() {
  const { search } = useContext(SearchContext);
  const categories = ["All", "Gaming", "Music", "Tech"];
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="Home h-screen w-screen pl-[15vw] pt-[10vh] bg-primary flex flex-col mt-5 space-y-8">
      <div className="categories flex w-screen h-[4vh]">
        {categories.map((category, index) => (
          <div
            key={index}
            className="px-3 mx-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
            onClick={() => setSelectedCategory(category.toLowerCase())}
          >
            {category}
          </div>
        ))}
      </div>
      <Videos category={selectedCategory} search={search} />
    </div>
  );
}

export default Home;
