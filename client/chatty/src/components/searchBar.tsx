import { useUserState } from "../stores/userState";
import { createSignal } from "solid-js";
import searchIcon from "../assets/search.jpg"
import "../styles/searchBar.scss"
import SearchModal from "./searchModal";

const searchBar = () => {

    const [user, setUser] = useUserState()
    const [isSearchModalOpen, setIsSearchModalOpen] = createSignal(false)
    const [searchQuery, setSearchQuery] = createSignal("")

    const handleModalOpen = () => {
        setIsSearchModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsSearchModalOpen(false)
    }

    const handleSearchQuery = (query) => {
        setSearchQuery(query)
        console.log(searchQuery())
    }

    return (
        <>
            <div class="search-bar">
                <img class="search-icon" src={searchIcon as string} width="50" height="50" alt={"HAHA"}/>
                <input type="text" name="search" placeholder="What you thinking ?" class="search-input" autocomplete="on"
                       onclick={handleModalOpen} onInput={(e) => handleSearchQuery(e.target.value)}/>
                {isSearchModalOpen() && searchQuery().length && <SearchModal/>}
            </div>
        </>
    )
}

export default searchBar