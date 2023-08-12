"use client"

import Image from "next/image";

export default function Loading() {

  return (
    <div className='searcher-loading'>
      <Image className='searcher-loading__logo' src={'/images/github.png'} alt={'Github logo'} width={128} height={128} />
      <h1>Loading...</h1>
    </div>
  );

}
