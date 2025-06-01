import { fetchAuthors } from "@/lib/contentful-api";
import Link from "next/link";
import Image from "next/image";

export default async function AuthorsListPage() {
  const authors = await fetchAuthors();
  return (
    <div className="container max-w-3xl py-8 px-4 mx-auto">
      <center><h1 className="text-3xl font-bold mb-6">Contributors</h1></center>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {authors.map((author: any) => {
          const { name, slug, avatar } = author.fields;
          return (
            <Link key={slug} href={`/contributors/${slug}`} className="flex items-center justify-center text-center gap-4 p-3 border rounded hover:bg-accent transition">
              <span className="text-md font-semibold">{name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
