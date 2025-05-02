import Header from '../../component/Header';
import Footer from '../../component/Footer';
import style from './styles.module.css';

export default function SignIn() {
    return (
        <>
            <Header />
            <main className={style.container}>
                <div className={style.imageSection}>
                    <img src="/building.jpg" alt="Building" />
                </div>
                <div className={style.loginForm}>
                    <h1>Нэвтрэх</h1>
                    <form>
                        <input type="email" placeholder="Нэр/email хаяг" />
                        <div className={style.passwordWrapper}>
                            <input type="password" placeholder="Нууц үг" />
                            <span className={style.togglePassword}>👁️</span>
                        </div>
                        <label>
                            <input type="checkbox" /> Үйлчилгээний нөхцөл зөвшөөрөх
                        </label>
                        <a href="#">Нууц үг мартсан?</a>
                        <button type="submit">Нэвтрэх</button>
                    </form>
                    <p>дараах хаягаар нэвтрэх</p>
                    <div className={style.socialIcons}>
                        <img src="/apple.png" alt="Apple" />
                        <img src="/google.png" alt="Google" />
                        <img src="/twitter.png" alt="Twitter" />
                        <img src="/facebook.png" alt="Facebook" />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
