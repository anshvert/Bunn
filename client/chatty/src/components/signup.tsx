import { createSignal } from "solid-js";
import { inputEvent } from "../types/types";
import { useNavigate } from "@solidjs/router";
import axios from 'axios';
import { useUserState } from "../stores/userState";
import "../styles/signUp.css"

const SignupForm = () => {
    const [username, setUsername] = createSignal("");
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [user,setUser] = useUserState()
    const navigate= useNavigate()

    const handleSignup = async (e): Promise<void> => {
        e.preventDefault();
        const userData = { username: username(),email: email(), password: password() }
        const responseData = await axios.post('https://buny-be.onrender.com/api/user/signUp',userData)
        if (responseData.status == 200) {
            setUser(userData)
            localStorage.setItem("BNY:User", JSON.stringify(userData))
            navigate("/", { replace: true })
        }
    };

    return (
      <div class="signup-form">
        <div class="text">SIGNUP</div>
        <form onSubmit={handleSignup}>
          <div class="field">
            <input
              type="text"
              id="signupUsername"
              value={username()}
              onInput={(e: inputEvent) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div class="field">
            <input
              type="email"
              id="signupEmail"
              value={email()}
              onInput={(e: inputEvent) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div class="field">
            <input
              type="password"
              id="signupPassword"
              value={password()}
              onInput={(e: inputEvent) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
            <button type="submit">Signup</button>
        </form>
      </div>
    );
};

export default SignupForm