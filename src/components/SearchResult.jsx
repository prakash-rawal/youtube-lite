import React,{useState, useEffect, useContext} from 'react'

import {useParams} from "react-router-dom"
import { fetchDataFromApi } from '../utils/api'
import {Context} from "../context/contextApi"
import LeftNav from './LeftNav'
import SearchResultVideoCard from "./SearchResultVideoCard"



const SearchResult = () => {
  const [result , setResult ] = useState();
  const {searchQuery} = useParams();
  const {setLoading } = useContext(Context);

  const generateKey = (item, index) => {
    // Use videoId with index to ensure uniqueness
    return `${item?.video?.videoId}-${index}`;
};

const fetchSearchResult =()=>{
  setLoading(true)
  fetchDataFromApi(`search/?q=${searchQuery}`).then((res)=>{
    console.log(res);
    setResult(res?.contents)
    setLoading(false)
  })
}

  useEffect(()=>{
    document.getElementById("root").classList.remove("custom-h")
    fetchSearchResult();
  },[searchQuery, fetchSearchResult])

 


  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
                <div className="grid grid-cols-1 gap-2 p-5">
                    {result?.map((item, index) => {
                        if (item?.type !== "video") return false;
                        let video = item.video;
                        return (
                            <SearchResultVideoCard
                                key={generateKey(item , index)}
                                video={video}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default SearchResult