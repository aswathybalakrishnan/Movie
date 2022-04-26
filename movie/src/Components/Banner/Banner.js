import React, {useEffect, useState} from 'react'
import './Banner.css'
import Axios from '../../Static/Axios'
import {API_KEY} from '../../Static/Static'
import {img_url} from '../../Static/Static'
import YouTube from 'react-youtube'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function Banner() {
  const [movie,setMovie] = useState()
  const [url,setUrl] = useState()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    Axios.get(`/trending/all/day?api_key=${API_KEY}`).then((response)=>{
      console.log(response.data.results[0]);
      setMovie(response.data.results[1])
    })
      

  }, [])
  const getMovieId=(id)=>{
    console.log(id)
    console.log("clicked")
    Axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0].key)
      setUrl(response.data.results[0].key)
      handleOpen()
    
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
  const style = {
    position: 'absolute' ,
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className='banner'>
      
      <div className='banner' style={ {backgroundImage:`url(${movie?img_url+movie.backdrop_path:""})`} }>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {url && <YouTube videoId={url} opts={opts}  />}
          </Typography>
        </Box>
      </Modal>
          <button className='button'  onClick={()=>getMovieId(movie.id)}>Play</button>
         <button className='button'>MyList</button>
      
    
      
          <h1 className='name'>{movie ? movie.title : ""}</h1>
     
          <h4 className='dis'>{movie ? movie.overview : ""}</h4>
      
      </div>
    
    </div>

  )
}

export default Banner