"use client"
export default function SearchFilter(){
    function handleSearch(e: React.ChangeEvent<HTMLFormElement>){
        console.log(e.target.value)
    }
    return(
        <div>
            <form>
                <input type="text" onChange={handleSearch} placeholder="Search"/>
            </form>
        </div>
    )
}