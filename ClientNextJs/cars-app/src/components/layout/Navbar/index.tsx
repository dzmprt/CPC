"use client";
import Link from "next/link";
import styles from "./index.module.css";
import { useCallback, useState } from "react";
import Image from 'next/image'

export default function Navbar() {

    const [showNavBar, setShowNavBar] = useState(false);

    const switchShowNavbar = useCallback(() => setShowNavBar(!showNavBar), [showNavBar]);

    return (
        <div className={`${styles.navbar}`}>
            <div className="content-container">
                <Image
                    onClick={switchShowNavbar}
                    priority={false}
                    alt="left"
                    width={20}
                    height={20} 
                    className={styles.showNavbarBtn}
                    src={"/icons/sideBarButtonWhite.svg"}
                />
                <div className={`${styles.navLinks} ${showNavBar ? styles.navLinksShow : ''}`}>
                    <Link className={styles.linkText} href={{ pathname: "/" }}>
                        Динамический каталог
                    </Link>
                    <Link className={styles.linkText} href="/info">
                        Статическая страница
                    </Link>
                    <Link className={styles.linkText} href="/map">
                        Карта
                    </Link>
                </div>
            </div>
        </div>
    );
}