import { useUserState } from "../stores/userState";
import searchIcon from "../assets/search.jpg"
import "../styles/searchBar.scss"
import SearchModal from "./searchModal";
import {useSearchModal, useSearchQuery} from "../stores/searchState";

const searchBar = () => {

    const [user, setUser] = useUserState()
    const [isSearchModalOpen, setIsSearchModalOpen] = useSearchModal()
    const [searchQuery, setSearchQuery] = useSearchQuery()

    const handleSearchQuery = (query) => {
        setSearchQuery(query)
    }

    const handleModalOpen = () => {
        setIsSearchModalOpen(true)
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