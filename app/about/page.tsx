import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileCard from "@/components/ui/profilecard";
import AffiliatedCard from "@/components/ui/affiliatedcard";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BAC · About",
  description: "Meet the team behind Bengaluru Anime Club (BAC)",
};

const profiles = [
  {
    name: "dittu (HKS)",
    designation: "Advisor/Yapologist",
    imageSrc: "/images/pfps/hks.webp",
    bio: "Washed up admin and quizzer/quizmaster. Used to conduct Reikai with Sakaido. I like to yap about Idols and visual novels.",
  },
  {
    name: "Dx",
    designation: "Events/Meetups",
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
    designation: "Design/Publicity",
    imageSrc: "/images/pfps/steve.webp",
    bio: "Joined BAC for the love of anime, stayed for the amazing community. I like all things tech and design.",
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
    name: "Ding Dong",
    designation: "Meetups",
    imageSrc: "/images/pfps/dingdong.webp",
    bio: "Biggest barbie fanboy!!",
  },
  {
    name: "Debarka",
    designation: "Moderation/Meetups",
    imageSrc: "/images/pfps/debarka.webp",
    bio: "Long time BAC member here! Avid figurine and manga collector. Ocassionally active, generally lurking in the anime, manga, cinema and collectibles groups. Hit me up if you wanna talk about anything anime.",
  },
  {
    name: "Christy",
    designation: ".-.",
    imageSrc: "/images/pfps/christy.webp",
    bio: "Member since 2013, cosplayer by passion, foodie and music buff by obsession, and now your friendly neighborhood admin! Whether it's anime marathons, music jams, or cosplay chaos — I’m always in for the ride. Catch me where the fandoms collide! There's no trash 'cannot', only trash CAN!!!",
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
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start pb-5">
        <p className="text-muted-foreground text-lg py-4">
        <b>Bengaluru Anime Club (BAC)</b> is a community of anime and manga enthusiasts in Bengaluru. We welcome everyone from seasoned fans to newcomers. Join us for meetups, fan screenings, cosplay events, anime music quizzes, art groups, and to connect with fellow fans of anime and manga!
        <br/><br/>
        For a list of all contributors to the site, check out <Link href="/author" className="underline">this page</Link>.
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
