import { useEffect, useState } from "react";

import { Button } from "./components/Button";
import { MovieCard } from "./components/MovieCard";

// import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';

import { api } from "./services/api";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";
import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

interface GenreResponseProps {
	id: number;
	name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
	title: string;
}

export function App() {
	const [selectedGenreId, setSelectedGenreId] = useState(1);

	const [genres, setGenres] = useState<GenreResponseProps[]>([]);

	const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
		{} as GenreResponseProps
	);

	useEffect(() => {
		api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(
			(response) => {
				setSelectedGenre(response.data);
			}
		);
  }, [selectedGenreId]);
  

	function handleClickButton(id: number) {
		setSelectedGenreId(id);
	}

	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<SideBar selectedGenreId={selectedGenreId} handleClickButton={handleClickButton}></SideBar>
			<Content
				selectedGenre={selectedGenre}
				selectedGenreId={selectedGenreId}
			></Content>
		</div>
	);
}
