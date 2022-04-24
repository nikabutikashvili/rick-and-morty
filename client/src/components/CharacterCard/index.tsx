import { Character } from "../../store/rickAndMorty";
import styles from "./CharacterCard.module.css";

interface Props {
  character: Character;
  onClick?: (id: number | string) => void;
}

const CharacterCard: React.FC<Props> = ({ character, onClick }) => {
  return (
    <div
      className={styles.card}
      onClick={() => {
        if (typeof onClick === "function") {
          onClick(character.id);
        }
      }}
    >
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
    </div>
  );
};

export default CharacterCard;
