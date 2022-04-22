import React from "react";
import styles from "../../styles/LoaderWithApi.module.css";

interface Props {
  load: boolean;
  render: () => JSX.Element;
}

const LoaderWithApi: React.FC<Props> = ({ load, render }) => {
  return (
    <>
      {load ? (
        <div className={styles["lds-ripple"]}>
          <div></div>
          <div></div>
        </div>
      ) : (
        render()
      )}
    </>
  );
};

export default LoaderWithApi;
