import './style.css';
import axios from 'axios';
import itemsCounter from './counter.js';
import { getMovies, GetLikes } from './request.js';
import './contacts.js';

const main = document.querySelector('main');
const div = document.querySelector('.movies');
const header = document.querySelector('.shows');
const body = document.querySelector('body');
let movies = [];

const displayMovie = async () => {
  movies = getMovies();
  const likes = await GetLikes();
  const counter = itemsCounter(movies);
  header.innerHTML = 'Shows';
  header.innerHTML += `(${counter})`;

  div.innerHTML = '';
  movies.forEach((movie, index) => {
    const likeVal = likes[index] !== undefined ? likes[index].likes : 0;
    div.innerHTML += `
    <div class="movie" id="${movie.id}>
    <img src="${movie.image.medium}" alt= ${movie.name}>
    <div class="likes">
    <p class="like-p">${movie.name}</p>
    <button class="like-button"><i class="far fa-heart fa-2x" id='heart-${movie.id}'></button>
    </div>
    <p>${likeVal} likes</p>
    <button class="comment-button">Comments</button>
    <button class="comment-button reservations">Reservations</button>
    </div>
    `;
  });
};

const updateLikes = async (element) => {
  await axios.post('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XMHWey4za3iNnBFD5KUq/likes', { item_id: element.id });
  displayMovie();
};

const links = document.querySelectorAll('nav li a');
const resetLinks = () => {
  for (let i = 0; i < links.length; i += 1) {
    links[i].classList.remove('active');
  }
};

body.addEventListener('click', (event) => {
  if (event.target.classList.contains('shows')) {
    resetLinks();
    event.target.classList.add('active');
    main.innerHTML = '';
    main.append(div);
  } else if (event.target.contains('fa-heart')) {
    updateLikes(event.target);
    displayMovie();
    event.target.classList.add('heart');
  } else if (event.target.classList.contains('link')) {
    resetLinks();
    event.target.classList.add('active');
  }
});

displayMovie();
