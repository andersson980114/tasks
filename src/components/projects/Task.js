import React,{useState, useEffect} from 'react';
import shortid from "shortid";
import firebase, { db, getStorage, storage } from "../../firebase"
import {collection, getDocs, getDoc, query, doc,  addDoc, deleteDoc, updateDoc, where} from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigateBar from '../NavigateBar';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { isEmpty } from '@firebase/util';

export function Task () {
    const params = useParams()
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(null); 
    const [nameTask, setNameTask] = useState("");
    const [progress, setProgress] = useState("");
    const [idProject, setIdProject] = useState("")
    const [filee, setFilee] = useState(null)
    const [inputEmpty, setInputEmpty] = useState("")
    

    const createComment = async (e) =>{
        e.preventDefault() 
        if(!isEmpty(comment)){    
            await addDoc(collection(db, 'comments'), { id: shortid.generate(), taskId: params.taskId, name: comment, file:filee });
            console.log(params.taskId)
            setComment("");
            getComments(); 
        }else{
            setInputEmpty("Por favor llenar los campos")
        }
    };
    
    useEffect (() => {
        getComments();
        getTask();
    }, [])

    const getTask = async() =>{
        const task = await getDoc(doc(db, 'tasks', params.taskId));
        setNameTask(task.data().name) 
        setIdProject(task.data().projectId)
    }
     
    const getComments = async () =>{ 

        const commentRef = collection(db, "comments");
        const q = query(commentRef, where("taskId", "==", params.taskId));
        const result = await getDocs(q);
        setComments(result.docs) 
    }
     
    const deleteComment = async (id) =>{ 
        await deleteDoc(doc(db, 'comments', id));
        getComments()
    }

    const handleChange = (e) =>{ 
        setComment( e.target.value);
        setInputEmpty("")

    };

    const fileHandle = async(e) =>{
        const file = e.target.files[0];
        const storageRef = ref(storage, `/files/${file.name}`);
        const upload = uploadBytesResumable(storageRef, file); 
        upload.on("state_changed", (snapshot) => {
            const progress = "Uploaded " +Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) +"%";
            setProgress(progress)
        }, (error) => console.log(error),
        () => {
            getDownloadURL(upload.snapshot.ref).then((url) => console.log(setFilee(url)));
        });
         
        console.log("uploaded file:", file.name)
    }


    return (
        <div>
            <NavigateBar/>
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to={"/project/"+ idProject} className="btn  btn-lg btn-outline-dark rounded-pill"><i className="fas fa-chevron-left"></i>Back</Link>               
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <h2 className='nav-link active'>{nameTask}</h2>
                        </div>
                    </div>
                </div>
            </nav>
 
            <h2 className='text-center'>Comments</h2>

            <div className="col">
                    <h2  className='text-center'> Comments List</h2>

                    <div className="row p-2">
                        <div className="col ">
                            <div className="card bg-secondary border-dark">
                                {
                                    comments && comments.map(p =>
                                        (
                                            <div className="card m-2 p-2 bg-light border-secondary"> 
                                                <div className="col">
                                                    <div > 
                                                        <p className='p-1'>{p.data().name}</p> 
                                                        
                                                        <a className='p-1' href={p.data().file}  target="_blank">file</a>
                                                    </div>
                                                    <div className="text-end"> 
                                                    
                                                        <button  className='btn btn-danger rounded-pill mx-2'  onClick={() => deleteComment(p.id)} ><i className="fa fa-times"></i> Delete</button> 
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </div> 

            <div className="row mx-auto p-2">
                <div className="card bg-light border-dark ">
                    <div className="card-header text-center">
                            <h3  className='text-start'>
                                Add Comments
                            </h3>
                    </div>
                    <div className="col card-body ">
                        <form >
                            <div className='row p-3'>
                                
                            <textarea  rows="4" cols="80" style={{"resize":"none"}} type="text" name='CommentName' placeholder='Comment here'
                                value={comment}
                                onChange={handleChange}
                            />
                                
                            </div>
                            <p className='text-danger text-start'>{inputEmpty}</p>
                            <div className="row">
                                <div className="col text-end">
                                    <input type="file" onChange={fileHandle} />
                                    <p> {progress}</p>
                                    
                                </div>
                            </div>
                            
                            <div className="card-footer text-end">
                                <button className="btn btn-primary" onClick={createComment}>Add Comment</button> 
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

