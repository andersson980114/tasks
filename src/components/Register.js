import {useState}  from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 


export function Register() {

    const [user, setUser] = useState({
        email:'',
        password:'',
    });

    const {signUp} = useAuth() 

    const navigate = useNavigate()

    const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await signUp(user.email, user.password)
            navigate('/')
        } catch (error) {
            setError(error.message);
            if(error.message === "Firebase: Error (auth/invalid-email)."){
                setError("Input your Email");
            }
            if(error.message === "Firebase: Error (auth/internal-error)."){
                setError("Wrong Email");
            }
            if( error.message === "Firebase: Error (auth/internal-error)."){
                setError("Input your Password");
            }
            if( error.message === "Firebase: Error (auth/wrong-password)."){
                setError("Wrong Password");
            } 
            if( error.message === "Firebase: Error (auth/user-not-found)."){
                setError("Not Found User");
            }
            if( error.message === "Firebase: Error (auth/email-already-in-use)."){
                setError("Email in Use");
            }  
        }
    }

    return (
        <div>
            <div className="vh-100 ">
                <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                    <div className="card-body p-5 text-center">
                        <div class="mb-md-1 mt-md-1 pb-5">
                            
                            <div className="mt-0 col text-start">
                                <a href="/login" className="btn text-start btn-lg btn-outline-light rounded-pill" style={{textDecoration:'none'}}  > <i class="fas fa-chevron-left"></i>Back</a>
                            </div>
                            <h1 class="fw-bold mt-3 text-uppercase">Register</h1>
                            <form className='container' onSubmit={handleSubmit}>

                                <div className="form-outline form-white mt-4 text-start">
                                    <label className="form-label" for="typeEmailX">Email :</label>
                                    <input type="email" id="typeEmailX" name='email' placeholder='yourEmail@email.com' onChange={handleChange}  class="form-control form-control-lg" />
                                    
                                </div>

                                <div className="form-outline form-white mt-4 text-start ">
                                    <label htmlFor="password" className="form-label" for="typePasswordX">Password : </label>
                                    <input type="password" id="typePasswordX"  name='password' placeholder='yourPassword' onChange={handleChange} class="form-control form-control-lg" />
                                    
                                </div>

                                <div className='mt-0'>
                                    {error && <p className='text-danger fw-bold text-start'>{error}</p>}
                                    <div className="row mt-5">
                                        
                                        <div className="col">
                                            <button className="btn btn-outline-light btn-lg px-5 " >Register</button> 
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                 
                            </form>
 
                        </div>

                    </div>
                    </div>
                </div>
                </div>
                </div>

            </div>
        </div>
    )
}
 
