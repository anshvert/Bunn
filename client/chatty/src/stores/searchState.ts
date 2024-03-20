import { createSignal } from "solid-js";

const [isSearchModalOpen, setIsSearchModalOpen] = createSignal(false)
const [searchQuery, setSearchQuery] = createSignal("")

export const useSearchModal = () => [isSearchModalOpen,setIsSearchModalOpen]
export const useSearchQuery = () => [searchQuery,setSearchQuery]
