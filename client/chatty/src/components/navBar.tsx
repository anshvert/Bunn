import { useUserState } from "../stores/userState";
import "../styles/navBar.scss"
import {logOutUser} from "../utils/helper";
import SearchBar from "./searchBar";

const NavBar = () => {
    const [user,setUser] = useUserState()
    return (
        <>
            <nav>
                {!user && <a href="#">Login/SignUp</a>}
                {user && <a href="/onboard" onclick={logOutUser}>Logout</a>}
                <SearchBar/>
            </nav>
        </>
    )
}

export default NavBar