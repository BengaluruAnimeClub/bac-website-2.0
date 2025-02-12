import { redirect } from 'next/navigation';

// Immediately redirect on page load
export default function Page() {
  redirect('https://rzp.io/rzp/BengaluruAnimeClub');
  // This return is never reached.
  return null;
}
