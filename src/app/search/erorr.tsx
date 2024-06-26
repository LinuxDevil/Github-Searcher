"use client"

import Image from "next/image";
import Button from "@/components/shared/button/button";

export default function Error({error, reset}: {error: Error, reset: () => void}) {
  return (
    <div className='searcher-error'>
      <Image src={'/images/logo.png'} alt={'Github logo'} width={128} height={128} />
      <h1>Searcher caught an error!</h1>
      <Button text='Try again? ' onClick={reset} />
    </div>
  )
}
