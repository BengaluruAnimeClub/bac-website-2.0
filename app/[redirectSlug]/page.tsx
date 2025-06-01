import { redirect } from 'next/navigation';
import { redirectTable } from '@/lib/redirects';

export default function RedirectPage({ params }: { params: { redirectSlug: string } }) {
  // Convert slug to lowercase for case-insensitive matching
  const url = redirectTable[params.redirectSlug.toLowerCase()];
  if (url) {
    redirect(url);
  }
  // Optionally, render a 404 or fallback if slug not found
  return <div>Page not found</div>;
}
