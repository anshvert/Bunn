import { createSignal } from "solid-js";
import { inputEvent } from "../types/types";
import axios from 'axios';

const SignupForm = () => {
    const [username, setUsername] = createSignal("");
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(username(),email(),password())
        const userData = { username: username(),email: email(), password: password() }
        const responseData = await axios.post('http://localhost:3000/api/user/signUp',userData)
        console.log(responseData)
    };

    return (
      <div class="container">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <div class="form-group">
            <label for="signupUsername">Username</label>
            <input
              type="text"
              id="signupUsername"
              value={username()}
              onInput={(e: inputEvent) => setUsername(e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <label for="signupEmail">Email</label>
            <input
              type="email"
              id="signupEmail"
              value={email()}
              onInput={(e: inputEvent) => setEmail(e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <label for="signupPassword">Password</label>
            <input
              type="password"
              id="signupPassword"
              value={password()}
              onInput={(e: inputEvent) => setPassword(e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <button type="submit">Signup</button>
          </div>
        </form>
      </div>
    );
};

export default SignupForm