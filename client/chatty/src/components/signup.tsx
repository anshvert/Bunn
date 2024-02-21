import { createSignal } from "solid-js";
import { inputEvent } from "../types/types";
import { useNavigate } from "@solidjs/router";
import axios from 'axios';
import { useUserState } from "../stores/userState";

const SignupForm = () => {
    const [username, setUsername] = createSignal("");
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [user,setUser] = useUserState()
    const navigate= useNavigate()

    const handleSignup = async (e): Promise<void> => {
        e.preventDefault();
        const userData = { username: username(),email: email(), password: password() }
        const responseData = await axios.post('http://localhost:4000/api/user/signUp',userData)
        if (responseData.status == 200) {
            setUser(userData)
            localStorage.setItem("BNY:User", JSON.stringify(userData))
            navigate("/", { replace: true })
        }
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