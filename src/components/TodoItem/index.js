import styles from "./index.module.css";
import { CiCircleCheck } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";

import React, { useState } from "react";

function TodoItem({ details, setTrigger, update }) {
  const { id, work, ischecked } = details;
  const [loading, setLoading] = useState(false);
  console.log(id, work, ischecked);

  const deleteTodo = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://todoassignmentbackend.onrender.com/${id}`,
        {
          method: "DELETE",
        }
      );
      //   setTrigger((p) => !p);
      update();
      setLoading(false);
      if (!response.ok) {
        alert("Something Went Wrong");
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const updatedTodo = async () => {
    try {
      setLoading(true);
      await fetch(
        `https://todoassignmentbackend.onrender.com/${id}?ischecked=${!ischecked}`,
        {
          method: "PUT",
        }
      );
      //   setTrigger((p) => !p);
      update();
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      alert(`Something Went Wrong: ${error.message}`);
    }
  };

  return (
    <li className={styles.todoItem}>
      <button className={styles.checkButton} onClick={updatedTodo}>
        <CiCircleCheck size={24} color={ischecked ? "green" : "grey"} />
      </button>
      <p className={styles.todoText}>{work}</p>
      <button className={styles.checkButton} onClick={() => deleteTodo()}>
        {loading ? (
          <TailSpin width={30} height={30} color="red" />
        ) : (
          <MdDeleteOutline size={24} color="grey" className={styles.icon} />
        )}
      </button>
    </li>
  );
}

export default TodoItem;
