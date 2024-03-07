import { useUserState } from "../stores/userState";
import "../styles/navBar.css"
import {logOutUser} from "../utils/helper";

const NavBar = () => {
    const [user,setUser] = useUserState()
    return (
        <>
            <nav>
                {!user && <a href="#">Login/SignUp</a>}
                {user && <a href="/onboard" onclick={logOutUser}>Logout</a>}
                <div class="animation start-home"></div>
            </nav>
        </>
    )
}

export default NavBar