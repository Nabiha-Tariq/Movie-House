import path from 'path';
import fs from 'fs';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function MovieDetail({ movie, director }) {

  return (
    <div className={styles.container}>
      <h1>{movie.title}</h1>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>

      {director && (
        <div>
          <p>
           <strong>Director:</strong>
           <Link href={`/movies/${movie.id}/director`}> {director.name}</Link>
        </p>
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const { movies } = JSON.parse(jsonData);

  const paths = movies.map(movie => ({
    params: { id: movie.id}
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const { movies, directors } = JSON.parse(jsonData);

  const movie = movies.find(m => m.id === params.id);
  let director=null;
  if(movie){
    director = directors.find(d => d.id === movie.directorId);
  }
  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie: movie || null,
      director: director || null,
    },
  };
}
