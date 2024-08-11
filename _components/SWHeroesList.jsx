import HeroCard from "./HeroCard";

function SWHeroesList({ characters }) {
  if (characters.length === 0) {
    return <div>No characters found</div>;
  }

  return (
    <ul className="flex flex-wrap justify-center bg-[#333] rounded-[8px]">
      {characters.map((character) => (
        <HeroCard key={character.id} hero={character} />
      ))}
    </ul>
  );
}

export default SWHeroesList;
