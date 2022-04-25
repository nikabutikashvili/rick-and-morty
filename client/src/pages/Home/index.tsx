import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CharacterCard from "../../components/CharacterCard";
import LoaderWithApi from "../../components/LoaderWithApi";
import { api } from "../../configs/api";
import { logout } from "../../store/auth";
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
  const [loading, setLoading] = useState<boolean>(true);
  const rickAndMorty: RickAndMortySliceState = useSelector(
    (state: any) => state.rickAndMorty
  );
  useEffect(() => {
    dispatch(getCharacters() as any);
    return () => dispatch(clearCharacters() as any);
  }, [dispatch]);

  useEffect(() => {
    if (rickAndMorty.characters) {
      cacheImages(rickAndMorty.characters, () => setLoading(false));
    }
  });

  const cacheImages = async (characters: Character[], callBack: () => void) => {
    const promises = await characters.map((character) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = character.image;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    });
    await Promise.all(promises);
    callBack();
  };

  const handleCardClick = (id: number | string) => {
    navigate(`/characters/${id}`);
  };

  const favoriteToggle = async (id: number | string) => {
    await api.post(`rick-and-morty/characters/${id}/favorite`);
    dispatch(getCharacters() as any);
  };

  const handleLogout = (): void => {
    dispatch(logout() as any);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <button className="button-1" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <h1 className="main-title">The Rick And Morty Characters</h1>
      <LoaderWithApi
        load={loading}
        render={() => (
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
        )}
      />
    </div>
  );
};

export default Home;
