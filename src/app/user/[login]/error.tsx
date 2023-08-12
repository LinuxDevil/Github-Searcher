"use client"

import Button from "@/components/shared/button/button"
import Image from "next/image";

export default function Error({error, reset}: {error: Error, reset: () => void}) {
  return (
    <div className='searcher-error'>
      <Image src={'/images/logo.png'} alt={'Github logo'} width={128} height={128} />
      <p>Error in loading user details: {error.message}</p>
      <Button text='Try again? ' onClick={reset} />
    </div>
  )
}
