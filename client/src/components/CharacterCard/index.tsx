import { Character } from "../../store/rickAndMorty";
import styles from "./CharacterCard.module.css";
import FavouriteIcon from "../../assets/images/favorite.svg";
import FullFavoriteIcon from "../../assets/images/favorite-full.svg";

interface Props {
  character: Character;
  onClick?: (id: number | string) => void;
  favoriteToggle?: (id: number | string) => void;
}

const CharacterCard: React.FC<Props> = ({
  character,
  onClick,
  favoriteToggle,
}) => {
  return (
    <div>
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
      <div className={styles.iconWrapper}>
        <img
          src={character.isFavorited ? FullFavoriteIcon : FavouriteIcon}
          className={styles.icon}
          alt="icon"
          onClick={() => {
            if (typeof favoriteToggle === "function") {
              favoriteToggle(character.id);
            }
          }}
        />
      </div>
    </div>
  );
};

export default CharacterCard;
