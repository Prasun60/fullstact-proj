import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Getmovies() {
    const navigate = useNavigate();
  const [movies, setMovies] = useState([]);



  useEffect(() => {
    try {
      fetch("http://localhost:4000/getmovies", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setMovies(data);
        });
    } catch (err) {
      console.log(err);
    }
  });

  const handleclick = (id) => {
    try {
      fetch("http://localhost:4000/movies/" + id, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
        },
      }).then((data) => {
        console.log(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  
  const Handleupdate = (id) => {
    navigate("/addmovie/"+id);
};

    return (
      <div>
        <button onClick={() => navigate(`/addmovie/${undefined}`)}>Add Movie</button>
        {movies.map((movie) => {
          return (
            <div>
              <h1>{movie.title}</h1>
              <h1>{movie.genre}</h1>
              <h1>{movie.language}</h1>
              <h1>{movie.rating}</h1>
              <button onClick={() => handleclick(movie._id)}>Delete</button>
              <button onClick={()=>Handleupdate(movie._id)}>Update</button>
            </div>
          );
        })}
      </div>
    );
  }


export default Getmovies;
