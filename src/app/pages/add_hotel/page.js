import Header from '../../component/Header';
import Footer from '../../component/Footer';
import style from './styles.module.css';

export default function AddHotel() {
    return (
        <>
            <Header />
            <main className={style.container}>
                <div className={style['add-hotel-container']}>
                    <h1>Буудал нэмэх</h1>
                    <form className={style.form}>
                        <label htmlFor="name">Буудлын нэр:</label>
                        <input type="text" id="name" name="name" required />

                        <label htmlFor="location">Буудлын байршил:</label>
                        <input type="text" id="location" name="location" required />

                        <label htmlFor="price">Үнэ:</label>
                        <input type="number" id="price" name="price" required />

                        <button type="submit">Нэмэх</button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}