import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileCard from "@/components/ui/profilecard";
import AffiliatedCard from "@/components/ui/affiliatedcard";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BAC · About",
  description: "Meet the team behind Bengaluru Anime Club (BAC)",
};

const profiles = [
  {
    name: "medha/ᐠ.ꞈ.ᐟ\\",
    designation: "Support/Moderation/Online",
    imageSrc: "/images/pfps/medha.webp",
    bio: "Cat enthusiast, purrveyor of all things cute 🌸", 
  },
  {
    name: "dittu (HKS)",
    designation: "Advisor/Yapologist",
    imageSrc: "/images/pfps/hks.webp",
    bio: "Washed up admin and quizzer/quizmaster. Used to conduct Reikai with Sakaido. I like to yap about Idols and visual novels.",
  },
  {
    name: "Dx",
    designation: "Events/Meetups/Screenings",
    imageSrc: "/images/pfps/wolf.webp",
    bio: "ZERO CHILL",
  },
  {
    name: "Andy Windbreaker",
    designation: "Moderation/Semi-retired",
    imageSrc: "/images/pfps/andy.webp",
    bio: "Breaking wind since 1993. Hit me up to have your wind broken! Dabbled in various activiites in the past — writing a manga-like comicbook, amateur cosplay, music blogging, sci-fi writing, making short films, etc. Most days now are spent talking about things other people have made.",
  },
  {
    name: "Steve",
    designation: "Publikitty",
    imageSrc: "/images/pfps/steve.webp",
    bio: "Joined BAC for the love of anime, stayed for the amazing community. I like all things tech and design.",
  },
  {
    name: "Rohit",
    designation: "Meetups",
    imageSrc: "/images/pfps/rohit.webp",
    bio: "Trying to adult, but mostly just leveling up in games and life",
  },
  {
    name: "Sakaido",
    designation: "Admin/Sensei",
    imageSrc: "/images/pfps/sakaido.webp",
    bio: "Former admin, now an advisor from afar. Probably best known for organising BAC Reikai and conducting quizzes. May or may not have designed the test for new admins. If I could only choose five essential works, they would be: Mushishi, Yuru Camp, Shinsekai Yori, Maiko-san chi no Makanai-san, and Hanshin: Half God. If you're reading this, check one of these out. You will thank me later.", 
  },
  {
    name: "Aravind",
    designation: "Web/Archival",
    imageSrc: "/images/pfps/aravind.webp",
    bio: "I'm not a bad slime", 
  },
  {
    name: "Atharva",
    designation: "Publicity (caped crusader)",
    imageSrc: "/images/pfps/arthava.webp",
    bio: "I like my planet the same way like my cereal: with no aliens on it.", 
  },
  {
    name: "Futtaim",
    designation: "Events/Meetups (from the shadows)",
    imageSrc: "/images/pfps/futtaim.webp",
    bio: "When everything feels like the movies. Yeah you bleed, just to know you’re alive.",
  },
  {
    name: "EnigmaDB",
    designation: "Publikitty",
    imageSrc: "/images/pfps/harish.webp",
    bio: "Have fun people.",
  },
  {
    name: "Rutu (ルトゥ)",
    designation: "Archival",
    imageSrc: "/images/pfps/rutu.webp",
    bio: "Initially joined BAC to spread the Haikyuu!!/Chihayafuru propaganda, but was later revealed to be a generic sports/romance fan. You can find me lurking on the BAC Manga WhatsApp group giving random romance recommendations for all demographics (I also throw in some wack ones from time to time). Drop on by to chat! My favourite quote obviously comes from Haikyuu!! - 村人 B も 戦えます。Check it out if you haven't already (and do it again if you already have).",
  },
  {
    name: "Viraj",
    designation: "Web",
    imageSrc: "/images/pfps/viraj.webp",
    bio: "I like computers, music & night skies",
  },
  {
    name: "Keerthana",
    designation: "Media/Moderation",
    imageSrc: "/images/pfps/keerthana.webp",
    bio: "Part of the support team and moderation. Respond to queries related to any event, moderate the groups.",
  },
  {
    name: "Pranav Nayak",
    designation: "Moderation",
    imageSrc: "/images/pfps/pranav.webp",
    bio: "When all you have is a hammer, find more tools dammit",
  },
  {
    name: "Shreyas",
    designation: "Treasurer/Events",
    imageSrc: "/images/pfps/shreyas.webp",
    bio: "I try to manage our ever dwindling treasury in order to keep the great events going. You can find me lurking on lounge, gaming and anime. Feel free to hmu for literally anything. Enjoy meeting you guys in our events!",
  },
];

const affiliated = [
  {
    name: "Japan Habba",
    imageSrc: "/images/affiliated/japan-habba.svg",
    url: "https://japanhabba.org/index.html",
  },
  {
    name: "Bengaluru Foodie Community",
    imageSrc: "/images/affiliated/bfc.jpeg",
    url: "https://chat.whatsapp.com/FJLaNpIeu2aAtD1ZWERNV4",
  },
  {
    name: "Minna Shuugou",
    imageSrc: "/images/affiliated/msc.png",
    url: "https://minnashuugou.com/",
  },
  {
    name: "AniSync",
    imageSrc: "/images/affiliated/anisync-red-1.png",
    url: "https://linktr.ee/anisync",
  },
  {
    name: "Pokémon GO Bengaluru",
    imageSrc: "/images/affiliated/pogoblr.png",
    url: "https://www.instagram.com/pogoblr",
  },
];


export default async function AboutPage() {
  return (
    <div className="container max-w-5xl py-6 lg:py-10">
      {/* <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            About Us
          </h1>
        </div>
      </div> */}
      {/* <hr className="my-4" /> */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start pb-5">
        <p className="text-muted-foreground text-lg py-4">
        <b>Bengaluru Anime Club (BAC)</b> is a community of anime enthusiasts based in the city of Bengaluru. Whether you’re a seasoned otaku or new to the world of anime and manga, this club offers a welcoming space to connect with fellow fans, share your love for Japanese animation, and explore diverse genres and series.
        <br/>
        <br/>
        From regular meetups and watch parties to discussions on the latest episodes, cosplaying events, and manga swaps, BAC fosters a sense of belonging among anime fans of all ages. We also host special screenings, anime trivia nights, and cultural events to celebrate the rich art and storytelling from Japan.
        <br/>
        <br/>
        Join us to dive deep into the world of anime, make new friends, and be part of a growing community that shares your passion for all things anime!
        </p>
      </div>
      
      <h2 className="block font-extrabold text-3xl lg:text-4xl mb-8 text-center">
            Meet the Team
      </h2>
      {/* <hr className="my-4" /> */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-3 w-full max-w-[1200px] mx-auto space-y-3 pb-12">
          
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              name={profile.name}
              designation={profile.designation}
              imageSrc={profile.imageSrc}
              bio={profile.bio}
            />
          ))}
      </div>
      <h2 className="block font-extrabold text-3xl lg:text-4xl mb-8 text-center">
            Affiliated Groups
      </h2>
      <div className="columns-2 sm:columns-2 md:columns-2 lg:columns-3 gap-3 w-fit max-w-[1500px] mx-auto space-y-3 ">

          {affiliated.map((group, index) => (
            <AffiliatedCard
              key={index}
              name={group.name}
              imageSrc={group.imageSrc}
              url={group.url}
            />
          ))}
      </div>
    </div>
  );
}
