"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import style from './styles.module.css';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/api/users', {
                email,
                password,
            });
            
            console.log("User created successfully:", response.data);
            // Redirect or show success message
            window.location.href = '/'; // Redirect to home page after successful signup
        } catch (error) {
            console.error("Error during sign-in:", error);
            setError(error.response?.data?.error || "An error occurred during sign up");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className={style.container}>
                <div className={style.imageSection}>
                    <img src="/photos/hotels/grand.jpg" alt="Building" />
                </div>
                <div className={style.loginForm}>
                    <h1>Бүртгүүлэх</h1>
                    {error && <div className={style.error}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Нэр/email хаяг"
                            required
                        />
                        <div className={style.passwordWrapper}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Нууц үг"
                                required
                                minLength={6}
                            />
                            <span className={style.togglePassword}>👁️</span>
                        </div>
                        <label>
                            <input type="checkbox" required /> Үйлчилгээний нөхцөл зөвшөөрөх
                        </label>
                        <a href="#">Нууц үг мартсан?</a>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Түр хүлээнэ үү...' : 'Нэвтрэх'}
                        </button>
                    </form>
                    <p>дараах хаягаар нэвтрэх</p>
                    <div className={style.socialIcons}>
                        <img src="/photos/icons/apple.jpg" alt="Apple" />
                        <img src="/photos/icons/google.webp" alt="Google" />
                        <img src="/photos/icons/x.png" alt="Twitter" />
                        <img src="/photos/icons/facebook.png" alt="Facebook" />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
