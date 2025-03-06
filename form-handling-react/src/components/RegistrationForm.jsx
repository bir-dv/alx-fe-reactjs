import { useState } from "react";

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setErrors] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username) {
            setErrors('field username must be required');
            return;
        }
        if (!password) {
            setErrors('field password must be required');
            return;
        }
        if (!email) {
            setErrors('field email must be required');
            return;
        }
        setErrors('');
        console.log(username, email, password);
        setUsername('');
        setPassword('');
        setEmail('');
    }


    return (
        <div>
            <h1>Register</h1>
            <form>
                <div>
                    <label>Username:</label>
                    <input type="text" 
                     value={username} 
                     onChange={(e) => setUsername(e.target.value)} // this is the event handler to update the state
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {error && <p style={{color: 'red'}}>{error}</p>}

                <button type="submit" onClick={handleSubmit} >Register</button>

            </form>
        </div>
    )
}

export default RegistrationForm;