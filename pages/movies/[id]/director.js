import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = url => fetch(url).then(res => res.json());

export default function MovieDirector() {
  const router = useRouter();
  const { id } = router.query; 

  const { data: directors, error: directorError } = useSWR('/api/directors', fetcher);
  const { data: movies, error: movieError } = useSWR('/api/movies', fetcher);

  if (directorError || movieError) return <div>Failed to load data</div>;
  if (!directors || !movies) return <div>Loading...</div>;
  const movie = movies.find(m => m.id === id);

  if (!movie) return <div>Movie not found</div>;
  const director = directors.find(d => d.id === movie.directorId);

  if (!director) return <div>Director not found</div>;

  return (
    <div>
      <h2>Directed by {director.name}</h2>
      <p>{director.biography}</p>
    </div>
  );
}
