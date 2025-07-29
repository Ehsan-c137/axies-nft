"use client";

import { ThemedImage } from "@ui/image";
import Link from "next/link";
import SendIcon from "@icons/send-icon";
import SendHorizontalIcon from "@icons/send-horizontal-icon";
import TwitterIcon from "@icons/socials/twitter-icon";
import TelegramIcon from "@icons/socials/telegram-icon";
import DiscordIcon from "@icons/socials/discord-icon";
import YoutubeIcon from "@icons/socials/youtube-icon";
import FacebookIcon from "@icons/socials/facebook-icon";
import InstagramIcon from "@icons/socials/instagram-icon";

export function Footer() {
  return (
    <footer className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 px-4 md:px-6 lg:px-8 py-20 bg-[var(--background)] text-[var(--foreground)] -shadow-2xl max-w-[1920px] shadow-[-1px_-14px_76px_24px_rgba(205,205,205,0.6)] dark:shadow-[-1px_-14px_76px_24px_rgba(0,0,0,0.6)]  mt-20">
      <div className="flex flex-col gap-5">
        <div className="h-[40px] w-[126px] relative">
          <ThemedImage
            srcLight="/assets/logo/logo_light.webp"
            srcDark="/assets/logo/logo_dark.webp"
            alt="axies nft logo"
            width={0}
            height={0}
            className="w-full h-full top-0 left-0 object-cover"
            unoptimized
          />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nam
          soluta iste porro blanditiis rem corporis, ex unde dolorum quos!
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <p>My Account</p>
        <div className="grid grid-cols-1 gap-2">
          <Link href="#" className="link_hover">
            Authors
          </Link>
          <Link href="#" className="link_hover">
            Collection
          </Link>
          <Link href="#" className="link_hover">
            Authors Profile
          </Link>
          <Link href="#" className="link_hover">
            Authors
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <p>Resources</p>
        <div className="grid grid-cols-1 gap-2">
          <Link href="#" className="link_hover">
            Help & Support
          </Link>
          <Link href="#" className="link_hover">
            Live Auctions
          </Link>
          <Link href="#" className="link_hover">
            Item Details
          </Link>
          <Link href="#" className="link_hover">
            Activity
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <p>My Account</p>
        <div className="grid grid-cols-1 gap-2">
          <Link href="#" className="link_hover">
            Explore
          </Link>
          <Link href="#" className="link_hover">
            Contact Us
          </Link>
          <Link href="/blog" className="link_hover">
            Our Blog
          </Link>
          <Link href="#" className="link_hover">
            FAQ
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <p>Subscribe us</p>
        <form className="border-[1px] pl-3 flex items-center rounded-sm focus-within:border-[var(--primary)] transition">
          <input
            placeholder="info@youreamil.com"
            className="outline-none py-2 flex-1"
          />
          <button className="bg-[#5142FB] flex items-center justify-center w-full h-full max-w-[50px] px-3 rounded-r-sm rounded-br-sm">
            <SendHorizontalIcon />
          </button>
        </form>
        <ul className="flex items-center flex-wrap gap-4">
          {[
            <TwitterIcon />,
            <TelegramIcon />,
            <DiscordIcon />,
            <YoutubeIcon />,
            <FacebookIcon />,
            <InstagramIcon />,
          ].map((item, index) => {
            const color = [
              "#1da1f2",
              "#0088cc",
              "#5865f2",
              "#FF0033",
              "#3b5998",
              "#ec407a",
            ];
            return (
              <SocialWrapper
                key={index}
                path={"/"}
                onHoverBackground={color[index]}
              >
                {item}
              </SocialWrapper>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}

const SocialWrapper = ({
  children,
  path,
  onHoverBackground,
}: {
  path: string;
  children: React.ReactNode;
  onHoverBackground?: string;
}) => (
  <li
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = onHoverBackground || "";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "";
    }}
    style={{
      transition: "all 300ms ease-in-out",
    }}
    className={`w-10 h-10 flex items-center justify-center cursor-pointer bg-[var(--card)] border-[1px] rounded-xl hover:rounded-[50px]`}
  >
    <Link href={path}>{children}</Link>
  </li>
);
