"use client"

import Image from "next/image";

export default function Error() {
  return (
    <div className='error'>
      <Image src={'/images/logo.png'} alt={'Github logo'} width={128} height={128} />
      <h1>Something happened!</h1>
    </div>
  )
}
