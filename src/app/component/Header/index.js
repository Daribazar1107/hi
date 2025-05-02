"use client"

import styles from './styles.module.css';
import '../../globals.css';
import Link from 'next/link';

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.homeHeader}>
                    <Link href="/">DBD Hotel</Link>
                </div>
                <ul className={styles.navList}>
                    <li><Link href="/pages/add_hotel">Буудал нэмэх +</Link></li>
                    <li><Link href="/pages/sign_in">Нэвтрэх</Link></li>
                    <li><Link href="/pages/register">Бүртгэл үүсгэх</Link></li>
                    <li><a href="#"><img src="photos/flag1.PNG" alt="english-mode" /></a></li>
                </ul>
            </div>
        </div>
    );
}
