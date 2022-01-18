import md5 from 'crypto-js/md5';
import { getFromLocalStorage, saveToLocalStorage } from '../services';

const parser = new DOMParser();
// Função para decodificar as entidades HTML encontrada em
// https://stackoverflow.com/a/34064434
export const htmlDecode = (input) => {
  if (window.Cypress) return input;
  const doc = parser.parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
};

export const getGravatarUrl = (email) => {
  const emailHash = md5(email).toString();
  return `https://www.gravatar.com/avatar/${emailHash}`;
};

const filterPlayer = (player, name, picture) => {
  const differentName = player.name !== name;
  const differentPicture = player.picture !== picture;
  return differentName && differentPicture;
};

export const saveRanking = (name, picture, score) => {
  const ranking = getFromLocalStorage('ranking');
  const newRanking = [
    ...ranking
      .filter((player) => filterPlayer(player, name, picture)),
  ];
  newRanking.push({ name, picture, score });
  saveToLocalStorage('ranking', newRanking);
};

export const toggleAnsweredClass = () => {
  const alternatives = document.querySelector('.alternatives');
  alternatives.classList.toggle('answered');
};
