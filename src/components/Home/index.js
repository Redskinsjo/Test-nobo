import React, { useState } from "react";
import Header from "../shared/Header/index"
import "../../assets/styles/reset.css"
import "@fontsource/roboto"
import Card from "../Card/index"
import Layout from "../shared/Layout/index"
import Footer from "../shared/Footer/index"
import { Input, Button} from '@material-ui/core';

const Home = ({pageContext: {movies}}) => {
    const [input, setInput] = useState("")
    const [searchMovies, setSearchMovies] = useState(movies)

    const handleClick = () => {
        if (input.length > 0) {
            const filteredMovies = movies.filter(movie => {
                return movie.show.name.toLowerCase().includes(input.toLowerCase())
            })
            setSearchMovies(filteredMovies)
        }
    }

    const renderMovies = searchMovies.map((movie, index) => {
        return <Card movie={movie} key={movie.show.id}></Card>
    })
    return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <div style={{flexGrow: 1}}>
                <Header />
                <Layout>

                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Input type='text' value={input} onChange={(e) => {
                            setInput(e.target.value)
                        }}></Input>
                        <Button onClick={handleClick}>Search</Button>
                        <div style={{fontFamily: "Roboto", cursor: "pointer"}} onClick={() => {
                            setSearchMovies(movies)
                            setInput("")
                        }}>X</div>
                    </div>

                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {renderMovies}
                    </div>

                </Layout>
            </div>
            
            <Footer/>
        </div>
    )
}

export default Home