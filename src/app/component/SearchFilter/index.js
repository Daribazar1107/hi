import '../../globals.css';
import styles from './styles.module.css';
import Link from 'next/link';

export default function SearchFilter() {
    return (
      <div className={styles.search}>
      <section className={styles.searchFilters}>
        <div className={styles.searchContainer}>
        <input type="text" placeholder="Search for hotels" />
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