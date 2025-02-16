import { redirect } from 'next/navigation';

// Immediately redirect on page load
export default function Page() {
  redirect('https://forms.gle/mH9uv5naDSRXGZU29');
  // This return is never reached.
  return null;
}
