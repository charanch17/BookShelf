import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { searchAutoComplete } from "../../store/features/ExploreBooks/ExploreBooksReducers";
import { ExploreBooksactions } from "../../store/features/ExploreBooks/ExploreBooksSlice";

const Search = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const suggestions = useSelector((state)=>{return state.currentBooks.searchAutoComplete})
  useEffect(() => {
    var id = setTimeout(() => {
      if (searchInput.length>0) {
        dispatch(searchAutoComplete({searchText:searchInput}));
      }
      else{
        dispatch(ExploreBooksactions.resetSuggestions())
      }
    }, 250);
    return () => {
      clearTimeout(id);
    };
  }, [searchInput, dispatch]);
  return (
    <div className={`${styles.container} ${props.className}`}>
      <input
        className={`${styles.input} ${suggestions.length>0?styles.activeautocomplete:""}`}
        value={searchInput}
        onChange={(e) => {
          if(e.target.value.length === 0){
            dispatch(ExploreBooksactions.resetSuggestions())
          }
          setSearchInput(e.target.value);
        
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchInput.length) {
            props.setSearchInput(searchInput);
            setSearchInput("");
          }
        }}
        list="suggestions"
      />
      <MagnifyingGlassIcon className={styles.icon} />
      {/* <span className={styles.button}>Search</span> */}
    </div>
  );
};
export default Search;
