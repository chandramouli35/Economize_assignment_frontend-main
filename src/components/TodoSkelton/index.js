import styles from "./index.module.css";

export default function TodoSkelton (){
    return (
        <div className={styles.todoItem}>
            <div className={styles.check}></div>
            <div className={styles.para}></div>
            <div className={styles.btn}></div>
        </div>
    )
}