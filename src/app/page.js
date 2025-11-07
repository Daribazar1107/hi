import Header from './component/Header';
import Footer from './component/Footer';
import SearchFilter from './component/SearchFilter';

export default function Home() {
  return (
    <div>
      <Header />
      <SearchFilter />

      <div className="slider-hotel">
        <div className="hotel-slides">
          <h2>Онцлох зочид буудлууд</h2>
          <h2>Test uguulber</h2>
          <h2>daribazar test</h2>
          <img src="photos/front.png" alt="" />
          <div className="slides"><img src="photes/hotels/hotel3.jpg" alt="1" /></div>
          <div className="slides"><img src="photos/hotels/front.jpg" alt="2" /></div>
          <div className="slides"><img src="photos/hotels/hotel3.jpg" alt="3" /></div>
        </div>
        
        <a className="prev" href="#prev">❮</a>
        <a className="next" href="#next">❯</a>
      </div>

      <h2>21 Аймаг</h2>
      <div className="slider-province">
        <img src="photos/provinces/uvurhangai.jfif" alt="" />
        <img src="photos/provinces/arhangai.jfif" alt="" />
        <img src="photos/provinces/uvurhangai.jfif" alt="" />
        <img src="photos/provinces/arhangai.jfif" alt="" />
        <img src="photos/provinces/uvurhangai.jfif" alt="" />
        <img src="photos/provinces/arhangai.jfif" alt="" />
      </div>

      <div className="comment-container">
        <div className="comment-box"></div>
        <div className="comment-box"></div>
        <div className="comment-box"></div>
        <div className="comment-box"></div>
      </div>

      <Footer />
    </div>
  );
}

