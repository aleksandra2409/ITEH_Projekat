import Modal from "react-modal";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

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
  const handleDeleteMovie = () => {};
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
            />
          </div>
          <div className="modal__row">
            <TextField
              id="outlined-basic"
              label="Genre"
              variant="outlined"
              required={true}
              fullWidth={true}
              sx={{
                marginTop: "30px",
              }}
              name="genre"
              onChange={handleInputValue}
            />
          </div>
          <div className="modal__row">
            <TextField
              id="outlined-basic"
              label="Producer"
              variant="outlined"
              required={true}
              fullWidth={true}
              sx={{
                marginTop: "30px",
              }}
              name="producer"
              onChange={handleInputValue}
            />
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
