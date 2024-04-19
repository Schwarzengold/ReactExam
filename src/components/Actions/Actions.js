import styles from "./Actions.module.css";

const Actions = (props) => {
  return (
    <div className={`card card-body my-3 ${styles.shadow} ${styles.bg} ${styles.botconts}`}>
      <div className={styles.center}>
      <button className={`btn btn-primary ${styles.button1}`} onClick={props.onRemoveDone}>Delete done tasks</button>
      <button className={`btn btn-primary ${styles.button1}`} onClick={props.onRemoveAll}>Delete all tasks</button>
      </div>
    </div>
  );
};

export default Actions;
