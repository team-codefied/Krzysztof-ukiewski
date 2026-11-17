export const SITE = {
  title: "The World That Could Be",
  subtitle: "Future We Dare to Simulate",
  fullTitle: "The World That Could Be: Future We Dare to Simulate",
  author: "Krzysztof Łukiewski",
  description:
    "A thought-provoking fictional exploration of technology, civilization, human potential, and the future we dare to imagine.",
  email: "krzysztoflukiewski@gmail.com",
  phone: "+48 504588665",
  phoneHref: "+48504588665",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;

export const LINKS = {
  kindle: "https://www.amazon.com/dp/B0GY9MZ1K2",
  spotify: "https://open.spotify.com/show/5DMp9I4BPw8PTHpQIgARD2",
  pressRelease:
    "https://www.openpr.com/news/4683253/can-we-reimagine-the-future-of-humanity-krzysztof-lukiewski",
} as const;

/** Social URLs were not supplied. They are read from env and never invented. */
export const SOCIAL = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || null,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about-the-book", label: "About the Book" },
  { href: "/about-the-author", label: "About the Author" },
  { href: "/contact", label: "Contact" },
] as const;
