# Notes

### Placeholder image
- https://placeholder.com/


Example URL: 
https://image.tmdb.org/t/p/w500/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg

https://developers.themoviedb.org/3/getting-started/images

### Image config sizes
https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400

### Search movies
https://developers.themoviedb.org/3/search/search-movies

https://api.themoviedb.org/3/search/movie?query=jaws&language=en-US&page=1&include_adult=false&api_key=48705de1a219b37581d959d52e514d23

### Load json locally

```js
  let image_config;
  try {
    const data = fs.readFileSync('image_config.json', 'utf8')
    image_config = JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
```

```js
  const fetchImage = (movieId) => {
    const movieBaseUrl = 'https://api.themoviedb.org/3/movie/';
    const url = `${movieBaseUrl}${movieId}?api_key=${API_KEY}`;
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(res => res.json())
      .then(img => {
        const { poster_path } = img;
        resolve(poster_path);
      })
      .catch(err => reject(err));
    });
  }
```
