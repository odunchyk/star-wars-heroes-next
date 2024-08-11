import {
  getCharacterById,
  getCharacters,
  getFilms,
  getPlanetById,
  getStarships,
} from "@/_services/starNaviApi";
import HeroNode from "@/_components/HeroNode";
import FilmNode from "@/_components/FilmNode";
import StarshipNode from "@/_components/StarshipNode";
import Graph from "@/_components/Graph";
import { ReactFlowProvider } from "@xyflow/react";

const nodeTypes = {
  heroCard: HeroNode,
  film: FilmNode,
  starship: StarshipNode,
};

export async function generateMetadata({ params }) {
  const character = decodeURIComponent(params.heroGraph);
  return { title: { character } };
}

export async function generateStaticParams() {
  const [characters] = await getCharacters();
  return characters.map((character) => ({
    character: character.name,
  }));
}

async function HeroGraph({ params }) {
  const characterName = decodeURIComponent(params.heroGraph);
  const characterData = await getCharacterById(characterName);
  const homeworld = await getPlanetById(characterData.homeworld);
  const [filmsData] = await getFilms();
  const [starshipsData] = await getStarships();

  const character = { ...characterData, homeworld: homeworld.name };

  const filmsWithCharacter = filmsData.filter((film) =>
    film.characters.includes(character.id)
  );
  const characterStarships = starshipsData.filter((starship) =>
    starship.pilots.includes(character.id)
  );

  const filmNodes = filmsWithCharacter.map((film, index) => {
    return {
      id: String(index + 101),
      type: "film",
      position: { x: 400, y: index * 125 + 50 },
      style: {
        backgroundColor: "#333",
        borderRadius: "4px",
      },
      data: { filmTitle: film.title },
    };
  });

  const characterStarshipsNodes = characterStarships.map((starship, index) => {
    return {
      id: String(index + 201),
      type: "starship",
      position: { x: 700, y: index * 370 + 50 },
      data: { starshipName: starship.name },
      style: {
        backgroundColor: "#333",
        borderRadius: "4px",
      },
    };
  });

  const characterToFilmEdges = filmNodes.map((node) => {
    return { id: `e1-${node.id}`, source: "1", target: node.id };
  });

  const filmToStarshipEdges = [];

  filmsWithCharacter.forEach((film, filmIndex) => {
    characterStarships.forEach((starship, starshipIndex) => {
      if (film.starships.includes(starship.id)) {
        filmToStarshipEdges.push({
          id: `e${filmIndex + 101}-${starshipIndex + 201}`,
          source: `${filmIndex + 101}`,
          target: `${starshipIndex + 201}`,
        });
      }
    });
  });

  const nodes = [
    {
      id: "1",
      type: "heroCard", // Use the custom node type here
      position: {
        x: 0,
        y: 100,
      },
      data: { hero: character },
    },
    ...filmNodes,
    ...characterStarshipsNodes,
  ];

  const edges = [
    { id: "e1-2", source: "1", target: "2" },
    ...characterToFilmEdges,
    ...filmToStarshipEdges,
  ];

  return (
    <ReactFlowProvider>
      <Graph nodes={nodes} edges={edges} nodeTypes={nodeTypes} />
    </ReactFlowProvider>
  );
}

export default HeroGraph;
