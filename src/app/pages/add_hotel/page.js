'use client';

import { useEffect } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import style from './styles.module.css';

export default function AddHotel() {
  useEffect(() => {
    const modal = document.getElementById('termsModal');
    const openBtn = document.getElementById('openTerms');
    const closeBtn = document.querySelector(`.${style.close}`);

    openBtn.onclick = function (e) {
      e.preventDefault();
      modal.style.display = 'block';
    };

    closeBtn.onclick = function () {
      modal.style.display = 'none';
    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }, []);

  return (
    <>
      <Header />
      <form
        action="#"
        method="post"
        encType="multipart/form-data"
        className={style.hotel}
      >
        <label htmlFor="name">Буудлын нэр</label>
        <input type="text" id="name" name="hotelName" placeholder="" /><br /><br />

        <label htmlFor="email">Цахим хаяг</label>
        <input type="email" id="email" name="email" placeholder="Цахим хаяг оруулах" /><br /><br />

        <label>1 ортой өрөө</label>
        <input type="number" name="roomCount1" placeholder="Жишээ: 1" /><br />
        <label htmlFor="price1">Үнэ</label>
        <input type="text" name="price1" placeholder="Жишээ: 100000" /><br /><br />

        <label>2 ортой өрөө</label>
        <input type="number" name="roomCount2" placeholder="Жишээ: 2" /><br />
        <label htmlFor="price2">Үнэ</label>
        <input type="text" name="price2" placeholder="Жишээ: 100000" /><br /><br />

        <label>3 ортой өрөө</label>
        <input type="number" name="roomCount3" placeholder="Жишээ: 1" /><br />
        <label htmlFor="price3">Үнэ</label>
        <input type="text" name="price3" placeholder="Жишээ: 100000" /><br /><br />

        <label>4 ортой өрөө</label>
        <input type="number" name="roomCount4" placeholder="Жишээ: 1" /><br />
        <label htmlFor="price4">Үнэ</label>
        <input type="text" name="price4" placeholder="Жишээ: 100000" /><br /><br />

        <label htmlFor="hayg">Хаяг</label>
        <select name="location" id="hayg">
          <option value="Ulaanbaatar">Улаанбаатар</option>
          <option value="Tsetserleg">Архангай аймаг</option>
          <option value="Ulgii">Баян-Өлгий</option>
          <option value="Bayanhongor">Баянхонгор</option>
          <option value="Bulgan">Булган</option>
          <option value="Altai">Говь-Алтай</option>
          <option value="Choir">Говьсүмбэр</option>
          <option value="Darhan">Дархан</option>
          <option value="Sainshand">Дорноговь</option>
          <option value="Mandalgovi">Дундговь</option>
          <option value="Uliastai">Завхан</option>
          <option value="Erdenet">Орхон</option>
          <option value="Arvaiheer">Өвөрхангай</option>
          <option value="Dalanzadgad">Өмнөговь</option>
          <option value="Baruun-Urt">Сүхбаатар</option>
          <option value="Suhbaatar">Сэлэнгэ</option>
          <option value="Zuunmod">Төв</option>
          <option value="Ulaangom">Увс</option>
          <option value="Hovd">Ховд</option>
          <option value="Murun">Хөвсгөл</option>
          <option value="Chingis">Хэнтий</option>
        </select><br /><br />

        <label htmlFor="extraAddress">Нэмэлт хаяг</label>
        <input type="text" id="extraAddress" name="extraAddress" /><br /><br />

        <table>
          <tbody>
            <tr>
              <td>Free WiFi</td>
              <td><input type="radio" name="wifi" value="yes" /> Байгаа</td>
              <td><input type="radio" name="wifi" value="no" /> Байхгүй</td>
            </tr>
            <tr>
              <td>Өглөөний цай</td>
              <td><input type="radio" name="breakfast" value="yes" /> Байгаа</td>
              <td><input type="radio" name="breakfast" value="no" /> Байхгүй</td>
            </tr>
            <tr>
              <td>Зогсоол</td>
              <td><input type="radio" name="parking" value="yes" /> Байгаа</td>
              <td><input type="radio" name="parking" value="no" /> Байхгүй</td>
            </tr>
            <tr>
              <td>Ресторан</td>
              <td><input type="radio" name="restaurant" value="yes" /> Байгаа</td>
              <td><input type="radio" name="restaurant" value="no" /> Байхгүй</td>
            </tr>
          </tbody>
        </table><br />

        <label htmlFor="img">Зураг оруулах:</label>
        <input type="file" id="img" name="hotelImage" accept="image/*" /><br /><br />

        <div id="termsModal" className={style.modal}>
          <div className={style.modalContent}>
            <span className={style.close}>&times;</span>
            <h2>Үйлчилгээний нөхцөл</h2>
            <p>Манай DBD буудлын бүртгэлийн үйлчилгээг ашиглахын тулд дараах нөхцөлүүдтэй танилцаж, хүлээн зөвшөөрнө үү.</p>
            <h3>1. Хувийн мэдээлэл</h3>
            <p>Та бүртгүүлэх үедээ зөв, үнэн мэдээлэл өгөх үүрэгтэй.</p>
            <h3>2. Аюулгүй байдал</h3>
            <p>Бид таны өгсөн мэдээллийг хамгаалж, гуравдагч этгээдэд дамжуулахгүй.</p>
            <h3>3. Үйлчилгээний хариуцлага</h3>
            <p>Бид мэдээллийн бүрэн бүтэн байдал, нарийвчлалын төлөө хичээж ажиллана.</p>
            <h3>4. Зөрчил гарсан тохиолдолд</h3>
            <p>Хэрэглэгч үйлчилгээг буруугаар ашиглавал бид хэрэглээг хязгаарлах эрхтэй.</p>
          </div>
        </div>

        <label htmlFor="term" className={style.termLabel}>
          <input type="checkbox" id="term" name="term" required />
          <a href="#" id="openTerms">Үйлчилгээний нөхцлийг зөвшөөрч байна</a>
        </label>

        <button type="submit" className={style.submitButton}>
          Зочид буудал нэмэх
        </button>
      </form>
      <Footer />
    </>
  );
}
