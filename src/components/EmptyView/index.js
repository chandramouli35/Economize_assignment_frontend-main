import styles from "./index.module.css";

const EmptyView = () => {
  return (
    <div className={styles.emptyView}>
      <img
        className={styles.emptyImage}
        src="no-data-image.webp"
        alt="Oops"
      />
      <h2>There is nothing to show you at this moment !!</h2>
    </div>
  );
};

export default EmptyView;
