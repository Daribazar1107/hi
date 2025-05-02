import Header from '../../component/Header';
import Footer from '../../component/Footer';
import style from './styles.module.css';

export default function Detail() {
    return (
        <>
            <Header />
            <main className={style.container}>
                <div className={style['detail-container']}>
                    <h1>Буудлын дэлгэрэнгүй мэдээлэл</h1>
                    <p>Энд буудлын дэлгэрэнгүй мэдээлэл харагдана.</p>
                </div>
            </main>
            <Footer />
        </>
    );
    
}