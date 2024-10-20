import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./toDoList.styles.css";

export default () => {
  const storageName = "toDoListItems";
  const MIN_TODO_LENGTH = 5;

  const storageData = JSON.parse(localStorage.getItem(storageName));
  let toDoListItems = storageData || [];

  const [toDoList, setToDoList] = useState(toDoListItems);

  const itemButtonsClickedHandler = (event) => {
    event.stopPropagation();

    const id = event.target.parentElement.id;

    if (event.target.className === "todo-item__delete") {

    const newToDoList = toDoList.filter(task => task.id !== id);
    setToDoList(newToDoList);
    localStorage.setItem(storageName, JSON.stringify(newToDoList));
    }
    else {
      return;
    }  
  }

  const onCheckboxChanged = (event) => {
    const id = event.target.parentElement.id;
    const newToDoList = toDoList.filter(task => {
      if (task.id === id) {
        event.target.checked ? task.checked = true : task.checked = false;
      }
      return task;
    });
    setToDoList(newToDoList);
    localStorage.setItem(storageName, JSON.stringify(newToDoList));
  }

  const onSubmit = ({newToDoItemText}, formikBag) => {
    const task = {
      id: "id_" + Date.now(),
      text: newToDoItemText.trim(),
      checked: false,
    }

    const newToDoList = [...toDoList, task];
    setToDoList(newToDoList);
    localStorage.setItem(storageName, JSON.stringify(newToDoList));
    formikBag.resetForm();
  }

  const validate = ({newToDoItemText}) => {
    const errors = {};
    if (!newToDoItemText.trim()) {
      errors.newToDoItemText = "Task can't be empty";
      return errors; 
    }

    if (newToDoItemText.trim().length < MIN_TODO_LENGTH) {
      errors.newToDoItemText = "Task length can't be less than 5 characters";
      return errors;   
    }

    return errors;
  }

  return (
    <>
      <div className="container">
        <h1>ToDoList</h1>
        <Formik initialValues={{newToDoItemText: ''}} onSubmit={onSubmit} validate={validate} >
          <Form className="form">
            <Field type="text" name="newToDoItemText" className="form__input" placeholder="Type your ToDo task here"/>
            <ErrorMessage name="newToDoItemText" component="div" className="new_text_error"/>
            <button type="submit" className="form__btn">Add task</button>
          </Form>
        </Formik>
        <ul className="js--todos-wrapper" onClick={itemButtonsClickedHandler}>
          {toDoList.map((toDoItem) => (
            <li key={toDoItem.id} id={toDoItem.id} className="todo-item">
              <input type="checkbox" className="todo-item__checkbox" checked={toDoItem.checked} onChange={onCheckboxChanged}/>
              <span className={`todo-item__description ${toDoItem.checked ? 'todo-item--checked' : ''}`}>{toDoItem.text}</span>
              <button className="todo-item__delete">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
