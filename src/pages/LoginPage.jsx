import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useFirebase } from "../contexts/Firebase";
import { Button } from "react-bootstrap";


const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate('/')

    }
  }, [firebase, navigate])

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingEmail(true);
    setMessage(null);
    try {
      const result = await firebase.signinUser(email, password);
      setMessage({ type: "success", text: "Login successful!" });
      console.log("Login user successful", result);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      console.error("Login error", error);
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setMessage(null);
    try {
      const result = await firebase.loginWithGoogle();
      setMessage({ type: "success", text: "Google login successful!" });
      console.log("Google login successful", result);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      console.error("Google login error", error);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            required
            minLength={6}
          />
        </div>
        {message && (
          <div className={`alert ${message.type === "error" ? "alert-danger" : "alert-success"}`}>
            {message.text}
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={loadingEmail || loadingGoogle}>
          {loadingEmail ? "Logging in..." : "Login"}
        </button>
      </form>
      <h1 className="mt-5 mb-5">OR</h1>
      <Button onClick={handleGoogleLogin} variant="danger" disabled={loadingGoogle || loadingEmail}>
        {loadingGoogle ? "Logging in with Google..." : "Login With Google"}
      </Button>
    </div>
  );
};

export default LoginPage;
