import { Character } from "../../store/rickAndMorty";

interface Props {
  character: Character;
  onClick: () => void;
}

const CharacterCard: React.FC<Props> = ({ character, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h2>Name: {character.name}</h2>
      <img src={character.image} alt={character.name} />
    </div>
  );
};

export default CharacterCard;
