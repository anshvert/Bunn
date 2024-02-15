import { createSignal } from "solid-js";

const LoginForm = () => {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
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
