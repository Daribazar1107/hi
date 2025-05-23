"use client"

import Header from '../../component/Header';
import Footer from '../../component/Footer';
import style from './style.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3000/resetPassword/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                Router.push('/login')
               
            }
        }).catch(err => console.log(err))
    }

     return(
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
    )

}
