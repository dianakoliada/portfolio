import { useState } from 'react';
import './App.css';
import List from './List/List';
import Form from './Form/Form';

function App() {
   const [todoList, setTodoList] = useState([]);

   const onTaskDeleteHandler = (taskId) => {
      const updatedList = todoList.filter((task) => task.id !== taskId);
      setTodoList(updatedList);
   }

   return (
      <div className="App">
         <h1 className='title'>Todo List</h1>
         <List todoList={todoList} setTodoList={setTodoList} onTaskDeleteHandler={onTaskDeleteHandler} />
         <Form setTodoList={setTodoList} />
      </div>
   );
}

export default App;
