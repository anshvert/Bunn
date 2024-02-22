import { createSignal } from "solid-js";
import axios from "axios";
import { useNavigate } from "@solidjs/router";
import { useUserState } from "../stores/userState";

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
            navigate("/", { replace: true })
        }
  };

  return (
      <div class="container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div class="form-group">
            <label for="loginUsername">Username</label>
            <input
                type="text"
                id="loginUsername"
                value={username()}
                onInput={(e) => setUsername(e.target.value)}
                required
            />
          </div>
          <div class="form-group">
            <label for="loginPassword">Password</label>
            <input
                type="password"
                id="loginPassword"
                value={password()}
                onInput={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          <div class="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
  );
};

export default LoginForm;
