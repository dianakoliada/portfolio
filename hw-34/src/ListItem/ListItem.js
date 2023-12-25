import './ListItem.css';

const ListItem = ({ todoList, onTaskDeleteHandler }) => {

   return (
      todoList.map((item) => (
         <div className='list-item-wrap' key={item.id}>
            <li className='list-item'>{item.text}</li>
            <button className='btn btn-del' onClick={() => onTaskDeleteHandler(item.id)}>Delete</button>
         </div>
      ))
   )
};

export default ListItem;