'use client';

import { useState, useEffect } from 'react';
import '../../globals.css';
import styles from './styles.module.css';
import Link from 'next/link';
import axios from 'axios';

export default function SearchFilter() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Debounce search to avoid too many API calls
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm.trim()) {
                setLoading(true);
                try {
                    const response = await axios.get(`/api/search?location=${encodeURIComponent(searchTerm)}`);
                    if (response.data.success) {
                        setSearchResults(response.data.data);
                    }
                } catch (err) {
                    setError('Хайлт хийхэд алдаа гарлаа');
                    console.error('Search error:', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setSearchResults([]);
            }
        }, 500); // Wait 500ms after user stops typing

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className={styles.search}>
            <section className={styles.searchFilters}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchInputWrapper}>
                        <input 
                            type="text" 
                            placeholder="Хаана байрлах вэ?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {loading && <div className={styles.loading}>Хайж байна...</div>}
                        {error && <div className={styles.error}>{error}</div>}
                        {searchResults.length > 0 && (
                            <div className={styles.searchResults}>
                                {searchResults.map((hotel) => (
                                    <Link 
                                        href={`/pages/detail?id=${hotel._id}`} 
                                        key={hotel._id}
                                        className={styles.resultItem}
                                    >
                                        <div className={styles.hotelInfo}>
                                            <h4>{hotel.name}</h4>
                                            <p>{hotel.location} {hotel.ubDetail ? `- ${hotel.ubDetail}` : ''}</p>
                                            <p>⭐ {hotel.stars} од</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <input type="date" placeholder="Check-in" />
                    <input type="date" placeholder="Check-out" />
                    <input type="number" placeholder="Guests" />
                    <li>
                        <Link href="/pages/detail">
                            <button className={styles.button}>Search</button>
                        </Link>
                    </li>
                </div>
            </section>
        </div>
    );
}