import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import LoaderWithApi from "../../components/LoaderWithApi";
import {
  clearCharacter,
  getCharacter,
  RickAndMortySliceState,
} from "../../store/rickAndMorty";
import styles from "./CharacterDetails.module.css";

const CharacterDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rickAndMorty: RickAndMortySliceState = useSelector(
    (state: any) => state.rickAndMorty
  );
  const { character, status } = rickAndMorty;

  useEffect(() => {
    if (id) {
      dispatch(getCharacter(id) as any);
    }
    return () => dispatch(clearCharacter() as any);
  }, [id, dispatch]);

  const hanldeBack = (): void => {
    navigate("/");
  };

  return (
    <div>
      <button className="button-1" onClick={hanldeBack}>
        Go back to Characters
      </button>
      <LoaderWithApi
        load={status === "loading"}
        render={() => (
          <div className={styles.innerWrapper}>
            <div>
              <h1> {character?.name}</h1>
              <img src={character?.image} alt="Character" />
            </div>
            <div>
              <p>Status: {character?.status}</p>
              <p>Species: {character?.species}</p>
              <p>Gender: {character?.gender}</p>
              <p>Origin: {character?.origin?.name}</p>
              <p>Location: {character?.location?.name}</p>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CharacterDetails;
