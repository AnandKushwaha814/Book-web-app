import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useFirebase } from "../contexts/Firebase";

function Register() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate('/')

    }
  }, [firebase, navigate])

  const submitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await firebase.signUserWithEmailAndPassword(email, password);
      setMessage({ type: "success", text: "Signup successful!" });
      console.log("Signup user successful", result);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      console.error("Signup error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={submitData}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            required
          />
          <div className="form-text">We shall never share your email with anyone else.</div>
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Register;
