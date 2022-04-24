import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CharacterCard from "../../components/CharacterCard";
import {
  getCharacters,
  RickAndMortySliceState,
  Character,
  clearCharacters,
} from "../../store/rickAndMorty";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rickAndMorty: RickAndMortySliceState = useSelector(
    (state: any) => state.rickAndMorty
  );
  useEffect(() => {
    dispatch(getCharacters() as any);
    return () => dispatch(clearCharacters() as any);
  }, [dispatch]);

  const handleCardClick = (id: number | string) => {
    navigate(`/characters/${id}`);
  };

  return (
    <div>
      <h1 className="main-title">The Rick And Morty Characters</h1>
      <div className={styles.innerWrapper}>
        {rickAndMorty?.characters.map((character: Character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
