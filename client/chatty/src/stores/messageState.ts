import { createStore } from "solid-js/store";

const [lastMessageMap, setLastMessageMap] = createStore()

export const useLastMessage = () => [lastMessageMap, setLastMessageMap]

