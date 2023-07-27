import React, { useContext, useEffect, useState } from 'react'

import { context } from '../index'
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import TodoItem from './TodoItem';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Home() {
    const {isAuthenticated} = useContext(context);
  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [task , setTask] = useState([]);
  const [added , setAdded] = useState(false);
  const nav = useNavigate()

  useEffect(() => {
    if(isAuthenticated === false)
  {
    console.log(isAuthenticated)
    nav("/login")
  }
  })
  

  const clickHandler = async(id) => {
      const res = await axios.delete(`https://nodejs-todoapp-9lze.onrender.com/tasks/${id}`)
      getTask();
      
  }

  const getTask = async function f()
  {
  const response = await axios.get("https://nodejs-todoapp-9lze.onrender.com/tasks/gettask" , {
    withCredentials : true,
  })
  setTask(response.data.allTasks)
  toast.success(response.data.message)
}
    useEffect(()=>{
      async function f()
      {
      const response = await axios.get("https://nodejs-todoapp-9lze.onrender.com/tasks/gettask" , {
        withCredentials : true,
      })
      setTask(response.data.allTasks)
    }
    f();

    },[added])

    const submitHandler = async (event) => {
      event.preventDefault();
        const response =  await axios.post(
          "https://nodejs-todoapp-9lze.onrender.com/tasks/newtask",
          {
            title,
            description,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
  
        console.log(response)
        toast.success(response.data.message)
        setAdded(added => !added)
      
    };


    const checkHandler =async (id)=>{
      try {
          const response = await axios.put(`https://nodejs-todoapp-9lze.onrender.com/tasks/${id}`,{},{
            withCredentials : true,
          })
          console.log(response.data.task)
          toast.success(response.data.message)
          setAdded(added => !added)
      } catch (error) {
        console.log(error)
      }
    
    }
  return isAuthenticated === true ? 
  <div className="home">
    <div className="task-form">
    <form method='post'  onSubmit={submitHandler}>
      <input type="text" name='title' id='title' placeholder='Title for your task' value={title}  onChange={(e) => setTitle(e.target.value) }/>
      <input type="text" name='description' placeholder='Describe your task' id='descp' value={description} onChange={(e) => setDescription(e.target.value) }/>
      <button type="submit">ADD TASK</button>
    </form>
    </div>

    {task &&  task.map((val)=> {
      return <TodoItem title={val.title} description={val.description} isCompleted={val.isCompleted} id={val._id} key={val._id} checkHandler={checkHandler} clickHandler={clickHandler}/>
    })}
    </div> : <div className="home"><h1>Login First</h1></div>
   
  
}

export default Home
