import Link from 'next/link';
import styles from '../../styles/Home.module.css'; 
import { useState } from 'react';
import fs from 'fs';
import path from 'path';

export default function Movies({ movies }) {
  const [selectedGenre, setSelectedGenre] = useState('');

let filteredMovies;

if (selectedGenre) {
  filteredMovies = movies.filter(movie => movie.genreId === selectedGenre);
} else {
  filteredMovies = movies;
}

  return (
    <div className={styles.container}>
      <h1>All Movies</h1>

      <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
        <option value="">All Genres</option>
        <option value="g1">Science Fiction</option>
        <option value="g3">Adventure</option>
        <option value="g4">Drama</option>
        <option value="g5">Thriller</option>
      </select>

      <div className={styles.movieList}>
        {filteredMovies.map(movie => (
          <div key={movie.id} className={styles.movieCard}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <Link href={`/movies/${movie.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  const { movies } = JSON.parse(fileData);

  return {
    props: {
      movies,
    },
    revalidate: 10,
  };
}
