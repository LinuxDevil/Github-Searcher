import Image from 'next/image'
import Link from "next/link";
import './home.scss';

export default function Home() {
  return (
    <div className='home'>
      <div className="home__container">
        <Image src='/images/logo.png' alt='Github Search Logo' width={200} height={200} />
        <h4 className='home__welcome'>Ever wondered how to search for users and repositories ?</h4>
        <h4 className='home__welcome'>Start Searching for them NOW!</h4>
        <Link className='home__search-link' href='/search'> Search </Link>
      </div>
    </div>
  )
}
