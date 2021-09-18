# Movie Search using TMDB

> An Express app that uses the [TMDB API](https://www.themoviedb.org/) to fetch movies and allows you to set the image size. 

- [Live demo](https://replit.com/@RolandJLevy/express-movie-search-with-themoviedb-api)
- [Source code](https://express-movie-search-with-themoviedb-api.rolandjlevy.repl.co/)
- [Github repo](https://github.com/rolandjlevy/express-movie-search-with-themoviedb-api)

The end result is an image path for each movie which includes the size of the image. For example, this uses w185 to set the image width to 185px: https://image.tmdb.org/t/p/w185/r7XF6duZy5ZXmOX7HE3fKGV1WLN.jpg

The dropdown is generated from valid poster sizes set in image_config.mjs which I found on [the TMDB support forum](https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400)

```json
"poster_sizes": [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"
]
```

### Docs

- https://developers.themoviedb.org/3/getting-started/images
- https://developers.themoviedb.org/3/search/search-movies