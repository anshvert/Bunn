import { createSignal } from "solid-js";
import axios from "axios";
import { UserService } from "../stores/userState";
import { useNavigate } from "@solidjs/router";

const LoginForm = () => {
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");
    const { updateUser } = UserService()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = { username: username(), password: password() }
        const userExists = await axios.post('http://localhost:4000/api/user/login',userData)
        console.log(userExists)
        if (userExists.data) {
            updateUser({ username: username(), password: password() })
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
