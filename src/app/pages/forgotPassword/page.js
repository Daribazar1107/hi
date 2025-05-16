"use client"

import Header from '../../component/Header';
import Footer from '../../component/Footer';
import style from './style.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const res = await axios.post('/api/auth/forgotPassword', { email });
            if (res.data.Status === "Success") {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setError(res.data.message || "Алдаа гарлаа.");
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Хүсэлтийг боловсруулах үед алдаа гарлаа.');
            console.error('Forgot password error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className={style.loginContainer}>
                <form className={style.loginForm} onSubmit={handleSubmit}>
                    <h2 className={style.title}>Нууц үг сэргээх</h2>
                    {error && <div className={style.error}>{error}</div>}
                    {success && (
                        <div className={style.success}>
                            И-мэйл илгээгдлээ. Таны и-мэйл хаяг руу нууц үг сэргээх холбоос илгээгдэх болно.
                        </div>
                    )}
                    <input
                        className={style.input}
                        type="email"
                        placeholder="И-мэйл"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={loading || success}
                    />
                    <button 
                        className={style.button} 
                        type="submit"
                        disabled={loading || success}
                    >
                        {loading ? 'Түр хүлээнэ үү...' : 'Нууц үг сэргээх'}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}
