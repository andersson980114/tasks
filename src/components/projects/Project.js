import React,{useState, useEffect} from 'react';
import shortid from "shortid";
import firebase, { db } from "../../firebase"
import {collection, getDocs, getDoc, query, doc,  addDoc, deleteDoc, updateDoc, where, orderBy} from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DatePicker } from '@material-ui/pickers';
import NavigateBar from '../NavigateBar';
import { isEmpty } from '@firebase/util';

export function Project () {
    const params = useParams()
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState(null);
    const [update, setUpdate] = useState("");
    const [uid, setUid] = useState("");
    const [edit, setEdit] = useState(false);
    const [namePro, setNamePro] = useState("")
    const [priority, setPriority] = useState(1)
    const [errorPriority, setErrorPriority] = useState("")
    const [date, setDate] = useState(new Date()) 
    const [state, setState] = useState(false)
    const [taskEmpty, setTaskEmpty] = useState("")

    const createTask = async (e) =>{
        e.preventDefault() 
        if(!isEmpty(task)){
            await addDoc(collection(db, 'tasks'), { id: shortid.generate(), projectId: params.projectId, priority:priority, date:date ,name: task, state:state });
            setTask("");
            setDate(new Date());
            setPriority(1); 
            getTasks();
            
        }else{
            setTaskEmpty("Por favor llenar los campos")
        }
    };
    
    useEffect (() => {
        
        getTasks();
        getProyect();
    }, [])

    const getProyect = async() =>{
        const pro = await getDoc(doc(db, 'projects', params.projectId));
        setNamePro(pro.data().name) 
    }
     
     const getTasks = async () =>{ 
         const taskRef = collection(db, "tasks");
         const q = query(taskRef, where("projectId", "==", params.projectId), orderBy("priority"));
         const result = await getDocs(q);
         setTasks(result.docs) 
     }
     

    const deleteTask = async (id) =>{ 
        await deleteDoc(doc(db, 'tasks', id));
        getTasks()
    }

    const updateTask = async (id) =>{
         
        setEdit(true)
        const result = await getDoc(doc(db, 'tasks', id)); 
        console.log(result.data().name)
        setUpdate(result.data().name)
        setPriority(result.data().priority)
        setDate(result.data().Date)
        setTaskEmpty("")
        setUid(id)
          
    }
    const  finishTask = async(id) =>{  
        const result = await getDoc(doc(db, 'tasks', id)); 
        await updateDoc(doc(db, 'tasks', id), {state:true});
        getTasks()
        
    }
    const saveTask = async(e) =>{
        e.preventDefault() 
        if(!isEmpty(update)){
            await updateDoc(doc(db, 'tasks', uid), {name:update, priority:priority, state:state});
            setState(false)
            setTask("") 
            setUpdate("")
            getTasks()
            setPriority(1);
            setEdit(false)
        }else{
            setTaskEmpty("Por favor llenar los campos")
        }
    }

    const handleChange = (e) =>{ 
        setUpdate( e.target.value);
        setTask( e.target.value);
        setTaskEmpty("");

    };

    const plus = () =>{
        if (priority<5){
           setPriority(priority+1)
           setErrorPriority("")
        }else{ 
            setErrorPriority("Limite")
         }
    }

    const dec = () =>{
        if(priority>1){
            setPriority(priority-1)
            setErrorPriority("") 
        }else{ 
           setErrorPriority("Limite")
        }
    }   

    return (
        <div>
            <NavigateBar/>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a href="/lprojects/" className="btn  btn-lg btn-outline-dark rounded-pill" style={{textDecoration:'none'}}  > <i className="fas fa-chevron-left"></i>Back</a>               
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <h2 className='nav-link active'>{namePro}</h2>
                        </div>
                    </div>
                </div>
            </nav>
            
            <h1 className='text-center mt-2'> Tasks List</h1>
            <div className='row mt-2 mx-auto'>
            
            <div className="col-4 mt-0"> 
                <div className="card border-dark mb-0  " style={{"maxWidth": "25rem"}}>
                    <div className="card-header text-center"> <h4>{edit ? "Update Task" : "Create Task"}</h4> </div>
                    <div className="card-body text-dark">
                    <h5 className="card-title text-center text-dark">Add a New Task</h5>
                        <form className='text-center  '>
                            
                            {edit ?
                            <div>
                                <div>
                                    <input type="text" className="form-control " name='TaskName' placeholder='Task Name'
                                    value={update} onChange={handleChange}/>  

                                </div>
                                <div className="input-group mb-3"> 
                                    <p className='text-danger'>{taskEmpty}</p>
                                </div>

                                <div className='text-start'>
                                    Date: <DatePicker value={date} onChange={setDate}/>
                                </div>

                                <div className='text-start'>
                                    Priority:  <a className='btn btn-danger rounded-circle' onClick={dec}><i className="fas fa-minus"></i></a>
                                    <input className='m-2 text-center' style={{"width":"40px"}} type="text" value={priority} disabled/>
                                    <a className='btn btn-primary rounded-circle' onClick={plus}><i className="fas fa-plus"></i></a>
                                    <p className='text-danger'>{errorPriority}</p>
                                </div>
                                <div className="card-footer text-end">
                                <button className="btn btn-danger " type="button" id="button-addon2" onClick={saveTask}>Save</button>
                                </div>

                            </div>
                            :
                            <div>
                                <div>
                                    <div className="input-group mb-3"> 
                                        <input type="text" className="form-control" name='TaskName' placeholder='Task Name' onChange={handleChange} value={task}/>
                                    </div>
                                    <div>
                                    <p className='text-danger text-start'>{taskEmpty}</p>
                                    </div>

                                </div>

                                <div className='text-start'>
                                    Date: <DatePicker value={date} onChange={setDate}/>
                                </div>

                                <div className='text-start'>
                                    Priority:  <a className='btn btn-danger rounded-circle' onClick={dec}><i className="fas fa-minus"></i></a>
                                    <input className='m-2 text-center' style={{"width":"40px"}} type="text" value={priority} disabled/>
                                    <a className='btn btn-primary rounded-circle' onClick={plus}><i className="fas fa-plus"></i></a>
                                    <p className='text-danger'>{errorPriority}</p>
                                </div>

                                <div className="card-footer text-end">
                                    <button className="btn btn-primary" type="button" id="button-addon2" onClick={createTask}>Add Task</button>
                                </div>
                            </div>                             
                            }                                                                 
                        </form>
                    </div>
                </div>
            </div>

            <div className="col-8 ">
                    <div className="card border-dark mx-auto">
                        <div className="card-header text-center"><h2  className='text-center'> Tasks</h2></div>
                        <div>
                        <table class="table table-striped table-hover">
                                <thead className='text-center'>
                                    <th >
                                        Priority
                                    </th>
                                    <th>
                                        Date
                                    </th>
                                    <th >
                                        Task
                                    </th>
                                    <th>
                                        State
                                    </th>
                                    <th>
                                        Options
                                    </th>
                                    
                                </thead>
                                <tfoot></tfoot>
                                <tbody>
                                    
                                    {
                                        tasks && tasks.map(p =>
                                            
                                            (
                                            <tr>
                                                <td>
                                                    <p className='text-dark text-center'>{p.data().priority}</p>
                                                </td>
                                                <td>
                                
                                                    <p className='text-dark text-center'>{Date(p.data().date)}</p>
                                                    
                                                </td>
                                                <td> 
                                                    <p className='text-dark mx-auto'>{p.data().name}</p> 
                                                </td>
                                                <td className='text-center'>
                                                    { 
                                                        !p.data().state ? <button className='btn btn-success' onClick={() => finishTask(p.id)}> Finish</button> : <button className='btn btn-secondary'> Finished</button> 
                                                    } 
                                                    
                                                </td>
                                                <td className='text-center '>
                                                    <button className='btn btn-danger rounded-circle mx-2' alt='Delete' onClick={() => deleteTask(p.id)} > <i className="fa fa-times"></i></button>
                                                    <button  className='btn btn-warning rounded-circle ' onClick={() => updateTask(p.id)} > <i className="fas fa-edit"></i></button>
                                                    <Link to={"/task/"+ p.id}  className='btn btn-info rounded-circle mx-2 '><i className="far fa-comment-alt text-white"  style={{textDecoration:'none'}} ></i></Link>
                                                </td>
                                            </tr>
                                            
                                            )

                                            )
                                    }
                                        

                        
                                </tbody>
                        </table>
                            
                        </div>
                    </div>
                </div>
            
            
            </div>
        </div>

        
    )
}

 
