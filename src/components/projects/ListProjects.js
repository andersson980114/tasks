import React,{useState, useEffect} from 'react';
import shortid from "shortid";
import firebase, { db } from "../../firebase"
import {collection, getDocs, getDoc, query, doc,  addDoc, deleteDoc, updateDoc, where} from "firebase/firestore";
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import NavigateBar from '../NavigateBar';
import { isEmpty } from '@firebase/util';
 
export function ListProjects () {

    const [project, setProject] = useState("");
    const [projects, setProjects] = useState(null);
    const [update, setUpdate] = useState("");
    const [uid, setUid] = useState("");
    const [edit, setEdit] = useState(false);
    const [inputEmpty, setInputEmpty] = useState("")

    const {user, logout} = useAuth() 
    
    const handleLogOut = async () =>{
        await logout() 
    }

    const createProject = async (e) =>{
        e.preventDefault() 
        if(!isEmpty(project)){
            await addDoc(collection(db, 'projects'), { id: shortid.generate(), User:user.email, name: project });
            setProject("");
            getProjects();
        }else{
            setInputEmpty("Por favor llenar los campos")
        }    
    };
    
    useEffect (() => {
        getProjects();
    }, [])

     
     const getProjects = async () =>{ 
         const projectRef = collection(db, "projects");
         const q = query(projectRef, where("User", "==", user.email));
         const result = await getDocs(q);
         setProjects(result.docs) 
     }
     

    const deleteProject = async (id) =>{ 
        await deleteDoc(doc(db, 'projects', id));
        getProjects()
    }

    const updateProject = async (id) =>{ 
        setEdit(true)
        const result = await getDoc(doc(db, 'projects', id)); 
        console.log(result.data().name)
        setUpdate(result.data().name)
        setUid(id)
        setInputEmpty("")
          
    }
    const saveProject = async(e) =>{
        e.preventDefault() 
        if(!isEmpty(update)){
            await updateDoc(doc(db, 'projects', uid), {name:update});
            setProject("") 
            setUpdate("")
            getProjects()
            setEdit(false)
        }else{
            setInputEmpty("Por favor llenar los campos")
        }        
    }

    const handleChange = (e) =>{ 
        setUpdate( e.target.value);
        setProject( e.target.value);
        setInputEmpty("");

    };

    return (
        <div>
            <NavigateBar/>
            

            <h1 className='text-center mt-4'> DTech Projects List</h1>
            <div className='row mt-2 mx-auto'>
                
                <div className="col-4"> 
                    <div className="card border-dark mb-0  " style={{"max-width": "25rem"}}>
                        <div className="card-header text-center"> <h4>{edit ? "Update Project" : "Create Project"}</h4> </div>
                        <div className="card-body text-dark">
                        <h5 className="card-title text-center text-dark">Add a New Project</h5>
                            <form className='text-center  '>
                                
                                {edit ?
                                    <div>
                                        <div className="input-group mb-3"> 
                                            <input type="text" className="form-control " name='projectName' placeholder='Project Name'
                                            value={update} onChange={handleChange}/>
                                            <button className="btn btn-danger " type="button" id="button-addon2" onClick={saveProject}>Save</button> 
                                        </div>
                                        <div>
                                            <p className='text-danger text-start'>{inputEmpty}</p>
                                        </div>

                                    </div>
                                    :
                                    <div>
                                        <div className="input-group mb-3"> 
                                            <input type="text" className="form-control" name='projectName' placeholder='Project Name' onChange={handleChange}/>
                                            <button className="btn btn-primary" type="button" id="button-addon2" onClick={createProject}>Add</button> 
                                        </div>
                                        <div>
                                            <p className='text-danger text-start'>{inputEmpty}</p>
                                        </div>
                                    </div>
                                }
                                                                    
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-8 ">
                    <div className="card border-dark mx-auto">
                        <div className="card-header text-center"><h2  className='text-center'> My Projects</h2></div>
                        <div>
                        <table class="table table-striped table-hover">
                                <thead className='text-center'>
                                    <th >
                                        Project
                                    </th>
                                    <th>
                                        Options
                                    </th>
                                </thead>
                                <tfoot></tfoot>
                                <tbody>
                                    
                                    {
                                        projects && projects.map(p =>
                                            
                                            (
                                            <tr>
                                                <td>
                                
                                                    <p className='text-dark mx-auto'>{p.data().name}</p>
                                                    
                                                </td>
                                                <td className='text-center '>
                                                    <button className='btn btn-danger rounded-circle mx-2' alt='Delete' onClick={() => deleteProject(p.id)} > <i class="fa fa-times"></i></button>
                                                    <button  className='btn btn-warning rounded-circle ' onClick={() => updateProject(p.id)} > <i className="fas fa-edit"></i></button>
                                                    <button  className='btn btn-info rounded-circle mx-2 '> <Link to={"/project/"+ p.id}  ><i className="fas fa-search text-white"  style={{textDecoration:'none'}} ></i></Link></button>
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
