const searchModal = (props) => {
    console.log(props)
    return (
        <>
            <div class={`search-modal`}>
                <div class={`search-modal-header`}>
                    <h3>{"Hello"}</h3>
                </div>
                <button>&times;</button>
                <div class={`search-modal-body`}></div>
            </div>
        </>
    )
}

export default searchModal