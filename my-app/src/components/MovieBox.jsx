export default function MovieBox(props) {
  return (
    <div className="movie__box" onClick={() => props.openMovieModal(props.movie)}>
      <div className="movie__title">{props.movie.name}</div>
      <div className="movie__genre">{props.movie.genre.name}</div>
      <div className="movie__year">{props.movie.year}</div>
      <div className="movie__description">{props.movie.description}</div>
    </div>
  );
}
