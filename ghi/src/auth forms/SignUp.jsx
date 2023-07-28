import { useState } from "react";
import useToken from "./newindex.tsx";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useToken();
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const accountData = {
      fullname: fullname,
      username: username,
      email: email,
      password: password,
    };
    register(accountData, `${process.env.REACT_APP_API_HOST}/api/accounts`);
    e.target.reset();
    navigate("/garden");
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Sign Up</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleRegistration(e)}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              name="first"
              type="text"
              className="form-control"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="text"
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
