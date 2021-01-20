const axios = require("axios")

exports.createPages = async ({actions: {createPage}}) => {
    const {data: movies} = await axios.get("https://api.tvmaze.com/search/shows?q=test")


    createPage({
        path: "/",
        component: require.resolve("./src/components/Home/index"),
        context: {movies}
    })

    movies.forEach(movie => {
        createPage({
            path: `/${movie.show.id}`,
            component: require.resolve("./src/components/CardDetails/index"),
            context: {movie}
        })
    })

}
