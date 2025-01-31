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
      <h1 className="text-3xl font-black text-center mb-6">Terumin<br />「テルミン」</h1>
      
      <p className="m-4 text-center text-lg">Introducing Bengaluru Anime Club (BAC) mascot: Terumin</p>
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
        <li><strong>Catchphrase:</strong> “Hmm, you don&apos;t know me? Tehe-min &gt; _ \\\  テルミン ある! よろしく”</li>
      </ul>

      <p className="my-4">2024 saw big changes and much growth in BAC, and we welcome the coming year with the launch of our very own mascot — Terumin!</p>
      <p>Terumin initially came to life when the admins at BAC were throwing ideas to describe what mascot would best represent BAC. One such idea was to use the simple motif of a terminal, not unfamiliar to the average Bengaluru techie, which eventually became a play on her name and signature catchphrase. (テルミン ある) </p>
      <p className="mt-4">Terumin&apos;s design takes inspiration from two motifs connecting Bengaluru and Japan — the cherry blossom and computer technology. Her clothes use shades of pink and brown, and have prominent cherry flowers. Her face is based on the appearance of a blank terminal ( &gt;_ &nbsp;), and her clothes contain the hash-bang ( #! ) sequence that starts a script file.</p>

      <div className="flex flex-col md:flex-row items-center gap-6 my-4">
        <div className="p-3 border rounded-xl shadow dark:bg-[#191919] border-[#C83A77]">
          <p className="text-xl text-center"><strong>Artist Comment</strong></p>
          <p className="mt-4 text-justify">
          Terumin&apos;s design is a tribute to the city, reflecting two of its core aspects: its gardens and its role as an IT hub. As such, her design features a consistent pink theme across all iterations, which also aligns with the BAC branding, and is inspired by Bangalore&apos;s cherry blossom <em>(Tabebuia rosea)</em>.  My favourite details on her are her lashes and blush marks made of pink petals. Her yellow highlights are in honour of my good friend Dixi, who painstakingly got me through this project. Teru&apos;s beanie and asymmetric haircut reference Lain from Serial Experiments Lain, as a nod to her &ldquo;terminally online&rdquo; persona. Her jumper and oversized jacket are taken from techwear. Last and most importantly, I wanted her to look like an actual resident of the south. Her skin tone was inspired by my best friend Ila&apos;s own representations of brown girls in their art. 
          </p>
        </div>
        <Image 
          src="/images/terumin/terumin.webp" 
          alt="Terumin Poster" 
          width={224} 
          height={256} 
          className="rounded-xl"
        />
      </div>

      <p className="text-lg mt-4"><strong>Artist:</strong> Pratya Kashyap</p>
      <p className="text-lg"><strong>Instagram:</strong> <a href="https://www.instagram.com/inkspratt/" target="_blank" rel="noopener noreferrer">@inkspratt</a></p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 place-items-center">
        <Image 
          src="/images/terumin/terumin-iteration1.webp" 
          alt={`Terumin Iteration 1`} 
          width={128} 
          height={256}
        />
        <Image 
          src="/images/terumin/terumin-iteration2.webp" 
          alt={`Terumin Iteration 2`} 
          width={164} 
          height={256}
        />
        <Image 
          src="/images/terumin/terumin-iteration3.webp" 
          alt={`Terumin Iteration 3`} 
          width={150} 
          height={256}
        />
        <Image 
          src="/images/terumin/terumin.webp" 
          alt={`Terumin`} 
          width={140} 
          height={256}
        />
      </div>
      <p className="mt-2 text-center text-lg">Iterations of Terumin&apos;s design</p>
    </div>
  );
}
