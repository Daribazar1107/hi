'use client';

import { useEffect, useState } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import style from './styles.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Add_Hotel() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState('');
  const [ubDetail, setUbDetail] = useState('');
  const [roomCount, setRoomCount] = useState(1);
  const [rooms, setRooms] = useState([{ price: "", beds: 1, bedType: "King size" }]);
  const [amenities, setAmenities] = useState({
    wifi: false,
    breakfast: false,
    parking: false,
    restaurant: false
  });
  const [images, setImages] = useState([]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    if (e.target.value !== 'Ulaanbaatar') {
      setUbDetail('');
    }
  };

  const handleRoomChange = (e) => {
    const count = Math.max(1, Math.min(3, parseInt(e.target.value || 1)));
    setRoomCount(count);
  
    setRooms((prev) => {
      const updated = [...prev];
      updated.length = count;
      for (let i = 0; i < count; i++) {
        if (!updated[i]) {
          updated[i] = { price: "", beds: 1, bedType: "King size" };
        }
      }
      return updated;
    });
  };
  
  const handleRoomFieldChange = (index, field, value) => {
    const updated = [...rooms];
    updated[index][field] = value;
    setRooms(updated);
  };

  const handleAmenityChange = (name, value) => {
    setAmenities(prev => ({
      ...prev,
      [name]: value === 'yes'
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    try {
      const base64Images = await Promise.all(imagePromises);
      setImages(base64Images);
    } catch (error) {
      console.error('Error converting images:', error);
      setError('Зураг хөрвүүлэхэд алдаа гарлаа');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const hotelData = {
        name: formData.get('hotelName'),
        location: formData.get('location'),
        ubDetail: formData.get('ubDetail'),
        stars: parseInt(formData.get('stars')),
        email: formData.get('email'),
        rooms: rooms.map(room => ({
          price: parseInt(room.price),
          beds: parseInt(room.beds),
          bedType: room.bedType === "King size" ? "King size" : "Queen size"
        })),
        extraAddress: formData.get('extraAddress'),
        amenities: amenities,
        images: images
      };

      if (!hotelData.name || !hotelData.location || !hotelData.email) {
        throw new Error('Name, location, and email are required');
      }

      if (!Array.isArray(hotelData.rooms) || hotelData.rooms.length === 0) {
        throw new Error('At least one room is required');
      }

      for (const room of hotelData.rooms) {
        if (!room.price || !room.beds || !room.bedType) {
          throw new Error('Each room must have price, beds, and bed type');
        }
      }

      const response = await axios.post('/api/hotels', hotelData);
      
      if (response.status === 201) {
        router.push('/'); 
      }
    } catch (error) {
      console.error('Error adding hotel:', error);
      setError(error.response?.data?.error || error.message || 'Буудал нэмэхэд алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit}
        className={style.hotel}
      >
        {error && <div className={style.error}>{error}</div>}
        
        <label htmlFor="name">Буудлын нэр</label>
        <input type="text" id="name" name="hotelName" placeholder="" required /><br /><br />

        <label htmlFor="hayg">Хаяг</label>
        <select name="location" id="hayg" value={location} onChange={handleLocationChange} required>
          <option value="">--Сонгох--</option>
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

        {location === 'Ulaanbaatar' && (
          <div>
            <label>Дэлгэрэнгүй (Улаанбаатар):</label>
            <select
              name="ubDetail"
              value={ubDetail}
              onChange={e => setUbDetail(e.target.value)}
              required
            >
              <option value="">--Сонгох--</option>
              <option value="a">Багануур</option>
              <option value="b">Багахангай</option>
              <option value="c">Баянгол</option>
              <option value="d">Баянзүрх</option>
              <option value="e">Налайх</option>
              <option value="f">Сонгинохайрхан</option>
              <option value="g">Сүхбаатар</option>
              <option value="h">Хан-Уул</option>
              <option value="i">Чингэлтэй</option>
            </select>
            <br /><br />
          </div>
        )}  

        <label htmlFor="stars">од</label>
        <input type="number" id="stars" name="stars" min="1" max="5" placeholder="Жишээ: 3" required /><br /><br />

        <label htmlFor="email">Цахим хаяг</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Цахим хаяг оруулах"
          pattern="^(?!.*example\.com).*"
          title="example.com домэйн бүхий хаяг зөвшөөрөхгүй"
          required
        /><br /><br />

        <label htmlFor="rooms">Хэдэн өрөө оруулах вэ?</label>
        <input
          type="number"
          id="room"
          name="room"
          min="1"
          max="3"
          value={roomCount}
          onChange={handleRoomChange}
          placeholder="Жишээ: 2"
          required
        /><br /><br />

        {rooms.map((room, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h4>Өрөө {index + 1}</h4>

            <label>Үнэ ₮:</label>
            <input
              type="number"
              placeholder="₮"
              value={room.price}
              onChange={(e) => handleRoomFieldChange(index, "price", e.target.value)}
              required
            /><br />

            <label>Орны тоо:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={room.beds}
              onChange={(e) => handleRoomFieldChange(index, "beds", e.target.value)}
              required
            /><br />

            <label>Орны төрөл:</label>
            <select
              value={room.bedType}
              onChange={(e) => handleRoomFieldChange(index, "bedType", e.target.value)}
              required
            >
              <option value="King size">King size</option>
              <option value="Queen size">Queen size</option>
            </select>
          </div>
        ))}

        <label htmlFor="extraAddress">Нэмэлт хаяг</label>
        <input type="text" id="extraAddress" name="extraAddress" /><br /><br />

        <table>
          <tbody>
            <tr>
              <td>Free WiFi</td>
              <td><input type="radio" name="wifi" value="yes" onChange={(e) => handleAmenityChange('wifi', e.target.value)} /> Байгаа</td>
              <td><input type="radio" name="wifi" value="no" onChange={(e) => handleAmenityChange('wifi', e.target.value)} /> Байхгүй</td>
            </tr>
            <tr>
              <td>Өглөөний цай</td>
              <td><input type="radio" name="breakfast" value="yes" onChange={(e) => handleAmenityChange('breakfast', e.target.value)} /> Байгаа</td>
              <td><input type="radio" name="breakfast" value="no" onChange={(e) => handleAmenityChange('breakfast', e.target.value)} /> Байхгүй</td>
            </tr>
            <tr>
              <td>Зогсоол</td>
              <td><input type="radio" name="parking" value="yes" onChange={(e) => handleAmenityChange('parking', e.target.value)} /> Байгаа</td>
              <td><input type="radio" name="parking" value="no" onChange={(e) => handleAmenityChange('parking', e.target.value)} /> Байхгүй</td>
            </tr>
            <tr>
              <td>Ресторан</td>
              <td><input type="radio" name="restaurant" value="yes" onChange={(e) => handleAmenityChange('restaurant', e.target.value)} /> Байгаа</td>
              <td><input type="radio" name="restaurant" value="no" onChange={(e) => handleAmenityChange('restaurant', e.target.value)} /> Байхгүй</td>
            </tr>
          </tbody>
        </table><br />

        <label htmlFor="img">Зураг оруулах:</label>
        <input 
          type="file" 
          id="img" 
          name="hotelImage" 
          accept="image/*" 
          multiple 
          onChange={handleImageChange}
        />
        {images.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <p>Сонгосон зургууд ({images.length}):</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {images.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`Preview ${index + 1}`} 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>
        )}
        <br /><br />

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

        <button 
          type="submit" 
          className={style.submitButton}
          disabled={loading}
        >
          {loading ? 'Түр хүлээнэ үү...' : 'Зочид буудал нэмэх'}
        </button>
      </form>
      <Footer />
    </>
  );
}
