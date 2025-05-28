import { fetchAuthors } from "@/lib/contentful-authors";
import Link from "next/link";
import Image from "next/image";

export default async function AuthorsListPage() {
  const authors = await fetchAuthors();
  return (
    <div className="container max-w-3xl py-8 px-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Authors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {authors.map((author: any) => {
          const { name, slug, avatar } = author.fields;
          return (
            <Link key={slug} href={`/author/${slug}`} className="flex items-center gap-4 p-4 border rounded hover:bg-accent transition">
              {avatar?.fields?.file?.url && (
                <Image
                  src={avatar.fields.file.url.startsWith('http') ? avatar.fields.file.url : `https:${avatar.fields.file.url}`}
                  alt={name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <span className="text-lg font-semibold">{name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
