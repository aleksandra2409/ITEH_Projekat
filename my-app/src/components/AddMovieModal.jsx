import Modal from "react-modal";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import MenuItem from "@mui/material/MenuItem";

export default function AddMovieModal(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [genreId, setGenreId] = useState("");
  const [producerId, setProducerId] = useState("");

  useEffect(() => {
    if (props.movie !== null) {
      setName(props.movie.name);
      setDescription(props.movie.description);
      setYear(props.movie.year);
      setGenreId(props.movie.genre.id);
      setProducerId(props.movie.producer.id);
    }
  }, []);

  const handleInputValue = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "description") {
      setDescription(event.target.value);
    } else if (event.target.name === "year") {
      setYear(event.target.value);
    } else if (event.target.name === "genre") {
      setGenreId(event.target.value);
    } else if (event.target.name === "producer") {
      setProducerId(event.target.value);
    }
  };
  const handleCloseModal = () => {
    props.setMovieModal(false);
    props.setMovie(null);
    props.setError(false)
  };
  const handleAddMovie = () => {
    let bodyData = {
      name: name,
      description: description,
      year: year,
      genre_id: genreId,
      producer_id: producerId,
    };
    props.addMovie(bodyData);
  };
  const handleUpdateMovie = () => {
    let bodyData = {
      name: name,
      description: description,
      year: year,
      genre_id: genreId,
      producer_id: producerId,
    };
    props.updateMovie(bodyData);
  };
  const handleDeleteMovie = () => {
    props.deleteMovie();
  };
  return (
    <div>
      <Modal
        closeTimeoutMS={300}
        isOpen={props.movieModal}
        className={"add-modal"}
        shouldCloseOnOverlayClick={true}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: "rgba(50, 50, 50, 0.30)",
            zIndex: 29,
          },
        }}
        ariaHideApp={false}
      >
        <div className="modal__header">
          {props.movie === null ? "Add Movie" : "Edit Movie"}
        </div>
        <div className="modal__data">
          <div className="modal__row">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required={true}
              fullWidth={true}
              sx={{
                marginTop: "30px",
              }}
              name="name"
              value={name}
              onChange={handleInputValue}
              error={props.error && props.errorType === "name"}
            />
          </div>
          <div className="modal__row">
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              required={true}
              fullWidth={true}
              sx={{
                marginTop: "30px",
              }}
              name="description"
              value={description}
              onChange={handleInputValue}
              error={props.error && props.errorType === "description"}
            />
          </div>
          <div className="modal__row">
            <TextField
              id="outlined-basic"
              label="Year"
              variant="outlined"
              required={true}
              fullWidth={true}
              sx={{
                marginTop: "30px",
              }}
              name="year"
              value={year}
              onChange={handleInputValue}
              error={props.error && props.errorType === "year"}
            />
          </div>
          <div className="modal__row">
            <FormControl
              sx={{ marginTop: "30px" }}
              fullWidth={true}
              error={props.error && props.errorType === "genre"}
            >
              <InputLabel id="demo-simple-select-required-label ">
                Genre
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-helper"
                value={genreId}
                label="Genre"
                required={true}
                fullWidth={true}
                name="genre"
                onChange={handleInputValue}
              >
                {props.genres.map((genre) => {
                  return (
                    <MenuItem value={genre.id} key={genre.id}>
                      <em>{genre.name}</em>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="modal__row">
            <FormControl
              sx={{ marginTop: "30px" }}
              fullWidth={true}
              error={props.error && props.errorType === "producer"}
            >
              <InputLabel id="demo-simple-select-required-label ">
                Producers
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-helper"
                value={producerId}
                label="Producers"
                required={true}
                fullWidth={true}
                name="producer"
                onChange={handleInputValue}
              >
                {props.producers.map((producer) => {
                  return (
                    <MenuItem value={producer.id} key={producer.id}>
                      <em>{producer.name}</em>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="modal__footer">
            {props.movie !== null ? (
              <div
                className="delete__button"
                onClick={() => handleDeleteMovie()}
              >
                Delete
              </div>
            ) : null}
            <div
              className="save__button"
              onClick={() =>
                props.movie === null ? handleAddMovie() : handleUpdateMovie()
              }
            >
              Save
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
