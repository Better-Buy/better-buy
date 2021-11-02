import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
    const authContext = useContext(AuthContext);

    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
    
        if (isAuthenticated) {
            props.history.push('/');
        }
        // the following error message need to match server
        if (error === 'Ivalid Credentials') {
        //   setAlert(error, 'danger');
            console.log('user already defined');
          clearErrors();
        }
        // eslint-disable-next-line
      }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = e => setUser ({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        console.log('Login submit');
        if(email === '' || password === '') {
            // SetAlert(' fill all fields please');
        } else {
            login({ email, password});
        }
    };

    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit ={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Login

