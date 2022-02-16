
import axios from 'axios';
import itemsCounter from './counter';
import { getMovies, GetLikes } from './request';
import './style.css';
import './contacts';

const main = document.querySelector('main');
const div = document.querySelector('.movies');
const comments = document.querySelector('.comments');
const header = document.querySelector('.shows');
const body = document.querySelector('body');
const commentsDiv = document.querySelector('#comments-wrapper');
let movies = [];
let commentHTML = '';
let getCommentsFromAPI = [];

const displayMovie = async () => {
  movies = await getMovies();
  const likes = await GetLikes();
  const counter = itemsCounter(movies);
  header.innerHTML = 'Shows';
  header.innerHTML += ` (${counter})`;

  div.innerHTML = '';
  movies.forEach((movie, index) => {
    const likeVal = likes[index] !== undefined ? likes[index].likes : 0;
    div.innerHTML += `
    <div class="movie" id="${movie.id}">
    <img src="${movie.image.medium}" alt="${movie.name}">
    <div class="likes">
    <p class="like-p">${movie.name}</p>
    <button class="like-button"><i class="far fa-heart fa-2x" id='heart-${movie.id}'></i></button>
    </div>
    <p>${likeVal} likes</p>
    <button class="comment-button">Comment</button>
    </div>`;
  });
};

const updateLikes = async (ele) => {
  await axios.post('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XMHWey4za3iNnBFD5KUq/likes', { item_id: ele.id });
  displayMovie();
};

const popUpHtml = (target) => {
  comments.innerHTML = `
    <div id='pop'>
      <div id='img-div'>
        <i class='fas fa-times'></i>
        <img src="${movies[parseInt(target, 10) - 1].image.medium}" alt="${movies[parseInt(target, 10) - 1].name}">
      </div>
      <h2>${movies[parseInt(target, 10) - 1].name}</h2>
      <div id='comment-feature'>
        <p> Rating: ${movies[parseInt(target, 10) - 1].rating.average}</p>
        <p> Genres: ${movies[parseInt(target, 10) - 1].genres}</p>
        <p> Released Date: ${movies[parseInt(target, 10) - 1].premiered}</p>
        <p> Language: ${movies[parseInt(target, 10) - 1].language}</p>
      </div>
    </div>`;
};

const showComments = async (id) => {
  try { getCommentsFromAPI = await getComments(id); } catch {
    popUpHtml(id);
    commentHTML = '<p>No Comments Yet</p>';
    getCommentsFromAPI = [];
  }
  if (getCommentsFromAPI.length === 0) {
    commentHTML = '<p>No Comments Yet</p>';
  } else {
    getCommentsFromAPI.forEach((i) => { commentHTML += `<p>${i.creation_date} ${i.username}: ${i.comment}</p>`; });
  }
  let commentsCount = itemsCounter(getCommentsFromAPI);
  comments.innerHTML
  += `<div id='comment-area'>
        <h2>Comments (${commentsCount})</h2>
        ${commentHTML}
      </div>
      <div id='comment-form'>
        <h2>Add a Comment</h2>
        <form action="submit" id="form-area">
          <input type="text" id="name" placeholder="Your Name" required>
          <textarea type="textarea" rows="4" cols="50" name="comment" placeholder="Your Insights" required></textarea>
          <p></p>
          <button name="${id}" type="button">Submit Comment</button>
        </form>
      </div>`;
};

const postNewComments = (movieID, userName, userComment) => {
  axios.post('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XMHWey4za3iNnBFD5KUq/comments', {
    item_id: movieID,
    username: userName,
    comment: userComment,
  });
  showComments(movieID);
};

const getComments = async (movieId) => {
  try {
    const comments = await axios.get(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XMHWey4za3iNnBFD5KUq/comments?item_id=${movieId}`);
    return comments.data;
  } catch {
    return [];
  }
};

const links = document.querySelectorAll('nav li a');
  const resetLinks = () => {
    console.log(links);
    for (let i = 0; i < links.length; i += 1) {
      links[i].classList.remove('active');
    }
  };

body.addEventListener('click', (e) => {
  const indexID = e.target.parentNode.id;
  if (e.target.classList.contains('shows')) {
    resetLinks();
    e.target.classList.add('active');
    main.innerHTML='';
    main.append(div);
  }else if (e.target.className === 'comment-button') {
    body.classList.add('fixed');
    popUpHtml(indexID);
    commentHTML = '';
    showComments(indexID);
    commentsDiv.classList.remove('d-none')
  } else if (e.target.classList.contains('fa-heart')) {
    updateLikes(e.target);
    displayMovie();
    e.target.classList.add('heart');
  } else if (e.target.innerHTML === 'Submit Comment') {
    const sentID = (e.target.name).toString();
    const sentUserName = (e.target.parentNode.childNodes[1].value);
    const sentUserComment = (e.target.parentNode.childNodes[3].value);
    if (sentUserComment && sentUserName) {
      commentHTML = '';
      comments.innerHTML = '';
      popUpHtml(e.target.name);
      postNewComments(sentID, sentUserName, sentUserComment);
    } else {
      const p = e.target.previousElementSibling;
      p.innerText = 'Please insert your name and comment.';
  
    }
  } else if (e.target.classList.contains('fa-times')) {
    comments.innerHTML = '';
    commentsDiv.classList.add('d-none');
    body.classList.remove('fixed');
  } else if (e.target.classList.contains('link')) {
    resetLinks();
    e.target.classList.add('active');
  }
});

displayMovie();
