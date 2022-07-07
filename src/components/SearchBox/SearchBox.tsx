import React from "react";
import "./SearchBox.css";

interface SearchboxProps {
	onInputChange: (inputValue: string) => void;
}

const SearchBox = ({ onInputChange }: SearchboxProps) => {
	return (
		<input
			className="search"
			type="search"
			placeholder="Search Pokemons"
			onChange={(e) => {
				// console.log(e.target.value);
				onInputChange(e.target.value);
			}}
		></input>
	);
};

export default SearchBox;
