import {useState}  from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 


export function Login() {

    const [user, setUser] = useState({
        email:'',
        password:'',
    });

    const {login,  googleLogin, facebookLogin} = useAuth() 

    const navigate = useNavigate()

    const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await login(user.email, user.password)
            navigate('/lprojects')
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
        }
    }

    const handleGoogleSingIn =  async() =>{
        await googleLogin()
        navigate('/lprojects')
    }

    const handleFacebookSigIn = async() =>{
        await facebookLogin()
        navigate('/lprojects')
    }

    const handleRegister  = () =>{
        navigate('/register')
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
                        
                        <h1 class="fw-bold mt-5 text-uppercase">Login</h1>
                        <form className='container' onSubmit={handleSubmit}>

                            <div className="form-outline form-white mt-4 text-start">
                                <label className="form-label" for="typeEmailX">Email :</label>
                                <input type="email" id="typeEmailX" name='email' placeholder='yourEmail@email.com' onChange={handleChange}  class="form-control form-control-lg" />
                                
                            </div>

                            <div className="form-outline form-white mt-4 text-start ">
                                <label htmlFor="password" className="form-label" for="typePasswordX">Password : </label>
                                <input type="password" id="typePasswordX"  name='password' placeholder='yourPassword' onChange={handleChange} class="form-control form-control-lg" />
                                
                            </div>

                            <div className='mt-5'>
                                {error && <p className='text-danger fw-bold text-start'>{error}</p>}
                                <button className="btn btn-outline-light btn-lg px-5 " >Login</button>

                            </div>
                            
                            <div className="d-flex justify-content-center text-center mt-4  pt-1 ">
                                <button   className="mx-2 btn btn-outline-light btn-lg rounded-circle " onClick={handleFacebookSigIn} ><i class="fab fa-facebook-f fa-lg"></i></button> 
                                <button  className="btn btn-outline-light rounded-circle" onClick={handleGoogleSingIn}><i className="fab fa-google fa-lg"></i></button>
                            </div>
                        </form>

                        <div>
                            <p className="mt-5 mb-0">Don't have an account? <a href="/register"  className="text-white-50 fw-bold">Sign Up</a></p>
                        </div>

                        
                        
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
 
