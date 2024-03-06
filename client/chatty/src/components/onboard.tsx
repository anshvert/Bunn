import Login from "./login";
import Signup from "./signup";
import "../styles/onboard.css"

const OnBoard = () => {
    return (
        <div class="onboard">
            <div class="onboard__login">
                <Login />
            </div>
            <div class="onboard__divider"></div>
            <div class="onboard__signup">
                <Signup />
            </div>
        </div>
    )
}

export default OnBoard
