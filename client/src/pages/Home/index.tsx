import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CharacterCard from "../../components/CharacterCard";
import {
  getCharacters,
  RickAndMortySliceState,
  Character,
  getCharacter,
} from "../../store/rickAndMorty";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const rickAndMorty: RickAndMortySliceState = useSelector(
    (state: any) => state.rickAndMorty
  );
  useEffect(() => {
    dispatch(getCharacters() as any);
  }, [dispatch]);

  const handleCardClick = (id: number) => {
    dispatch(getCharacter(id) as any);
  };

  return (
    <div>
      <h1 className="main-title">The Rick And Morty Characters</h1>
      <div className="cards">
        {rickAndMorty.characters.map((character: Character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => handleCardClick(character.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
