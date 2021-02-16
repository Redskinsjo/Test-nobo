const axios = require("axios")

exports.createPages = async ({ actions: { createPage } }) => {
  const { data } = await axios.get("https://api.tvmaze.com/search/shows?q=test")

  const fetchedMovies = data
    .map(movie => {
      return {
        ...movie,
        show: {
          ...movie.show,
          image: {
            ...movie.show.image,
            medium: movie.show.image?.medium
              ? movie.show.image.medium.replace(/^https?:/, "")
              : null,
          },
        },
      }
    })
    // Crétion de la page d'accueil
    .createPage({
      path: "/",
      component: require.resolve("./src/components/Home/index"),
      context: { fetchedMovies },
    })
  console.log(fetchedMovies)
  // Création des pages 'détail' de chaque film
  fetchedMovies.forEach(movie => {
    createPage({
      path: `/${movie.show.id}`,
      component: require.resolve("./src/components/CardDetails/index"),
      context: { movie },
    })
  })
}
