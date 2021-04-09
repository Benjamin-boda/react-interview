import React, { useEffect, useState } from "react";
import Select from 'react-select'
import { useSelector, useDispatch } from "react-redux";
import { sortByCategory } from "../actions/filters";

export const FilterBar = ({emptyFilter, setEmptyFilter, setItemPerPage, isFiltered, setIsFiltered }) => {
    
    const moviesInStore = useSelector(state => state.movies)
    const dispatch = useDispatch()

    const removeDuplicatesCategory = (duplicates) => {
        const flag = {};
        const unique = [];
        duplicates.forEach(element => {
            if (!flag[element.category]) {
                flag[element.category] = true;
                unique.push(element);
            }
        });

        return unique
    }

    const uniqueCategory = removeDuplicatesCategory(moviesInStore)

    const options = uniqueCategory.map((value) => ({value: value.category, label: value.category}))

    useEffect(() => {
        const initialFilter = options.map((element) => element.value).join("")
        
        dispatch(sortByCategory(initialFilter))
    }, [emptyFilter])

    const onChange = (e) => {
        setIsFiltered(!isFiltered)

        const filteredCategory = e.map((category) => category.value).join("")


        dispatch(sortByCategory(filteredCategory))

        if (filteredCategory === "") {
            setEmptyFilter(!emptyFilter)
        }
    }

    const onChangeSelect = (e) => {
        setItemPerPage(e.target.value)
    }
    
    return (
        <div className="filterbar__container">
            <Select
                className="filterbar_multiselect"
                onChange={onChange}
                isMulti 
                options={options} 
                />

            <div className="filterbar__item">
                <p className="filterbar__item__text">Items per page : </p>

                <select className="filterbar__item__select" name="items" onChange={onChangeSelect}>
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                </select>
            </div>
            
            
        </div>
    )
}