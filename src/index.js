import './style.css';
import itemsCounter from './counter.js';
import { getMovies } from './request.js';

const div = document.querySelector('.movies');
const header = document.querySelector('.shows');
// const body = document.querySelector('body');
let movies = [];

const displayMovie = async () => {
  movies = getMovies();
  const counter = itemsCounter(movies);
  header.innerHTML = 'Shows';
  header.innerHTML += `(${counter})`;

  div.innerHTML = '';
  movies.forEach((movie) => {
    div.innerHTML += `
    <div class="movie" id="${movie.id}>
    <img src="${movie.image.medium}" alt= ${movie.name}>
    <div class="likes">
    <p class="like-p">${movie.name}</p>
    <button class="like-button">< i class="far fa-heart fa-2x" id='heart-${movie.id}'></button>
    </div>
    <p></p>
    <button class="comment-button">Comments</button>
    <button class="comment-button">Reservations</button>
    </div>
    `;
  });
};

displayMovie();