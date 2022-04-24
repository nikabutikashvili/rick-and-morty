import { Character } from "../../store/rickAndMorty";
import styles from "./CharacterCard.module.css";

interface Props {
  character: Character;
  onClick: () => void;
}

const CharacterCard: React.FC<Props> = ({ character, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
    </div>
  );
};

export default CharacterCard;
