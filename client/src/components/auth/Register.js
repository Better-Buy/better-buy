import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext'

const Register = (props) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { register, error, clearErrors, isAuthenticated } = authContext;
    const {setAlert} = alertContext;

    useEffect(() => {

        // the following error message need to match server
        if (error === 'User exists') {
          setAlert(error, 'danger');
            console.log('user already defined');
          clearErrors();
        }
        // eslint-disable-next-line
      }, [error, isAuthenticated, props.history]);
      
    const [user, setUser] = useState({
        // name: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    });

    // const { name, email, password, password2 } = user;
    const { firstName, lastName, email, password, password2 } = user;

    const onChange = e => setUser ({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        console.log('Register submit');
        // if (name === '' || email === '' || password === ''){
        if (firstName === '' || lastName === '' || email === '' || password === ''){            
            setAlert('Please fill all required fiels', 'danger');
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({
                // name,
                firstName,
                lastName,                
                email,
                password
            });
        }
    };

    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit ={onSubmit}>
                {/* <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="name-text-field" type="text" name="name" value={name} onChange={onChange} required/>
                </div> */}
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input className="name-text-field" type="text" name="firstName" value={firstName} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input className="name-text-field" type="text" name="lastName" value={lastName} onChange={onChange} required/>
                </div>                    
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required minlength="6"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} required  minlength="6"/>
                </div>
                <input type="submit" value="register" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Register
