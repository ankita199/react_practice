import React, {useState,Fragment,useRef} from 'react';
import Card from '../../UI/Card/Card.js'
import Button from '../../UI/Button/Button.js'
import ErrorModal from '../../UI/ErrorModal/ErrorModal.js'
// import Wrapper from '../../Helpers/Wrapper.js'
import classes from './AddUser.module.css'

const AddUser = (props) => {
  const usernameRef = useRef();
  const ageRef = useRef();
  const [error, setError] = useState();
  const addUserHandler =(event) =>{
    event.preventDefault();
    const enteredUsername = usernameRef.current.value
    const enteredAge = ageRef.current.value
    if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
      setError({
        title: "Invalid input",
        message: 'Please enter a valid name and age (non-empty values).'
      })
      return;
    }
    if (+enteredAge < 1){
      setError({
        title: "Invalid age",
        message: 'Please enter a valid age (> 0).'
      })
      return;
    }
    props.onAddUser(enteredUsername,enteredAge);
  };
  const errorHandler = () => {
    setError(null)
  }
  return(
    <Fragment>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={usernameRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageRef}/>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  )
}

export default AddUser;