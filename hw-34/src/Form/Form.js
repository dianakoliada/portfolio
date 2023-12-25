import './Form.css';

const Form = ({ setTodoList }) => {

   const onSubmitHandler = (e) => {
      e.preventDefault();

      const todoText = e.target.elements.input.value;
      const todoId = new Date().getTime();

      setTodoList(prevTodoList => [...prevTodoList, { id: todoId, text: todoText }]);
      e.target.reset();
   }

   return (
      <form className="input-group" onSubmit={onSubmitHandler}>
         <input type="text" id="input" className="input" required autoComplete="off" name="input" />
         <label htmlFor="text" className="label">Enter task</label>
         <button className="btn" type="submit">Add</button>
      </form>
   )
}

export default Form;