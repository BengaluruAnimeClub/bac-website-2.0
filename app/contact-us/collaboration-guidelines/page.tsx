import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import Link from "next/link";
import { cn, sortPosts } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Collaboration Guidelines",
  description: "Guidelines and requirements for collaborations with the BAC Team. Please contact us through our official email.",
};


export default async function GuidelinesPage() {

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <h1 className="block font-bold text-2xl lg:text-4xl text-center mb-4">
        Collaboration Guidelines
      </h1>

      <div className="text-medium text-lg py-4">

        <p>
          BAC welcomes collaborations with other communities, organizations, and events that align with our values and interests as an anime club. 
          For promotional collaborations, please ensure that your content/event meets the following criteria.
        </p>

        <h3 className="font-bold text-2xl py-4">
          PG-13
        </h3>

        <p>Avoid explicit language, sexual content, graphic violence, and drug-related content. Any portrayal of adult themes should be mild and not explicit.</p>
    
        <h3 className="font-bold text-2xl py-4">
          Respectful and Inclusive
        </h3>

        <p>Content should be respectful and inclusive of all gender identities, races, religions (or lack thereof), and sexual orientations.</p>

        <h3 className="font-bold text-2xl py-4">
          Original Content
        </h3>

        <p>The content you share must not contain copyrighted music, videos, images, or text without proper permission or licenses. Examples that follow are representative, and not meant to target any third party.</p>

        <ul className = "unstyled mt-4">
          <li>🚫 Official artwork (of anime, manga) without permission for promoting business or event</li>
          <li>🚫 Any mentions of IP, either in name or via symbols or other imagery without permission (e.g. “One Piece”)</li>
          <img 
            src="/images/collaboration-guidelines/01.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block"
          />
          <li>🚫 Fan art using licensed characters (Naruto, Dragon Ball, etc.) for promoting events</li>
          <img 
            src="/images/collaboration-guidelines/02.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block"
          />
          <li>🚫 Unofficial screenings of movies, TV, anime, etc.</li>
          <img 
            src="/images/collaboration-guidelines/03.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block"
          />
          <li>🚫 Mass-produced unofficial merchandise (T-shirts, posters, keychains, 3D printed minifigures)</li>
          <img 
            src="/images/collaboration-guidelines/04.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block sm:hidden"
          />
          <img 
            src="/images/collaboration-guidelines/05.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block sm:hidden"
          />
          <img 
            src="/images/collaboration-guidelines/04-05.webp" 
            className="w-full md:w-5/6 mx-auto my-4 hidden sm:block"
          />
          <li>✅ Key artwork of anime, manga for news and information</li>
          <img 
            src="/images/collaboration-guidelines/06.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block"
          />
          <li>✅ Key artwork from video games for promoting esports events</li>
          <img 
            src="/images/collaboration-guidelines/07.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block sm:hidden"
          />
          <img 
            src="/images/collaboration-guidelines/08.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block sm:hidden"
          />
          <img 
            src="/images/collaboration-guidelines/07-08.webp" 
            className="w-full md:w-11/12 mx-auto my-4 hidden sm:block"
          />
          <li>✅ Official collaborations with official key artwork</li>
          <img 
            src="/images/collaboration-guidelines/09.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block"
          />
          <li>✅ Official collaborations with fan artwork</li>
          <img 
            src="/images/collaboration-guidelines/10.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block"
          />
          <li>✅ Fan artwork that is not mass produced or commercialized, when promoting artists</li>
          <img 
            src="/images/collaboration-guidelines/11.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block"
          />
          <li>✅ Cosplayers, meme formats in general</li>
          <img 
            src="/images/collaboration-guidelines/12.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block sm:hidden"
          />
          <img 
            src="/images/collaboration-guidelines/13.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block sm:hidden"
          />
          <img 
            src="/images/collaboration-guidelines/12-13.webp" 
            className="w-full md:w-5/6 mx-auto my-4 hidden sm:block"
          />
        </ul>

        <h3 className="font-bold text-2xl py-4">
          Intellectual Property
        </h3>

        <p>Do not use trademarks, logos, or branded content without explicit permission from the owner.</p>
        <p>E.g. Must be approved by Japan Foundation, Japan Habba, Japanese Film Festival team</p>
        <img 
            src="/images/collaboration-guidelines/14.webp" 
            className="w-full md:w-1/2 mx-auto my-4 block"
          />

        <h3 className="font-bold text-2xl py-4">
          Credit and Attribution
        </h3>

        <p>Always give credit to creators and sources of any third-party content used. Tag or mention the original creators.</p>

        <h3 className="font-bold text-2xl py-4">
          Sponsored Content
        </h3>

        <p>Clearly disclose any sponsored content or paid partnerships by stating it as such.</p>

        <h3 className="font-bold text-2xl py-4">
          Consent from all Parties
        </h3>

        <p>Obtain consent from individuals appearing in the content, particularly if they are minors. Respect privacy and avoid sharing personal information without permission.</p>

      </div>
  </div>
  );
}
