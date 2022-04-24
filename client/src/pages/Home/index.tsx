import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CharacterCard from "../../components/CharacterCard";
import { api } from "../../configs/api";
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

  const favoriteToggle = async (id: number | string) => {
    await api.post(`rick-and-morty/characters/${id}/favorite`);
    dispatch(getCharacters() as any);
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
            favoriteToggle={favoriteToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
