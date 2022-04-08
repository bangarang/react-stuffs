import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { useFetch } from "./useFetch";
import { useWindowSize } from "./useWindowSize";
import { Routes, Route, Link, useParams } from "react-router-dom";

const Square = () => {
  const [color, setColor] = useState<string>();

  useEffect(() => {
    setColor(Math.floor(Math.random() * 16777215).toString(16));
  }, []);

  return (
    <div style={{ background: `#${color}`, height: `50px`, width: `50px` }} />
  );
};

const Film = () => {
  let { filmId } = useParams();
  const [loading, setLoading] = useState(false);

  const res = useFetch(`https://swapi.dev/api/films/${filmId}/`, {});

  useEffect(() => {
    setLoading(true);
  }, [filmId]);

  useEffect(() => {
    if (res.response) {
      setLoading(false);
    }
  }, [res.response]);

  if (loading) {
    return <div>Loading...</div>;
  }
  // @ts-ignore
  return <h2>{res.response?.title}</h2>;
};

const Starship = () => {
  let { starshipId } = useParams();
  const res = useFetch(`https://swapi.dev/api/starships/${starshipId}/`, {});
  if (!res.response) {
    return <div>Loading...</div>;
  }
  console.log({ res });

  // @ts-ignore
  return <h2>{res.response.name}</h2>;
};

const Cards = [{ title: "Example" }];
const style = { margin: "50px;" };
const App = () => {
  return (
    <div className="App" style={style}>
      <header className="App-header">
        {[1, 2, 3, 4, 5, 6].map((film) => (
          <Link key={"film" + film} to={`films/${film}`}>
            Film #{film}
          </Link>
        ))}
        {[1, 2, 3, 4, 5, 6].map((a) => (
          <Link key={"starship" + a} to={`starships/${a}`}>
            Starship #{a}
          </Link>
        ))}
      </header>
      {routes}
    </div>
  );
};

const routes = () => (
  <Routes>
    <Route path="/films/:filmId" element={<Film />} />
    <Route path="/starships/:starshipId" element={<Starship />} />
  </Routes>
);

export default App;
