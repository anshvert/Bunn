import {createEffect, createSignal} from "solid-js";
import axios from "axios";
import {serverURLs} from "../config";
import {ENV} from "../utils/constants";
import {useUserState} from "../stores/userState";
import "../styles/chatReq.css"

const ChatRequests = () => {

    const [user,setUser] = useUserState()
    const [chatRequests, setChatRequests] = createSignal([]);

    const updateChatRequest = async (request,reqStatus) => {
        await axios.post(`${serverURLs[ENV]}api/message/request/update`, {...request, status: reqStatus})
        setChatRequests(
            chatRequests().map((existingRequest) =>
                existingRequest._id === request._id ? {...existingRequest, status: reqStatus} : existingRequest
            )
        );
    }

    createEffect( async () => {
        const chatRequests = await axios.post(`${serverURLs[ENV]}api/message/request/retrieve`,user)
        setChatRequests(chatRequests.data)
    },[])

    return (
        <>
            <ul class="chat-requests-list">
                {chatRequests().map((request) => (
                    <li class={`chat-request-item ${request.status}`}>
                        <div class="request-info">
                            <p class="sender-name">{request.sender !== user.username ? request.sender : request.receiver }</p>
                            <p class="request-message">{request.message ? request.message : "No message included"}</p>
                        </div>
                        <div class="request-actions">
                            {request.status === "pending" && (
                                <>
                                    {request.receiver === user.username && (
                                      <>
                                        <button class="accept-btn" onclick={() => updateChatRequest(request,"accepted")}>Accept</button>
                                        <button class="reject-btn" onClick={() => updateChatRequest(request,"rejected")}>Reject</button>
                                      </>
                                    )}
                                    {request.sender === user.username && (
                                        <>
                                            <span class="pending-label">Pending</span>
                                        </>
                                    )}
                                </>
                            )}
                            {request.status === "accepted" && <span class="accepted-label">Accepted</span>}
                            {request.status === "rejected" && <span class="rejected-label">Rejected</span>}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ChatRequests