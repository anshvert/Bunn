import { Component, createSignal } from "solid-js";
import Friends from "./friends";
import ChatRequests from "./chatRequests";
import "../styles/friendCol.css"

const FriendColumns: Component = () => {
    const [activeColumn, setActiveColumn] = createSignal('friends');

    return (
        <div class="friend-columns">
            <div class="column-buttons">
                <button onClick={() => setActiveColumn('friends')} class={`${activeColumn() === 'friends' ? 'selected-col' : ''}`}>Friends</button>
                <button onClick={() => setActiveColumn('chatRequests')} class={`${activeColumn() === 'chatRequests' ? 'selected-col' : ''}`}>Chat Requests</button>
            </div>
            <div class="column-content">
                {activeColumn() === 'friends' && <Friends />}
                {activeColumn() === 'chatRequests' && <ChatRequests />}
            </div>
        </div>
    );
};

export default FriendColumns;
