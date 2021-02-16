import React, { useState, useEffect } from "react"
import Header from "../shared/Header/index"
import "../../assets/styles/reset.css"
import css from "./index.module.css"
import "@fontsource/roboto"
import Card from "../Card/index"
import Layout from "../shared/Layout/index"
import Footer from "../shared/Footer/index"
import { Input, Button } from "@material-ui/core"
import "antd/dist/antd.css"
import { Select, Pagination, Empty } from "antd"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faThumbsUp,
  faThumbsDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
library.add(faThumbsUp, faThumbsDown, faTimes)

const { Option } = Select

const Home = ({ pageContext: { fetchedMovies } }) => {
  const [input, setInput] = useState("")
  // moviesData state stocks all the data
  const [movies, setMovies] = useState(fetchedMovies)
  // filteredMovies state serves to process the data w/o losing the count of all the data
  const [filteredMovies, setFilteredMovies] = useState()
  // searchedMovies state collects the list of results after a research
  const [searchedMovies, setSearchedMovies] = useState()
  // displayedMovies state is actually the list of elements to display on the screen
  const [displayedMovies, setDisplayedMovies] = useState(fetchedMovies)
  // for pagination
  const [pageSize, setPageSize] = useState(12)
  const [currentPage, setCurrentPage] = useState(1)
  // isLiked state stocks the movies that were liked by the user
  const [isLiked, setIsLiked] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // categories state tracks dynamically the available filters
  const [categories, setCategories] = useState([])

  // search of movie function
  const handleClick = () => {
    if (input.length > 0) {
      if (filteredMovies) {
        const searchedMovies = filteredMovies.filter(movie => {
          return movie.show.name.toLowerCase().includes(input.toLowerCase())
        })

        setSearchedMovies(searchedMovies)
        setDisplayedMovies(
          searchedMovies.slice(
            (currentPage - 1) * pageSize,
            (currentPage - 1) * pageSize + pageSize
          )
        )
      } else {
        const searchedMovies = movies.filter(movie => {
          return movie.show.name.toLowerCase().includes(input.toLowerCase())
        })

        setSearchedMovies(searchedMovies)
        setDisplayedMovies(
          searchedMovies.slice(
            (currentPage - 1) * pageSize,
            (currentPage - 1) * pageSize + pageSize
          )
        )
      }
    }
  }

  // the movie data is loaded before the creation of the pages with Gatsby
  const renderMovies = displayedMovies?.map((movie, index) => {
    return (
      <Card
        movie={movie}
        key={movie.show.id}
        movies={movies}
        setMovies={setMovies}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />
    )
  })

  // set the movies to be displayed conditionnaly to the pagination
  const handlePageChange = (page, pageSize) => {
    if (!filteredMovies) {
      if (searchedMovies) {
        if (page === 1) {
          const displayedMovies = searchedMovies.slice(0, pageSize)
          setDisplayedMovies(displayedMovies)
        } else {
          const skip = (page - 1) * pageSize
          const displayedMovies = searchedMovies.slice(skip, skip + pageSize)
          setDisplayedMovies(displayedMovies)
        }
      } else {
        if (page === 1) {
          const displayedMovies = movies.slice(0, pageSize)
          setDisplayedMovies(displayedMovies)
        } else {
          const skip = (page - 1) * pageSize
          const displayedMovies = movies.slice(skip, skip + pageSize)
          setDisplayedMovies(displayedMovies)
        }
      }
    } else {
      if (searchedMovies) {
        const filterMovies = searchedMovies.filter(movie => {
          return movie.show.type.toLowerCase() === input.toLowerCase()
        })
        if (page === 1) {
          const displayedMovies = filterMovies.slice(0, pageSize)
          setDisplayedMovies(displayedMovies)
        } else {
          const skip = (page - 1) * pageSize
          const displayedMovies = filterMovies.slice(skip, skip + pageSize)
          setDisplayedMovies(displayedMovies)
        }
      } else {
        if (page === 1) {
          const displayedMovies = filteredMovies.slice(0, pageSize)
          setDisplayedMovies(displayedMovies)
        } else {
          const skip = (page - 1) * pageSize
          const displayedMovies = filteredMovies.slice(skip, skip + pageSize)
          setDisplayedMovies(displayedMovies)
        }
      }
    }
  }

  // set the movies to be displayed conditionnaly to the filters
  const handleFilterChange = value => {
    if (value === "all categories") {
      setFilteredMovies(movies)
      if (searchedMovies) {
        if (currentPage === 1) {
          const displayedMovies = searchedMovies.slice(0, pageSize)
          setDisplayedMovies(displayedMovies)
        } else {
          const skip = (currentPage - 1) * pageSize
          const displayedMovies = searchedMovies.slice(skip, skip + pageSize)
          setDisplayedMovies(displayedMovies)
        }
      } else {
        if (currentPage === 1) {
          const displayedMovies = movies.slice(0, pageSize)
          setDisplayedMovies(displayedMovies)
        } else {
          const skip = (currentPage - 1) * pageSize
          const displayedMovies = movies.slice(skip, skip + pageSize)
          setDisplayedMovies(displayedMovies)
        }
      }
    } else {
      if (searchedMovies) {
        const filterMovies = searchedMovies.filter(movie => {
          return movie.show.type.toLowerCase() === value.toLowerCase()
        })
        setFilteredMovies(filterMovies)
        if (currentPage === 1) {
          const displayedMovies = filterMovies.slice(0, pageSize)

          setDisplayedMovies(displayedMovies)
        } else {
          const skip = (currentPage - 1) * pageSize
          const displayedMovies = filterMovies.slice(skip, skip + pageSize)

          setDisplayedMovies(displayedMovies)
        }
      } else {
        const filterMovies = movies.filter(movie => {
          return movie.show.type.toLowerCase() === value.toLowerCase()
        })
        setFilteredMovies(filterMovies)
        if (currentPage === 1) {
          const displayedMovies = filterMovies.slice(0, pageSize)

          setDisplayedMovies(displayedMovies)
        } else {
          const skip = (currentPage - 1) * pageSize
          const displayedMovies = filterMovies.slice(skip, skip + pageSize)

          setDisplayedMovies(displayedMovies)
        }
      }
    }
  }

  // Create the DOM list of filter options
  let renderFilters
  if (!isLoading) {
    renderFilters = categories.map((category, index) => {
      return (
        <Option value={category.toLowerCase()} key={index}>
          {category}
        </Option>
      )
    })
  }

  // Manage the list of categories from the movies available
  const updateCategories = movies => {
    let categories = []
    const copy = [...movies]
    categories.push("All categories")
    for (let i = 0; i < copy.length; i++) {
      if (!categories.includes(copy[i].show.type)) {
        categories.push(copy[i].show.type)
      }
    }
    setCategories(categories)
    setIsLoading(false)
  }

  useEffect(() => {
    if (movies) {
      updateCategories(movies)
      setDisplayedMovies(movies)
    }
  }, [movies])

  return (
    <div className={css.pageContainer}>
      <div style={{ flexGrow: 1, backgroundColor: "#242424" }}>
        <Header isDynamicMessage={true} />
        <Layout
          style={{
            minHeight: "calc(100vh - 105px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flexGrow: 1, marginTop: 20 }}>
            <div className={css.mainContainer}>
              <div className={css.mainContainerFirstPart}>
                {!isLoading && (
                  <Select
                    defaultValue="select a category"
                    style={{ width: 170, marginLeft: 15 }}
                    onChange={handleFilterChange}
                  >
                    {renderFilters}
                  </Select>
                )}
                <div className={css.searchContainer}>
                  <Input
                    type="text"
                    value={input}
                    onChange={e => {
                      setInput(e.target.value)
                    }}
                    placeholder="Enter a movie title"
                  ></Input>
                  <Button onClick={handleClick}>Search</Button>
                  <div
                    className={css.resetSearch}
                    onClick={() => {
                      if (filteredMovies) {
                        if (currentPage === 1) {
                          setDisplayedMovies(filteredMovies.slice(0, pageSize))
                          setSearchedMovies(null)
                        } else {
                          setDisplayedMovies(
                            filteredMovies.slice(
                              (currentPage - 1) * pageSize,
                              (currentPage - 1) * pageSize + pageSize
                            )
                          )
                          setSearchedMovies(null)
                        }
                      } else {
                        if (currentPage === 1) {
                          setDisplayedMovies(movies.slice(0, pageSize))
                          setSearchedMovies(null)
                        } else {
                          setDisplayedMovies(
                            movies.slice(
                              (currentPage - 1) * pageSize,
                              (currentPage - 1) * pageSize + pageSize
                            )
                          )
                          setSearchedMovies(null)
                        }
                      }
                      setInput("")
                    }}
                  >
                    X
                  </div>
                </div>
              </div>
            </div>

            <div className={css.renderMoviesContainer}>
              {displayedMovies.length !== 0 ? (
                renderMovies
              ) : (
                <div className={css.emptyContainer}>
                  <Empty style={{ color: "white" }} />
                </div>
              )}
            </div>
          </div>
          <div className={css.paginationContainer}>
            <Pagination
              current={currentPage || 1}
              pageSizeOptions={[4, 8, 12]}
              pageSize={pageSize || 12}
              total={
                displayedMovies.length === 0
                  ? 1
                  : searchedMovies && searchedMovies?.length > 0
                  ? searchedMovies.length
                  : filteredMovies
                  ? filteredMovies.length
                  : movies?.length
              }
              showSizeChanger={true}
              onChange={(page, pageSize) => {
                setCurrentPage(page)
                setPageSize(pageSize)
                handlePageChange(page, pageSize)
              }}
            />
          </div>
        </Layout>
      </div>

      <Footer />
    </div>
  )
}

export default Home
