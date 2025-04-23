import Link from 'next/link';
import styles from '../../styles/Home.module.css'; 
import { useState } from 'react';
import fs from 'fs';
import path from 'path';

export default function Genres({ genres }) {
  console.log(genres)
  return (
    <div className={styles.container}>
    <h1>Browse Genres</h1>
    <ul className={styles.movieList}>
      {genres.map((genre) => (
        <div key={genre.id} className={styles.movieCard}>
        <h3>{genre.name}</h3>
        <Link href={`/genres/${genre.id}`}>{genre.id}</Link>
    </div>
    
      ))}
      </ul>
  </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  const  data  = JSON.parse(fileData);

  return {
    props: {
      genres: data.genres,
    },
  };
}
