import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Addmovie() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [rating, setRating] = useState("");
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (id !== "undefined") {
      fetch("http://localhost:4000/getmovies/", {
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
        //   setMovies(data);
          data.map((movie) => {
            if (movie._id === id) {
              setTitle(movie.title);
              setGenre(movie.genre);
              setLanguage(movie.language);
              setRating(movie.rating);
            }
          });
        });
    }
  }, [id]);

  const handleclick = () => {
    if (id === "undefined") {
      try {
        fetch("http://localhost:4000/movies", {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            genre: genre,
            language: language,
            rating: rating,
          }),
        }).then((data) => {
          console.log(data);
        });

        setTitle("");
        setGenre("");
        setLanguage("");
        setRating("");
      } catch (err) {
        console.log(err);
      }
    }
    else {
        fetch("http://localhost:4000/movies/" + id, {
            method: "PUT",
            headers: {
              "Access-Control-Allow-Origin": true,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              genre: genre,
              language: language,
              rating: rating,
            }),
          }).then((data) => {
            console.log(data);
          });
    }


    navigate("/");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      {id!="undefined"?<button onClick={handleclick}>Update</button>:<button onClick={handleclick}>Add</button>}
    </div>
  );
}

export default Addmovie;
