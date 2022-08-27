import { IMG_PATH } from './config';

export const getJSON = async function (url, errorMsg) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  return await response.json();
};

export const createObject = function (data) {
  return {
    id: data.id,
    title: data.title,
    overview: data.overview,
    releaseDate: new Date(data.release_date).getFullYear(),
    backdrop: `${IMG_PATH}${data.backdrop_path}`,
    poster: `${IMG_PATH}${data.poster_path}`,
    genre: [...data.genre_ids],
    rating: Math.round(data.vote_average * 10) / 10,
  };
};
