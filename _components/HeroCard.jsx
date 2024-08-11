/* eslint-disable react/prop-types */
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line react/display-name
const HeroCard = ({ hero, isDetailed = false }) => {
  if (isDetailed) {
    return (
      <article className="rounded-[8px] m-[16px] p-[16px] w-[275px] text-center flex flex-col justify-between cursor-pointer bg-[#333]">
        <h2 className="mb-[10px] font-bold text-[1.5em]">{hero.name}</h2>
        <Image
          src={`/character-images/${hero.name}.jpg`}
          width={300}
          height={400}
          alt={hero.name}
        />
        <ul className="mt-6">
          {hero.height !== "unknown" && (
            <li className="flex justify-between">
              <span>Height</span> <span>{hero.height / 100}m</span>
            </li>
          )}
          {hero.mass !== "unknown" && (
            <li className="flex justify-between">
              <span>Mass</span>
              <span>{hero.mass}kg</span>
            </li>
          )}
          {hero.hair_color !== "n/a" && (
            <li className="flex justify-between">
              <span>Hair color</span> <span>{hero.hair_color}</span>
            </li>
          )}
          <li className="flex justify-between">
            <span>Skin color</span> <span>{hero.skin_color}</span>
          </li>
          <li className="flex justify-between">
            <span>Eye color</span> <span>{hero.eye_color}</span>
          </li>
          {hero.birth_year !== "unknown" && (
            <li className="flex justify-between">
              <span>Birth year</span> <span>{hero.birth_year}</span>
            </li>
          )}
          {hero.gender !== "n/a" && (
            <li className="flex justify-between">
              <span>Gender</span> <span>{hero.gender}</span>
            </li>
          )}
          {hero.homeworld !== "unknown" && (
            <li className="flex justify-between">
              <span>Homeworld</span> <span>{hero.homeworld}</span>
            </li>
          )}
        </ul>
      </article>
    );
  }
  return (
    <li className="rounded-[8px] m-[16px] p-[16px] w-[275px] text-center flex flex-col justify-between cursor-pointer hover:scale-[1.2] hover:[transition:transform_0.3s_ease-in-out] [transition:transform_1s_ease-out]">
      <Link href={`/${hero.name}`}>
        <h2 className="mb-[10px] font-bold text-[1.5em]">{hero.name}</h2>
        <Image
          src={`/character-images/${hero.name}.jpg`}
          className="w-full h-[300px] object-cover object-top rounded-[8px]"
          width={300}
          height={300}
          alt={hero.name}
        />
      </Link>
    </li>
  );
};

export default HeroCard;
