import useToken from "./newindex.tsx";
import { useNavigate } from "react-router-dom";

function Logout(props){
    const { token, logout } = useToken();
    const navigate = useNavigate();

    logout();
    navigate("/login");

}

export default Logout;
