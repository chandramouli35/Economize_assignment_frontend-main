import React, { useEffect, useState, useMemo } from "react";

import styles from "./index.module.css";
import TodoItem from "../TodoItem";
import { MdErrorOutline } from "react-icons/md";
import EmptyView from "../EmptyView";
import AddTaskForm from "../AddTaskForm";
import TodoSkelton from "../TodoSkelton";

const apiStatusConstant = {
  initial: "INITIAL",
  inprogress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function TodoApp() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(apiStatusConstant.initial);
  const [activeTab, setActiveTab] = useState(0);
  const [trigger, setTrigger] = useState(true);
  const [incompltedTask, setInCompletedTask] = useState("");

  const date = useMemo(() => new Date(), []);

  const update = async () => {
    (async function () {
      const response = await fetch("https://todoassignmentbackend.onrender.com");
      if (response.ok) {
        const resData = await response.json();
        setData(resData);
      }
    })();
  };

  useEffect(() => {
    const result = data.filter((e) => e.ischecked === false);
    console.log(result.length);
    setInCompletedTask(result.length);
  }, [data]);

  useEffect(() => {
    (async function () {
      try {
        setStatus(apiStatusConstant.inprogress);

        const response = await fetch("https://todoassignmentbackend.onrender.com");
        const resData = await response.json();
        if (response.ok) {
          setData(resData);
          setStatus(apiStatusConstant.success);
        } else {
          console.log(response);
          setStatus(apiStatusConstant.failure);
        }
      } catch (error) {
        setStatus(apiStatusConstant.failure);
        console.log(error);
      }
    })();
  }, [trigger]);

  const getView = () => {
    console.log(status);
    switch (status) {
      case apiStatusConstant.inprogress:
        const ls = [1, 2, 3, 4];
        return ls.map((each) => <TodoSkelton key={crypto.randomUUID()} />);
      case apiStatusConstant.failure:
        return (
          <div className={styles.errorView}>
            <MdErrorOutline size={44} />
            <p>Oops! Somthing Went Wrong</p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => setTrigger((p) => !p)}>
              Retry
            </button>
          </div>
        );
      case apiStatusConstant.success:
        const m = data.filter((e) => e.ischecked === Boolean(activeTab));
        console.log(m);
        const result = data
          .filter((e) => e.ischecked === Boolean(activeTab))
          .map((each) => (
            <TodoItem
              update={update}
              setTrigger={setTrigger}
              details={each}
              key={crypto.randomUUID()}
            />
          ));
        return result.length === 0 ? <EmptyView /> : result;
      default:
        return null;
    }
  };

  return (
    <div className={styles.todoApp}>
      <header className={styles.header}>
        <h1>TodoList</h1>
      </header>
      <nav className={styles.navbar}>
        <h3 className={styles.date}>
          Date: {date.getDate()} {month[date.getMonth()]} {date.getFullYear()}
        </h3>
        <div className={styles.tabBox}>
          <button
            onClick={() => setActiveTab(0)}
            type="button"
            className={
              activeTab === 0 ? styles.activeTabButton : styles.tabButton
            }>
            Incomplete Tasks{" "}
            {incompltedTask !== 0 && (
              <p className={styles.badge}>{incompltedTask}</p>
            )}
          </button>
          <button
            onClick={() => setActiveTab(1)}
            type="button"
            className={
              activeTab === 1 ? styles.activeTabButton : styles.tabButton
            }>
            Completed Tasks
          </button>
        </div>
      </nav>{" "}
      <AddTaskForm update={update} />
      <h3 className={styles.taskHead}>Your Tasks</h3>
      <ul className={styles.todoListContainer}>{getView()}</ul>
    </div>
  );
}

export default TodoApp;
