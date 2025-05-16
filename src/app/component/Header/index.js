"use client"

import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import '../../globals.css';
import Link from 'next/link';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem('user'); 
        setIsLoggedIn(token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user'); 
        setIsLoggedIn(false);
        window.location.href = '/'; 
    };

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.homeHeader}>
                    <Link href="/">DBD Hotel</Link>
                </div>
                <ul className={styles.navList}>
                    <li><Link href="/pages/add_hotel">Буудал нэмэх +</Link></li>
                    {!isLoggedIn ? (
                        <>
                            <li><Link href="/pages/login">Нэвтрэх</Link></li>
                            <li><Link href="/pages/sign_in">Бүртгэл үүсгэх</Link></li>
                        </>
                    ) : (
                        <>
                            <li><a href="#"><img src="/photos/icons/x.png" alt="user-profile" /></a></li>
                            <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>Гарах</button></li>
                        </>
                    )}
                    <li><a href="#"><img src="/photos/icons/flag1.PNG" alt="english-mode" /></a></li>
                </ul>
            </div>
        </div>
    );
}
