import axios from "axios"
import React, { useState, useEffect } from 'react';


const Home = () =>{

    const [character, setCharacter] = useState("")
    const [movieData, setMovieData] = useState([])
    const [starshipData, setStarshipData] = useState([])
    const [characterData, setCharacterData] = useState([])
    const [error, setError] = useState(null)

    const getCharacter = async()=>{
        try 
        {
            const response = await axios.get(`https://swapi.dev/api/people/?search=${character}`);
            setCharacterData(response.data.results);
            setError(null);
          }
          catch(error){
          setCharacterData([]);
          setError('Error fetching character data')
        }
      }
      const getStarships= async()=>{

        try 
        {
            const response = await axios.get(`https://swapi.dev/api/starships`);
            setStarshipData(response.data.results);
            setError(null);
            console.log(starshipData.length)

          }
          catch(error){
          setError('Error fetching character data')
          
        }
      }

      const getFilms= async()=>{

        try 
        {
            const response = await axios.get(`https://swapi.dev/api/films`);
            setMovieData(response.data.results);
            setError(null);
            // console.log(movieData)

          }
          catch(error){
          setError('Error fetching character data')
          
        }
      }
      // const setFilmId = (e)=>{
        
      //   const onlyId = e.replace(/\D/g, '')
      //   setMovie(onlyId)
      //   return onlyId
      // }

      const handleChange=(e)=>{
        setCharacter(e.target.value.toLowerCase())
      }
    
      const handleSubmit=(e) =>{
        e.preventDefault()
        getCharacter()
        getFilms()
        getStarships()
      }
      useEffect(()=>{
        
      },[])

      // const getMovieTitle=(data)=>{
      //     if(data.movie == ""){

      //     }
      // }


    return(
        <div className="content">
            <div className="heading">
            <h2 className="page-title">Find the one you're looking for</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={character} placeholder="Enter character name"></input>
                <button type="submit">Search</button>
            </form>
       </div>
            {error && <p>Something went wrong</p>}
            
            {characterData.length === 0 && <p className="error-message">This character does not exist in this universe</p>}
            
        {characterData.map((data)=> {
          //  console.log(data)
          const totalStarships = starshipData.length;
          let pilotedStarships=0;
        return (
          <div key={data.url} className='container'>
            <div className="content-info">
              <div className="content-info-left content-card">
                <h2>Information</h2>
                <p> Full name: {data.name}</p>
                <p>Birth Year:  {data.birth_year}</p>
                <p> Gender:  {data.gender}</p>
              </div>
              <div className="content-info-middle content-card">
                <h2 >Characteristics</h2>
                <p> Height: {data.height}</p>
                <p>Weight:  {data.mass}</p>
                <p> Eye Color:  {data.eye_color}</p>
                <p> Hair Color: {data.hair_color}</p>
                <p>Skin Color:  {data.skin_color}</p>
              </div>
              <div className="content-info-right content-card">
                <div className="right_movies">
                  <h2 className="movies-title">Movies</h2>
                  {movieData.map(function (movie) {
                    return movie.characters.map(function (character) {
                      if (character === data.url) {
                        // console.log('Match found for:', movie.title);
                        return (
                          <div key={movie.title}>{movie.title}</div>
                        );
                      }
        
                      return null;
                    });
                  })}
                </div>
              </div>
            </div>
            <div className="content-info">
              <div className="content-info-left content-card">
              <h2 className="starships-name">Starships</h2>
                  {starshipData.map(function (starship) {
                    
                    
                    return starship.pilots.map(function (pilot) {
                      
                      if (pilot === data.url) {
                        console.log('Match found for:', starship.name);
                        pilotedStarships +=1;
                        
                        return (
                          <div key={starship.name}>{starship.name}</div>
                        );
                      }
                      
                      
                      return null;
        
                     
                    });
                    
                  })}
                   {pilotedStarships < 1 ? (
                    <div>This person has not piloted any starships yet</div>
                  ) : null}
              </div>
            </div>
          </div>
        );
        })}
        </div>
    )
}

export default Home;