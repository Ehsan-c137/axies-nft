import Link from "next/link";

const NAV_CONFIG: Array<{ name: string; href: string }> = [
  {
    name: "Explore",
    href: "/explore",
  },
  {
    name: "item",
    href: "/item/adsf",
  },

  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "profile",
    href: "/profile/adsf",
  },
];

export const NavList = () => (
  <nav className="hidden items-center gap-6 lg:gap-8 -translate-x-1/2 left-1/2 absolute md:flex">
    {NAV_CONFIG.map((nav) => (
      <Link
        key={nav.name}
        href={nav.href}
        className="text-lg font-semibold text-gray-800 dark:text-gray-200 link_hover"
      >
        {nav.name}
      </Link>
    ))}
  </nav>
);
