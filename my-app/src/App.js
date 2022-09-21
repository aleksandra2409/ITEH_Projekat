import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Genres from "./pages/Genres";
import Producers from "./pages/Producers";
import Login from "./pages/Login";
import AddMovieModal from "./components/AddMovieModal";

function App() {
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [producers, setProducers] = useState([]);
  const [user, setUser] = useState({});

  const [movieModal, setMovieModal] = useState(false);

  const [error, setError] = useState(false);
  const [errorType, setErrorType] = useState("");

  const [token, setToken] = useState("");

  const [loginEmail, setLoginEmail] = useState([""]);
  const [loginPassword, setLoginPassword] = useState([""]);

  const [sortDirection, setSortDirection] = useState("desc");

  const location = useLocation();

  useEffect(() => {
    token === "" && navigate("/login");
    callMovies();
    callGenres();
    callProducers();
  }, []);

  useEffect(() => {
    if (user.admin === 0) {
      const filteredMovies = movies.filter((movie) => {
        return movie.user.id === user.id;
      });
      console.log(filteredMovies);
      setMovies(filteredMovies);
    }
  }, [user]);

  let navigate = useNavigate();

  const openMovieModal = (movie) => {
    setMovie(movie);
    setMovieModal(true);
  };

  const callMovies = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/movies")
      .then(function (response) {
        const data = response.data.movies;
        setMovies(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const callGenres = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/genres")
      .then(function (response) {
        const data = response.data;
        setGenres(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const callProducers = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/producers")
      .then(function (response) {
        const data = response.data;
        setProducers(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSort = () => {
    let sortedMovies;
    if (sortDirection === "desc") {
      sortedMovies = [...movies].sort((a, b) => a.year - b.year);
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      sortedMovies = [...movies].sort((a, b) => b.year - a.year);
      setSortDirection("desc");
    }

    setMovies(sortedMovies);
  };

  const handleLogout = () => {
    console.log("asd", token);
    axios
      .post("http://127.0.0.1:8000/api/logout", "", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function () {
        setToken("");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    setError(false);
    setErrorType("");
    let bodyData = {
      email: loginEmail,
      password: loginPassword,
    };
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(bodyData.email)) {
      setError(true);
      setErrorType("email");
    } else if (bodyData.password.length < 8) {
      setError(true);
      setErrorType("password");
    } else {
      axios
        .post("http://127.0.0.1:8000/api/login", bodyData)
        .then(async function (response) {
          const data = await response.data;
          setToken(data.access_token);
          callUserData(data.access_token);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
          setError(true);
          setErrorType("unauthorized");
        });
      setError(false);
      setErrorType("");
    }
  };

  const callUserData = async (accessToken) => {
    console.log("asd");
    await axios
      .get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        const data = response.data;
        setUser(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addMovie = (movieData) => {
    console.log(movieData)
    if (movieData.name === "") {
      setError(true);
      setErrorType("name");
    } else if (movieData.description === "") {
      setError(true);
      setErrorType("description");
    } else if (movieData.year === "") {
      setError(true);
      setErrorType("year");
    } else if (movieData.genre_id === "") {
      setError(true);
      setErrorType("genre");
    } else if (movieData.producer_id === "") {
      setError(true);
      setErrorType("producer");
    } else {
      axios
        .post("http://127.0.0.1:8000/api/movies", movieData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          setMovieModal(false);
          setError(false);
          callMovies();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const updateMovie = (movieData) => {
    if (movieData.name === "") {
      setError(true);
      setErrorType("name");
    } else if (movieData.description === "") {
      setError(true);
      setErrorType("description");
    } else if (movieData.year === "") {
      setError(true);
      setErrorType("year");
    } else if (movieData.genre_id === "") {
      setError(true);
      setErrorType("genre");
    } else if (movieData.producer_id === "") {
      setError(true);
      setErrorType("producer");
    } else {
      axios
        .put("http://127.0.0.1:8000/api/movies/" + movie.id, movieData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          setMovieModal(false);
          setError(false);
          callMovies();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const deleteMovie = () => {
    axios
      .delete("http://127.0.0.1:8000/api/movies/" + movie.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setMovieModal(false);
        setError(false);
        callMovies();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {location.pathname !== "/login" ? (
        <Header
          handleSort={handleSort}
          setMovieModal={setMovieModal}
          user={user}
        />
      ) : null}
      {location.pathname !== "/login" ? (
        <Navbar handleLogout={handleLogout} user={user} />
      ) : null}
      {movieModal === true && (
        <AddMovieModal
          movie={movie}
          setMovie={setMovie}
          movieModal={movieModal}
          setMovieModal={setMovieModal}
          addMovie={addMovie}
          updateMovie={updateMovie}
          deleteMovie={deleteMovie}
          genres={genres}
          producers={producers}
          error={error}
          errorType={errorType}
          setError={setError}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            token !== "" && (
              <Home movies={movies} openMovieModal={openMovieModal} />
            )
          }
        />
        <Route path="/genres" element={<Genres genres={genres} />} />
        <Route
          path="/producers"
          element={<Producers producers={producers} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setLoginEmail={setLoginEmail}
              setLoginPassword={setLoginPassword}
              handleSubmit={handleSubmit}
              error={error}
              errorType={errorType}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
