import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
    const authContext = useContext(AuthContext);

    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {

        // the following error message need to match server
        if (error === 'User exists') {
        //   setAlert(error, 'danger');
            console.log('user already defined');
          clearErrors();
        }
        // eslint-disable-next-line
      }, [error, isAuthenticated, props.history]);
      
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = user;

    const onChange = e => setUser ({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        console.log('Register submit');
        register({
            name,
            email,
            password
          });
    };

    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit ={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="name-text-field" type="text" name="name" value={name} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange}/>
                </div>
                <input type="submit" value="register" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Register
