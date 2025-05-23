'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import style from './styles.module.css';
import axios from 'axios';
import Searchfliter from '../../component/SearchFilter';

export default function Detail() {
    const searchParams = useSearchParams();
    const [hotel, setHotel] = useState(null);
    const [sameLocationHotels, setSameLocationHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const id = searchParams.get('id');
                if (!id) {
                    setError('Hotel ID not found');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`/api/hotels/${id}`);
                if (response.data.success) {
                    setHotel(response.data.data);
                    // After getting the main hotel, fetch other hotels in the same location
                    const locationResponse = await axios.get(`/api/search?location=${encodeURIComponent(response.data.data.location)}`);
                    if (locationResponse.data.success) {
                        // Filter out the current hotel from the results
                        const otherHotels = locationResponse.data.data.filter(h => h._id !== id);
                        setSameLocationHotels(otherHotels);
                    }
                } else {
                    setError('Failed to fetch hotel details');
                }
            } catch (err) {
                console.error('Error fetching hotel:', err);
                setError('Failed to load hotel details');
            } finally {
                setLoading(false);
            }
        };

        fetchHotelDetails();
    }, [searchParams]);

    if (loading) {
        return (
            <>
                <Header />
                <Searchfliter />
                <main className={style.container}>
                    <div className={style.loading}>Loading...</div>
                </main>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <Searchfliter />
                <main className={style.container}>
                    <div className={style.error}>{error}</div>
                </main>
                <Footer />
            </>
        );
    }

    if (!hotel) {
        return (
            <>
                <Header />
                <Searchfliter />
                <main className={style.container}>
                    <div className={style.error}>Hotel not found</div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <Searchfliter />
            <main className={style.container}>
                <div className={style['detail-container']}>
                    <div className={style['hotel-header']}>
                        <h1>{hotel.name}</h1>
                        <div className={style.stars}>
                            {'⭐'.repeat(hotel.stars)}
                        </div>
                    </div>

                    <div className={style['image-gallery']}>
                        {hotel.images && hotel.images.length > 0 ? (
                            hotel.images.map((image, index) => (
                                <img 
                                    key={index} 
                                    src={image} 
                                    alt={`${hotel.name} - Image ${index + 1}`}
                                    className={style['hotel-image']}
                                />
                            ))
                        ) : (
                            <div className={style['no-images']}>No images available</div>
                        )}
                    </div>

                    <div className={style['hotel-info']}>
                        <div className={style['info-section']}>
                            <h2>Location</h2>
                            <p>{hotel.location} {hotel.ubDetail ? `- ${hotel.ubDetail}` : ''}</p>
                            {hotel.extraAddress && <p>{hotel.extraAddress}</p>}
                        </div>

                        <div className={style['info-section']}>
                            <h2>Rooms</h2>
                            <div className={style['rooms-grid']}>
                                {hotel.rooms.map((room, index) => (
                                    <div key={index} className={style['room-card']}>
                                        <h3>Room {index + 1}</h3>
                                        <p>Price: ₮{room.price}</p>
                                        <p>Beds: {room.beds}</p>
                                        <p>Bed Type: {room.bedType}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={style['info-section']}>
                            <h2>Amenities</h2>
                            <div className={style['amenities-grid']}>
                                {hotel.amenities.wifi && <span>WiFi</span>}
                                {hotel.amenities.breakfast && <span>Breakfast</span>}
                                {hotel.amenities.parking && <span>Parking</span>}
                                {hotel.amenities.restaurant && <span>Restaurant</span>}
                            </div>
                        </div>

                        <div className={style['contact-section']}>
                            <h2>Contact</h2>
                            <p>Email: {hotel.email}</p>
                        </div>
                    </div>

                    {/* Other Hotels in Same Location */}
                    {sameLocationHotels.length > 0 && (
                        <div className={style['other-hotels-section']}>
                            <h2>Other Hotels in {hotel.location}</h2>
                            <div className={style['other-hotels-grid']}>
                                {sameLocationHotels.map((otherHotel) => (
                                    <div key={otherHotel._id} className={style['other-hotel-card']}>
                                        {otherHotel.images && otherHotel.images.length > 0 && (
                                            <img 
                                                src={otherHotel.images[0]} 
                                                alt={otherHotel.name}
                                                className={style['other-hotel-image']}
                                            />
                                        )}
                                        <div className={style['other-hotel-info']}>
                                            <h3>{otherHotel.name}</h3>
                                            <div className={style['other-hotel-stars']}>
                                                {'⭐'.repeat(otherHotel.stars)}
                                            </div>
                                            <p>{otherHotel.location} {otherHotel.ubDetail ? `- ${otherHotel.ubDetail}` : ''}</p>
                                            {otherHotel.rooms && otherHotel.rooms.length > 0 && (
                                                <p className={style['other-hotel-price']}>
                                                    From ₮{Math.min(...otherHotel.rooms.map(room => room.price))}
                                                </p>
                                            )}
                                            <a 
                                                href={`/pages/detail?id=${otherHotel._id}`}
                                                className={style['view-details-button']}
                                            >
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}