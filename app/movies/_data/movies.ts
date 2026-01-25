import type { Movie } from "@/types/movie"

export const featuredMovie: Movie = {
  id: "featured-interstellar-odyssey",
  title: "Interstellar Odyssey",
  year: 2024,
  runtime: "2h 48min",
  genres: ["Sci‑Fi", "Adventure"],
  rating: 8.9,
  overview:
    "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. An epic journey across time and space that challenges our understanding of reality.",
  // Leave image URLs undefined for now to avoid dev-time upstream 404s.
}

export const recommendedMovies: Movie[] = [
  {
    id: "velocity-strike",
    title: "Velocity Strike",
    year: 2024,
    rating: 8.5,
    genres: ["Action"],
  },
  {
    id: "eternal-summer",
    title: "Eternal Summer",
    year: 2023,
    rating: 7.8,
    genres: ["Romance"],
  },
  {
    id: "the-silent-witness",
    title: "The Silent Witness",
    year: 2024,
    rating: 9.1,
    genres: ["Thriller"],
  },
  {
    id: "dreamworld-chronicles",
    title: "Dreamworld Chronicles",
    year: 2024,
    rating: 8.3,
    genres: ["Fantasy"],
  },
  {
    id: "laugh-out-loud",
    title: "Laugh Out Loud",
    year: 2023,
    rating: 7.2,
    genres: ["Comedy"],
  },
]

