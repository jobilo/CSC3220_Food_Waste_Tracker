import { useState, useMemo, useCallback } from "react";
import * as SQLite from "expo-sqlite";

const useDBClient = () => {
  const [taskList, setTaskList] = useState([]);

  const db = useMemo(() => {
    return SQLite.openDatabase("tasker.db");
  }, []);

  const loadData = useCallback(async () => {
    const createTable = () => new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          const sqlCmd = `
        CREATE TABLE IF NOT EXISTS tasks
         (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)
        `;
          tx.executeSql(sqlCmd);
        },
        (err) => {
          reject(err);
        },
        () => {
          resolve();
        }
      );
    });
    const getTasksFromDB = () => new Promise((resolve, reject) => {
      let selectTasksResultSet;
      db.transaction(
        (tx) => {
          const sqlCmd = "SELECT id, task FROM tasks";
          tx.executeSql(sqlCmd, [], (_tx, resultSet) => {
            selectTasksResultSet = resultSet;
          });
        },
        (err) => {
          reject(err);
        },
        () => {
          resolve(selectTasksResultSet);
        }
      );
    });
    try {
      await createTable();
      const resultSet = await getTasksFromDB();
      setTaskList(resultSet.rows._array.map((row) => {
        return {
          id: row.id,
          text: row.task
        };
      }));
    } catch (e) {
      console.log(e);
    }
  }, [db]);

  const addTask = useCallback(
    async (taskText) => {
      const addTaskToDB = () => new Promise((resolve, reject) => {
        let insertTaskResultSet;
        db.transaction(
          (tx) => {
            const sqlCmd = `INSERT into tasks (task) VALUES (?)`;
            tx.executeSql(sqlCmd, [taskText], (_tx, resultSet) => {
              insertTaskResultSet = resultSet;
            }, (err) => {
              console.log(err);
            });
          },
          (err) => {
            reject(err);
          },
          () => {
            resolve(insertTaskResultSet);
          }
        );
      });
      const resultSet = await addTaskToDB();
      const newTask = {
        id: resultSet.insertId,
        text: taskText,
      };
      setTaskList((currentTaskList) => [...currentTaskList, newTask]);
    },
    [db]
  );

  const deleteTask = useCallback(
    async (id) => {
      const removeTaskFromDB = () => new Promise((resolve, reject) => {
        let deleteTaskResultSet;
        db.transaction(
          (tx) => {
            const sqlCmd = `DELETE FROM tasks WHERE id=?`;
            tx.executeSql(sqlCmd, [id], (_tx, resultSet) => {
              deleteTaskResultSet = resultSet;
            });
          },
          (err) => {
            reject(err);
          },
          () => {
            resolve(deleteTaskResultSet);
          }
        );
      });
      await removeTaskFromDB();
      setTaskList((currentTaskList) =>
        currentTaskList.filter((task) => task.id !== id)
      );
    },
    [db]
  );

  const api = useMemo(
    () => ({
      taskList,
      loadData,
      addTask,
      deleteTask,
    }),
    [taskList, loadData, addTask, deleteTask]
  );

  return api;
};

export default useDBClient;