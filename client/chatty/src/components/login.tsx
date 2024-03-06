import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useUserState } from "../stores/userState";
import { loginSuccessToast } from "./toast";
import axios from "axios";
import "../styles/login.css"

const LoginForm = () => {
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");
    const navigate = useNavigate()
    const [user,setUser] = useUserState()

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = { username: username(), password: password() }
        const userExists = await axios.post('https://buny-be.onrender.com/api/user/login',userData)
        if (userExists.data) {
            setUser(userData)
            localStorage.setItem("BNY:User", JSON.stringify(userData))
            loginSuccessToast()
            navigate("/", { replace: true })
        }
  };

  return (
      <div class="login-form">
         <div class="text">LOGIN</div>
         <form onSubmit={handleLogin}>
             <div class="field">
                 <div class="fas fa-envelope"></div>
                 <input
                    type="text"
                    id="loginUsername"
                    value={username()}
                    onInput={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    autocomplete="off"
                    required
                 />
             </div>
             <div class="field">
                 <div class="fas fa-lock"></div>
                 <input
                    type="password"
                    id="loginPassword"
                    value={password()}
                    onInput={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                 />
             </div>
             <button type="submit">LOGIN</button>
             {/*<div class="link">*/}
             {/*    Not a member?*/}
             {/*    <a href="#">Signup now</a>*/}
             {/*</div>*/}
         </form>
      </div>
  );
};

export default LoginForm;
