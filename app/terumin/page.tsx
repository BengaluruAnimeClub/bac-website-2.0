import "@/styles/mdx.css";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terumin",
  description: "Namma Bengaluru Techie and Bengaluru Anime Club (BAC) Mascot",
};

export default function TeruminPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <h1 className="text-3xl font-black text-center mb-6">Terumin「テルミン」</h1>
      
      <p className="m-4 text-center text-lg">Introducing Namma Bengaluru Techie and Bengaluru Anime Club (BAC) Mascot: Terumin</p>
      <div className="flex justify-center my-6">
        <Image 
          src="/images/terumin/terumin-poster.webp" 
          alt="Terumin Poster" 
          width={541}
          height={768}
          className="rounded-xl"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">Terumin Character Profile</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Favourite colour:</strong> Yellow</li>
        <li><strong>Fashion choices:</strong> Hoodie over casual clothes</li>
        <li><strong>Favourite anime:</strong> Serial Experiments Lain, Ghost in the Shell</li>
        <li><strong>Favourite media:</strong> Mr. Robot, XKCD</li>
        <li><strong>Favourite food:</strong> Unpopped kernels of popcorn</li>
        <li><strong>Hobby:</strong> Terumin-ally online, bash-ing, patching KDE2 under FreeBSD</li>
        <li><strong>Origin:</strong> Twitch e-girl who became so brainrotted that she got isekai-ed trying to write a business enquiry e-mail in formal English and transmigrated into her own computer</li>
        <li><strong>Catchphrase:</strong> “Hmm, you don’t know me? Tehe-min &gt; _ \\\  テルミン ある! よろしく”</li>
      </ul>

      <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
        <p className="text-lg text-justify">
        Terumin's design is a tribute to the city, reflecting two of its core aspects: its gardens and its role as an IT hub. As such, her design features a consistent pink theme across all iterations, which also aligns with the BAC branding, and is inspired by Bangalore’s cherry blossom (Tabebuia rosea).  My favourite details on her are her lashes and blush marks made of pink petals. Her yellow highlights are in honour of my good friend Dixi, who painstakingly got me through this project. Teru's beanie and asymmetric haircut reference Lain from Serial Experiments Lain, as a nod to her "terminally online" persona. Her jumper and oversized jacket are taken from techwear. Last and most importantly, I wanted her to look like an actual resident of the south. Her skin tone was inspired by my best friend Ila's own representations of brown girls in their art. 
        </p>
        <Image 
          src="/images/terumin/terumin.webp" 
          alt="Terumin Poster" 
          width={224} 
          height={256} 
          className="rounded-xl"
        />
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-4">Iterations</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[...Array(4)].map((_, index) => (
          <Image 
            key={index} 
            src="/images/terumin/terumin.webp" 
            alt={`Terumin Iteration ${index + 1}`} 
            width={128} 
            height={256} 
            className="rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}
