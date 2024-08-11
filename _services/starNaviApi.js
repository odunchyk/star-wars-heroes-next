const BASE_URL = "https://sw-api.starnavi.io";

const fetchDataSingle = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

const fetchDataBulk = async (endpoint) => {
  try {
    const allData = [];
    let page = 1;
    let currentPageData;

    while (true) {
      const response = await fetch(`${BASE_URL}/${endpoint}?page=${page}`);
      currentPageData = await response.json();
      allData.push(...currentPageData.results);

      if (!currentPageData.next) break;

      page += 1;
    }
    return [allData, page];
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const getCharacters = () => {
  return fetchDataBulk("people");
};

export const getCharacterById = async (name) => {
  const [characters] = await getCharacters();
  const character = characters.find(
    (char) => char.name.toLowerCase() === name.toLowerCase()
  );

  return character;
};

export const getFilms = async () => {
  return fetchDataBulk("films");
};

export const getStarships = async () => {
  return fetchDataBulk("starships");
};

export const getPlanets = async () => {
  return fetchDataBulk("planets");
};

export const getPlanetById = async (planetId) => {
  return await fetchDataSingle(`planets/${planetId}`);
};
