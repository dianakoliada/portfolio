import './List.css';
import ListItem from '../ListItem/ListItem';

const List = ({ todoList, setTodoList, onTaskDeleteHandler }) => {
   return (
      <ul className='list-items'>
         <ListItem todoList={todoList} setTodoList={setTodoList} onTaskDeleteHandler={onTaskDeleteHandler} />
      </ul>
   )
};

export default List;