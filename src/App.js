import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) =>{
      setMovieList(response.data); 
    });
  }, []);




  const submitReview = () => {

    Axios.post("http://localhost:3001/api/insert", {
      movieName:movieName, 
      movieReview:review,
    });
        setMovieList ([...movieReviewList, {movieName: movieName, movieReview:review},]);

    
  };

  const deleteReview = (movie) => {
    Axios.delete('http://localhost:3001/api/delete/${movie}');
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/delete/");
  };


  return (
    <div className="App">
    <h1>CRUD Uygulamaları</h1>
    <div className='form'>
      <label>Film Adı: </label>
    <input type="text" name="movieName" onChange={(e) => {
      setMovieName(e.target.value)
    }}/>
    <label>Film Yorumu: </label>
    <input type="text" name="review"onChange={(e) => {
      setReview(e.target.value)
    }}/>
    <button onClick={submitReview}>Kaydet</button>
    {movieReviewList.map((val) => {
        return (
        <div className="card">
        <h1>{val.movieName}</h1>
        <p>{val.movieReview}</p>
        <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
        <input type="text" id="updateInput"/>
        <button>Update</button>
        </div>
        );
    
    })}
    </div>
    </div>
  );
}

export default App;
