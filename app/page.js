import { getCharacters, getFilms } from "@/_services/starNaviApi";
import SWHeroesList from "@/_components/SWHeroesList";
import SearchBar from "@/_components/SearchBar";
import Pagination from "@/_components/Pagination";
import DropdownMenu from "@/_components/DropdownMenu";

const ITEMS_PER_PAGE = 10;

export const metadata = {
  title: "SW Heroes",
};

const filterAndPaginateCharacters = (
  characters,
  films,
  searchParams,
  query
) => {
  const currentPage = Number(searchParams?.page) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const selectedFilmTitle = searchParams?.film;
  const selectedFilm = films.find((film) => film.title === selectedFilmTitle);
  const selectedFilmId = selectedFilm?.id;

  const filteredCharactersByFilm =
    selectedFilm === undefined
      ? characters
      : characters.filter((character) =>
          character.films.includes(selectedFilmId)
        );

  const filteredCharactersByQuery = filteredCharactersByFilm.filter(
    (character) => character.name.toLowerCase().includes(query.toLowerCase())
  );

  const paginatedCharacters = filteredCharactersByQuery.slice(
    startIndex,
    endIndex
  );

  return {
    paginatedCharacters,
    totalFilteredCharacters: filteredCharactersByQuery.length,
  };
};

const StarWarsHeroes = async ({ searchParams }) => {
  const [characters, totalPages] = await getCharacters();
  const [films] = await getFilms();
  const query = searchParams?.query || "";

  const filmTitles = films.map((film) => film.title);
  filmTitles.unshift("All films");

  const { paginatedCharacters, totalFilteredCharacters } =
    filterAndPaginateCharacters(characters, films, searchParams, query);

  return (
    <>
      <h1 className="font font-star-wars-h1 text-2xl">Star Wars Heroes</h1>
      <div className="w-full flex justify-center gap-10">
        <SearchBar placeholder={"Enter name"} />
        <DropdownMenu options={filmTitles} />
      </div>
      <SWHeroesList characters={paginatedCharacters} query={query} />
      <Pagination
        totalItems={totalFilteredCharacters}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </>
  );
};

export default StarWarsHeroes;
