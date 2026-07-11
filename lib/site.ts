export const siteConfig = {
  name: "How to thrive not survive",
  tagline:
    "A personal blog about women's health, menstrual cycles, and thriving.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  about:
    "Hi, I'm R — just a girl who loves feeling good. This blog is my space for self-research on healthy habits, hormonal health, and living in tune with my menstrual cycle.",
  currently: {
    listening: "Whatever's on repeat this week",
    reading: "Cycle-syncing research and old blog drafts",
    feeling: "Curious and creative",
  },
  blogroll: [
    { name: "Instagram", href: "https://www.instagram.com/howtothrivenotsurvive" },
    { name: "localghost", href: "https://localghost.dev/blog/" },
    {
      name: "Hyperbole and a Half",
      href: "https://hyperboleandahalf.blogspot.com/",
    },
    { name: "Pink is the New Book", href: "https://pinkisthenewbook.com/" },
  ],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/feed.xml", label: "RSS" },
];
