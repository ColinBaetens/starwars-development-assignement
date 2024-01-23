import axios from "axios"
import React, { useState } from 'react';


const Home = () =>{

    const [character, setCharacter] = useState("yoda")
    const [characterData, setCharacterData] = useState([])
    const [error, setError] = useState(null)

    const getCharacter = async()=>{
        const toArray = [];
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

      const handleChange=(e)=>{
        setCharacter(e.target.value.toLowerCase())
      }
    
      const handleSubmit=(e) =>{
        e.preventDefault()
        getCharacter()
      }


    return(
        <div>
            <h2>Find the one you're looking for</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={character} placeholder="Enter character name"></input>
                <button type="submit">Search</button>
            </form>
       
            {error && <p>{error}</p>}

        {characterData.map((data)=> {
            console.log(data)
            return(
          <div key={data.url} className='container'>
                <div>
                    
                </div>
           {data.name}
          </div>
        )
        })}
        </div>
    )
}

export default Home;