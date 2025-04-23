import path from 'path';
import fs from 'fs';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function GenreDetail({ genre, movies }) {
  return (
    <div className={styles.container}>
      <h1>Genre: {genre.name}</h1>
      <p>ID: {genre.id}</p>

      <h2>Movies in this Genre:</h2>
      <ul className={styles.movieList}>
      {movies.length === 0 && <p>movies not found</p>}
      {movies.length > 0 &&
          movies.map((movie) => {
            return (
              <li key={movie.id} className={styles.movieCard}>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const { genres } = JSON.parse(jsonData);

  const paths = genres.map((genre) => ({
    params: { id: genre.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  const genre = data.genres.find((g) => g.id === params.id);
  const movies = data.movies.filter((m) => m.genreId === genre.id);

  return {
    props: {
      genre,
      movies,
    },
  };
}
