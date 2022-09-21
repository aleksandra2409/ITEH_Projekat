import { useLocation } from "react-router-dom";

export default function Header(props) {
  const location = useLocation();
  return (
    <div className="header">
      <div className="header__title">Movie App</div>
      {location.pathname === "/" && props?.user?.admin === 1 && (
        <div className="header__sort" onClick={() => props.setMovieModal(true)}>
          Create Movie
        </div>
      )}
      {location.pathname === "/" && (
        <div className="header__sort" onClick={() => props.handleSort()}>
          Sort
        </div>
      )}
    </div>
  );
}
