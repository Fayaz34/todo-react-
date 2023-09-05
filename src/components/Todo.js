import React from 'react'
import './Todo.css'
import {useState ,useRef,useEffect} from 'react'
 import {MdDelete} from 'react-icons/md'
import {FaEdit} from 'react-icons/fa'
import {MdOutlineDownloadDone} from 'react-icons/md'



function Todo() {
    const[todoIn , setTodoIn] = useState('')
    const [toData , setToData] = useState([])
    const [editId,setEditId] =useState(0)
    
    const handleSubmit = (e) =>(
        e.preventDefault()
    )


    const addTodo = () =>{
      if(todoIn !== ''){
        setToData(prevSetToData => [...prevSetToData,{list:todoIn, id : Date.now(),status:false}])
        setTodoIn('')
      }
      if(editId){
        const editTod = toData.find((todo)=>todo.id === editId)
        const updateTod = toData.map((to)=>to.id === editTod.id
        ?(to ={id : to.id , list : todoIn})
        :(to ={id:to.id ,list: to.list}))
        setToData(updateTod)
        setEditId(0)
        setTodoIn('')
      }
    }
    const inputRaf = useRef('null')

    useEffect(() =>{
        inputRaf.current.focus()
    })
    const onDelete = (id) => {
            setToData(toData.filter((to) => to.id !== id))
    }

    const oncomplete = (id) =>{
      let complete = toData.map((list)=>{
        if(list.id === id){
            return({...list,status:!list.status})
        }
        return list
      })
      setToData(complete.list)
    }

    const onEdit = (id) =>{
        const editTodo = toData.find((to)=> to.id === id)
        setTodoIn(editTodo.list)
        setEditId(editTodo.id)
    } 
    
  return (
    <div className='container'>
        <h2 className='todo-h'>TODO APP</h2>
        <form className='todo-from' onSubmit={handleSubmit}>
            <input type="text"placeholder='enter your todo' ref={inputRaf} className='form-control' value={todoIn} onChange={(e) => setTodoIn(e.target.value)}/>
            <button className='todo-btn' onClick={addTodo}>
            {editId ? "EDIT":"ADD"} 
            </button>
        </form>
        <div className='list'>
            <ul>
                {
                    toData.map((to) => (
                        <li >
                            <div id={to.status ? 'list-done' : ''}>{to.list}</div>
                            <span className='todo-ic'>
                                <MdOutlineDownloadDone className='list-item' id='done-ic'onClick={() =>oncomplete(to.id)} />
                                <FaEdit className='list-item' id='edit-ic' onClick={()=>onEdit(to.id)} />
                                <MdDelete className='list-item' id='delete-ic' onClick={()=>onDelete(to.id)}  />
                            </span>
                        </li>
                         

                    )) 
                }
            </ul>
        </div>
    </div>
  )
}

export default Todo