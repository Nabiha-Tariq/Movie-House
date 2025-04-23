import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home({ trendingMovies }) {
    const router =useRouter();
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
              <Link href="/help">Help</Link>
              <Link href="/help/faqs">FAQs</Link>
              <Link href="/help/contact">Contact</Link>
              <Link href="/help/privacy">Privacy</Link>
            </nav>
            <h1>Welcome to Movie House</h1>
            <h2>Trending Movies</h2>
            <div className={styles.movieList}>
                {trendingMovies && trendingMovies.map((movie) => (
                    <div key={movie.id} className={styles.movieCard}>
                        <h3>{movie.title}</h3>
                        <p>{movie.description}</p>
                        <p><strong>Rating:</strong> {movie.rating}</p>
                    </div>
                ))}
            </div>
            <button className={styles.button} onClick={() => router.push('/genres')}>Browse Genres</button>
            <button className={styles.button} onClick={() => router.push('/movies')}>Browse All Movies</button>
        </div>
    );
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'data', 'movies.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const { movies } = JSON.parse(fileData);

    const trendingMovies = movies.sort((a, b) => b.rating - a.rating)

    return {
        props: {
            trendingMovies,
        },
        revalidate: 10,
    };
}
