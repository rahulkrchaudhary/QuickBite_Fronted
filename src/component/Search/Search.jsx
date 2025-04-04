import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { PopularCuisines } from "./PopularCuisines";
import SearchDishCard from "./SearchDishCard";
import { useDispatch, useSelector } from "react-redux";
import { TopMeals } from "../Data/TopMeals";
import { searchMenuItem } from "../State/Menu/Action";
import { searchRestaurant } from "../State/Restaurant/Action";
import { Button } from "@mui/material";
import { SearchRestaurantCard } from "./SearchRestaurantCard";
import { RestaurantCard } from "../Restaurant/RestaurantCard";

const Search = () => {

  const dispatch = useDispatch();
  const { menu,auth, restaurant } = useSelector((store) => store);
  const jwt=localStorage.getItem("jwt")

  const [selected, setSelected] = useState("food");

  const handleSearchMenu = (keyword) => {
    if(selected==="food"){
        dispatch(searchMenuItem({
            keyword,
            jwt:auth.jwt || jwt 
        }));
    }else if(selected==="restaurant" && keyword){
        dispatch(searchRestaurant({keyword, jwt: jwt}))
    }
  };
  
  
  return (
    <div className="px-5 lg:px-[18vw]">
        <div className="flex flex-wrap items-center justify-center mt-5 gap-2 md:gap-4 w-full">
            <h1 className="text-lg md:text-xl">Search by:</h1>
            <button 
                className={`px-4 py-2 text-sm md:text-base rounded-lg transition-colors duration-300 ${
                    selected === "food" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`} 
                onClick={() => setSelected("food")}
            >
                Food
            </button>
            <button 
                className={`px-4 py-2 text-sm md:text-base rounded-lg transition-colors duration-300 ${
                    selected === "restaurant" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`} 
                onClick={() => setSelected("restaurant")}
            >
                Restaurant
            </button>
        </div>
      <div className="relative py-5">
        <SearchIcon className="absolute top-[2rem] left-2" />
        <input
          onChange={(e) => handleSearchMenu(e.target.value)}
          className="p-2 py-3 pl-12 w-full bg-[#242B2E] rounded-sm outline-none"
          type="text"
          placeholder="search food..."
        />
      </div>
      <div>
        <h1 className="py-5 text-2xl font-semibold">Popular Cuisines</h1>
        <div className="flex flex-wrap ">
          {TopMeals.slice(0, 9).map((item) => (
            <PopularCuisines image={item.image} title={item.title} />
          ))}
        </div>
      </div>
      <div className=" mt-7">
            {selected === "food" ? (
                menu.search.map((item) => (
                    <SearchDishCard item={item} />
                ))
            ) : (
                <div className='flex flex-wrap items-center justify-around gap-5'>
                {restaurant.search.map((item) => (
                    <SearchRestaurantCard  item={item} />
                    // <RestaurantCard item={item}/>
                ))}
                </div>
            )}
      </div>
    </div>
  );
};

export default Search;
