import React, { useState } from "react";
import { MoviesCard } from "./MoviesCard";
import { FilterBar } from "./FilterBar";
import { Header } from "./Header";

export const Homepage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(4)
    const [isFiltered, setIsFiltered] = useState(false)
    const [emptyFilter, setEmptyFilter] = useState(false)

    return (
        <div>
            <Header/>
            <FilterBar 
                emptyFilter={emptyFilter}
                setEmptyFilter={setEmptyFilter}
                isFiltered={isFiltered} 
                setIsFiltered={setIsFiltered} 
                setItemPerPage={setItemPerPage}
                />
            <MoviesCard 
                emptyFilter={emptyFilter}
                isFiltered={isFiltered} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                itemPerPage={itemPerPage}
                />
        </div>
    )
}