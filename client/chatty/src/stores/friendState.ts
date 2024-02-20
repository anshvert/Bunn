import { createSignal } from "solid-js";

const [selectedFriend, setSelectedFriend] = createSignal("")

export const useSelectedFriend = () => [selectedFriend,setSelectedFriend]