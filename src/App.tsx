import React from "react";
import Pokedex from "./components/Pokedex/Pokedex";
import "./App.css";
import { pokemonData } from "./data/pokeData";
import {
	PokemonSchema,
	PokemonSpritesSchema,
	UnpatchedPokemonSchema,
} from "./types/PokemonSchema";

interface AppState {
	searchField: string;
	allPokemons: PokemonSchema[];
	searchedPokemons: PokemonSchema[];
	selectedPokemon: PokemonSchema | undefined;
}

class App extends React.Component<any, AppState> {
	state = {
		searchField: "",
		allPokemons: [],
		searchedPokemons: [],
		selectedPokemon: undefined,
	};

	patchPokemonData = (pokemons: UnpatchedPokemonSchema[]) => {
		const patchedPokemons = pokemons.map((pokemon) => {
			let parsedSprites: PokemonSpritesSchema = {
				normal: undefined,
				animated: undefined,
			};

			try {
				parsedSprites = pokemon.sprites && JSON.parse(pokemon.sprites);
			} catch (e) {
				console.log("Exception while parsing sprites: ", e);
			}

			const patchedPokemon: PokemonSchema = {
				...pokemon,
				sprites: parsedSprites,
			};

			return patchedPokemon;
		});
		return patchedPokemons;
	};

	componentDidMount() {
		const patchedPokemons: PokemonSchema[] =
			this.patchPokemonData(pokemonData);

		this.setState({
			allPokemons: patchedPokemons,
			searchedPokemons: patchedPokemons,
		});
	}

	handleInputChange = (inputValue: string) => {
		const searchField = inputValue;

		const { allPokemons } = this.state;

		const searchedPokemons = allPokemons.filter(
			(pokemon: PokemonSchema) => {
				return (
					pokemon.name &&
					pokemon.name
						.toLowerCase()
						.includes(searchField.toLowerCase())
				);
			}
		);

		this.setState({ searchField, searchedPokemons });
	};

	handleClick = (pokemonName: string) => {
		const { searchedPokemons } = this.state;

		const selectedPokemon = searchedPokemons.find(
			(pokemon: PokemonSchema) => pokemon.name === pokemonName
		);

		// Update the state
		this.setState({ selectedPokemon });
	};

	render() {
		return (
			<div className="App">
				<h1>Pokedex</h1>
				<Pokedex
					searchedPokemons={this.state.searchedPokemons}
					onInputChange={this.handleInputChange}
					onPokemonClick={this.handleClick}
					selectedPokemon={this.state.selectedPokemon}
				/>
			</div>
		);
	}
}

export default App;

/* 
Basic Types:
- boolean
- number
- string
- array
- enum
- void
- **any**
- never
- null
- undefined

const anyVar: anyType = anyValue;
const arrName: Array<type> = [];

enum Color {
    RED, //value 0
    GREEN, //value 1
    BLUE //value 2

    first number can be assigned by us also
    can provide string also as value

}

console.log('$(anyVar) is a variable of anyType with the value anyValue)

*/
