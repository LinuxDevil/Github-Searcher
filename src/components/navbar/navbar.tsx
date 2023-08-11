"use client";

import Link from "next/link";
import "./navbar.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { classNames } from "@/util/util";

export default function Navbar() {

  const currentRoute = usePathname();

  return (
    <div className="navbar">
      <div className="navbar__container">
        <Link href="/">
          <Image src="/images/logo.png" alt="Github searcher logo" width={64} height={64} className="navbar__logo" />
        </Link>
        <div className="navbar__tabs">
          <Link className={classNames('navbar__tab', 'active', (currentRoute === '/'))} href="/">Home</Link>
          <Link className={classNames('navbar__tab', 'active', (currentRoute === '/search'))} href="/search">Search</Link>
        </div>
      </div>
    </div>
  );

}
