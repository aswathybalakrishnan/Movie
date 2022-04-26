import React, { useEffect, useState } from 'react'
import './Card.css'
import Axios from '../../Static/Axios'
import {API_KEY} from '../../Static/Static'
import { img_url } from '../../Static/Static'
import axios from 'axios'
import YouTube from 'react-youtube'
function Card(props) {
  const [movie,setMovie] = useState([])
  const [url,setUrl] = useState("")
  useEffect(()=>{
    Axios.get(props.url).then((response)=>{
      console.log(response.data.results);
      setMovie(response.data.results)
    
    })
      

  }, [])
  const getId=(id)=>{
    console.log(id)
    console.log("clicked")
    Axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0].key)
    setUrl(response.data.results[0].key)
    })
  }
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div className='row'>
        <h1 className='title'>{props.title}</h1>
    <div className='post'>
      {
        movie.map((obj)=>{
            return(
              <img onClick={()=>getId(obj.id)} className='poster' src={movie ? `${obj ? img_url+obj.backdrop_path : ""}` : ""}></img>
            )
        })
      }
      

        </div>  
        {url && <YouTube videoId={url} opts={opts}  />}  
    </div>
  )
}

export default Card