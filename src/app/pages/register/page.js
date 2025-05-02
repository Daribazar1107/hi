'use client';
import { useState } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import style from './styles.module.css';

export default function Register() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Header />
            <main className={style.container}>
                <div className={style['register-form']}>
                    <h1>Бүртгэл үүсгэх</h1>
                    <form>
                        <input type="text" placeholder="Нэр" />
                        <input type="email" placeholder="Email хаяг" />
                        <input type="password" placeholder="Нууц үг" />
                        <button type="submit">Бүртгүүлэх</button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
