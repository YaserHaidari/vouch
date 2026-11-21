"use client"

import { useState } from "react"


export const CopyURL = () => {
  const [copiedText, setCopiedText] = useState(false)
  function urlHandler(){
    navigator.clipboard.writeText(window.location.href)
    setCopiedText(true)
  }
  return(
    <div>
      <form action={urlHandler}>
        <input  className="cta" type="submit" value={copiedText ? 'Copied' : 'Copy link'}/>
      </form>
    </div>
  )
}

