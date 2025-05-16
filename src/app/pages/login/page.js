"use client"

import Header from '../../component/Header';
import Footer from '../../component/Footer';
import style from './style.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password
            });
            
            // Store the token 
            localStorage.setItem('user', response.data.token);
            
            
            router.push('/');
        } catch (error) {
            console.error("Error during login:", error);
            if (error.response?.status === 400) {
                setError("И-мэйл эсвэл нууц үг буруу байна");
            } else if (error.response?.status === 401) {
                setError("Таны эрх хүрэлцэхгүй байна");
            } else {
                setError("Системийн алдаа гарлаа. Дараа дахин оролдоно уу");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className={style.loginContainer}>
                <form className={style.loginForm} onSubmit={handleSubmit}>
                    <h2 className={style.title}>Нэвтрэх</h2>
                    {error && <div className={style.error}>{error}</div>}
                    <input
                        className={style.input}
                        type="email"
                        placeholder="И-мэйл"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className={style.input}
                        type="password"
                        placeholder="Нууц үг"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                    <div className={style.forgotPassword}>
                        <a href="/pages/forgotPassword">Нууц үгээ мартсан</a>
                    </div>
                    <div className={style.register}>
                        <span>Шинэ хэрэглэгч үү? </span>
                        <a href="/pages/sign_in">Бүртгүүлэх</a>
                    </div>
                    <button 
                        className={style.button} 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Түр хүлээнэ үү...' : 'Нэвтрэх'}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}
