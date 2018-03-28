import React from 'react';

class Login extends React.Component {

	render(){
		return(
			<form>
                <h1>Login with Amazon Credintials</h1>

				<h4>Email</h4> {/*Email field using an input field.*/}
				<input 
				name = "email"
				placeholder="amazon login email"
				/>
				<br />

				<h4>Password</h4> {/*password field using an input field.*/}
				<input 
				name = "password"
                placeholder="password"
                type="password"
				/>
				<br />

				<button onClick={(event) => this.onSubmit(event)}>Submit</button>
			</form>
		);
	}
}

export default Login;