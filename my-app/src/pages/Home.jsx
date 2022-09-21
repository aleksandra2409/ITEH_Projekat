import MovieBox from "../components/MovieBox";

export default function Home(props) {

  return (
    <>
      <div className="movies">
        {props.movies?.map((movie, index) => {
          return (
            <MovieBox movie={movie} key={index} openMovieModal ={props.openMovieModal } />
          );
        })}
      </div>
    </>
  );
}
