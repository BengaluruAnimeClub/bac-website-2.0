import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import Link from "next/link";
import { cn, sortPosts } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MdEmail } from "react-icons/md";

export const metadata: Metadata = {
  title: "BAC · Contact Us",
  description: "Get in touch with the BAC Team! Contact us through our official email.",
};


export default async function ContactUsPage() {

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '7px',
    border: '0px solid #bbb',
    borderRadius: '5px',
    marginBottom: '5px',
    width: '350px',
  };

  const purposeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    border: '0px solid #bbb',
    borderRadius: '10px',
    marginBottom: '-5px',
    marginTop: '-10px',
    width: '350px',
    fontWeight: '400',
  };

  const textStyle = {
    fontWeight: '500',
  };

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
    <h1 className="block font-black text-4xl lg:text-5xl text-center">
      Contact Us
    </h1>

    <div style={{ display: 'flex', justifyContent: 'center' }}>

      <ul style={{ listStyleType: 'none', padding: 30 }}>
        
        <br/>
        
        <li style = {purposeStyle}>
          Collaborations & Marketing
        </li>

        <li style = {buttonStyle}>
          <Link href="mailto:pr@bac.moe" target="_blank"
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full")}>
            <MdEmail size = {30}/>&nbsp;&nbsp;<span style={textStyle}>pr@bac.moe</span>
          </Link>
        </li>

        <br/>

        <li style = {purposeStyle}>
          Events Inquiries
        </li>

        <li style = {buttonStyle}>
          <Link href="mailto:events@bac.moe" target="_blank"
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full")}>
            <MdEmail size = {30}/>&nbsp;&nbsp;<span style={textStyle}>events@bac.moe</span>
          </Link>
        </li>

        <br/>

        <li style = {purposeStyle}>
          General Inquiries & Feedback
        </li>

        <li style = {buttonStyle}>
          <Link href="mailto:support@bac.moe" target="_blank"
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full")}>
            <MdEmail size = {30}/>&nbsp;&nbsp;<span style={textStyle}>support@bac.moe</span>
          </Link>
        </li>

      </ul>

    </div>

    For promotional collaborations, please check out our <a href="/contact-us/collaboration-guidelines">&nbsp;<u>collaboration guidelines page</u></a>.
  </div>
  );
}
