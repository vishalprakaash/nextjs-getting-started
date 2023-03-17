import Image from "next/image";
import styles from "./page.module.css"
import Link from "next/link";

async function revalidatedData() {
  return await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=b95f73a43bb59aa4b0ca7ea43ad4cdcd`, {
    next: { revalidate: 10 },
  }).then(r => r.json());
}

const IMG_BaseURL = "https://image.tmdb.org/t/p/w500";

const imageUrl = (img) => `${IMG_BaseURL}${img}`;

export default async function Home() {
  const moviesList = await revalidatedData();

  return (
    <main className={styles.main}>
      <h1>Movies List</h1>
      <div className={`${styles.grid_layout}`}>
        {moviesList && moviesList.results.map(movie => <div className={`${styles.movies_wrapper}`} key={movie?.id}>
          <div className={`${styles.image_wrapper}`}>
            <Image src={imageUrl(movie.poster_path)} alt={movie?.title} width={250} height={350} />
          </div>
          <div className={`${styles.content_wrapper}`}>
            <div className={`${styles.title}`}>
              {movie?.title}
            </div>
            <div className={`${styles.desctription}`}>
              {movie.overview}
            </div>
            <Link className={`${styles.know_more}`} href={`/movies/${movie.id}`}>Know more</Link>
          </div>
        </div>)}
      </div>
    </main>
  )
}
