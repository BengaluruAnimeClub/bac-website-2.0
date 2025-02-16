import { redirect } from 'next/navigation';

// Immediately redirect on page load
export default function Page() {
  redirect('https://forms.gle/38ACSWeu41pBFZqW8');
  // This return is never reached.
  return null;
}
