import { NavCard } from "@/components/NavCard/navcard"
import { ContactPageForm } from "./contactformClient"

export default function Contact(){
  function handleSubmit(){
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: "ali"})
    })
  }
  return(
    <div>
      <NavCard/>
      <h1>HEllo</h1>
      <ContactPageForm/>
    </div>
  )
}