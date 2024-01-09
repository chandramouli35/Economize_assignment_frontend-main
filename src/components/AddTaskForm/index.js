import { useState } from "react";

import styles from "./index.module.css";
import { TailSpin } from "react-loader-spinner";


const AddTaskForm = ({ update }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const addTask = async (e) => {
    setErr("");
    setLoading(true);
    try {
      e.preventDefault();
      const response = await fetch("https://todoassignmentbackend.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ work: inputText }),
      });
      if (!response.ok) {
        setErr("Something Went Wrong");
        return;
      }
      setInputText("");
      update();
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className={styles.inputBox} onSubmit={addTask}>
      <input
        placeholder="Enter a task ..."
        type="text"
        className={styles.input}
        value={inputText}
        required
        onChange={(e) => setInputText(e.target.value)}
      />
      {
        <button type="submit" disabled={loading} className={styles.addButton}>
          {loading ? (
            <TailSpin
              className={styles.spinner}
              width={24}
              height={24}
              color="red"
            />
          ) : err ? (
            "Retry"
          ) : (
            "Add Task"
          )}
        </button>
      }
    </form>
  );
};

export default AddTaskForm;
