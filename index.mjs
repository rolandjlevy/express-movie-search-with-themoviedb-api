import fs from 'fs';
import fetch from 'node-fetch';
import express from 'express';
import image_config from './image_config.mjs';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const { API_KEY, PORT } = process.env;
const imageBaseUrl = 'https://image.tmdb.org/t/p/';
const movieBaseUrl = 'https://www.themoviedb.org/movie/';
const searchBaseUrl = 'https://api.themoviedb.org/3/search/movie';

// Movie seach form
app.get('/', (req, res) => {
  res.send(getSearchForm());
});

// Search results with selected image width
app.post('/image', (req, res) => {
  const { query, size } = req.body;
  if (!query || !size) return;
  (async () => {
    const data = await fetchMovie(query);
    let html = getSearchForm(query, size);
    html += data.results.map(movie => getMovieCard(movie, size)).join('');
    res.send(html);
  })();
});

// Fetch movie data using user search query
const fetchMovie = (query) => {
  const url = `${searchBaseUrl}?query=${query}&language=en-UK&page=1&include_adult=false&api_key=${API_KEY}`
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      const movie = await response.json();
      resolve(movie);
    } catch (err) {
      reject(err);
    }
  });
}

// Render HTML for search form
const getSearchForm = (query='', size) => {
  return `
    <h2>Movie Search</h2>
    <form method="post" action="/image">
      <input type="text" name="query" placeholder="Search..." value="${query}" />
      ${getImageSizeDropdown(size)}
      <button type="submit">Submit</button>
    </form>
    <hr />
  `;
}

// Render HTML for Image width dropdown
const getImageSizeDropdown = (selectedSize) => {
  let html = '<select name="size"><option value="">Image width (px)</option>';
  html += image_config.poster_sizes.map(option => {
    const size = option.replace(/^w/, '');
    const selected = selectedSize === option ? ' selected' : '';
    return `<option value="${option}"${selected}>${size}</option>`
  });
  html += '</select>';
  return html;
}

// Render HTML for each movie
const getMovieCard = (movie, size) => {
  const { title, id, poster_path } = movie;
  let imageSrc;
  if (poster_path === null) {
    const n = Number(size.replace(/^w/, ''));
    imageSrc = `https://via.placeholder.com/${n}x${Math.round(n*1.5)}.png?text=NO+IMAGE`;
  } else {
    imageSrc = `${imageBaseUrl}${size}/${poster_path}`;
  }
  return `
    <section>
      <h3>${title}</h3>
      <img src="${imageSrc}" />
      <p><a href="${movieBaseUrl}${id}" target="_blank">Full details...</a></p>
      <hr />
    </section>
  `;
}

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
