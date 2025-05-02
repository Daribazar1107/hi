import styles from './styles.module.css';
import '../../globals.css';

export default function Footer() {
    return (
        
        <div className={styles.footer}>
            <div className={styles.about}>
                <h4>Тухай</h4>
                <a href="#">Бидний тухай</a>
                <a href="#">Түгээмэл асуулт хариулт</a>
                <a href="#">Үйлчилгээний нөхцөл</a>
            </div>
        
            <div className={styles.info}>
                <h4>Мэдээлэл</h4>
                <a href="#">Мэдээ мэдээлэл</a>
                <a href="#">Буудалд зориулсан зөвлөмж</a>
                <a href="#">Аялагчдад зориулсан зөвлөмж</a>
            </div>
        
            <div className={styles.service}>
                <h4>Үйлчилгээ</h4>
                <a href="#">Өрөөний удирдлагын систем</a>
            </div>
        </div>
        
    );
}