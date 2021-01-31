const axios = require("axios")

exports.createPages = async ({ actions: { createPage } }) => {
  const { data: fetchedMovies } = await axios.get(
    "https://api.tvmaze.com/search/shows?q=test"
  )

  // Crétion de la page d'accueil
  createPage({
    path: "/",
    component: require.resolve("./src/components/Home/index"),
    context: { fetchedMovies },
  })

  // Création des pages 'détail' de chaque film
  fetchedMovies.forEach(movie => {
    createPage({
      path: `/${movie.show.id}`,
      component: require.resolve("./src/components/CardDetails/index"),
      context: { movie },
    })
  })
}
