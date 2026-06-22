export interface Experience {
  id: string;
  logo: string;
  title: string;
  company: string;
  date: string;
  bullets: string[];
}

export interface Project {
  id: string;
  title: string;
  type: string;
  summary: string;
  tech: string[];
  image: string;
  url: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  date: string;
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    logo: "/images/experience/cybersama-technology.png",
    title: "Web Developer",
    company: "Cybersama Technology",
    date: "Present",
    bullets: [
      "Developed 25+ custom WordPress websites for clients across industries",
      "Integrated WooCommerce, ACF, and Elementor for scalable CMS workflows",
      "Built multilingual websites using WPML and custom logic",
    ],
  },
  {
    id: "exp-2",
    logo: "/images/experience/nurulfikri-academy.jpeg",
    title: "UI/UX Designer",
    company: "Nurulfikri Academy",
    date: "May 2024",
    bullets: [
      "Designed end-to-end user flows and high-fidelity prototypes in Figma",
      "Conducted usability testing with 50+ participants to refine product decisions",
      "Collaborated with developers to ensure pixel-perfect implementation",
    ],
  },
  {
    id: "exp-3",
    logo: "WV",
    title: "Frontend Developer",
    company: "WebVibe Agency",
    date: "Jun 2021",
    bullets: [
      "Built responsive React and Next.js applications for e-commerce clients",
      "Implemented Framer Motion animations increasing user engagement by 35%",
      "Mentored junior developers on modern JavaScript patterns",
    ],
  },
  {
    id: "exp-4",
    logo: "IV",
    title: "Product Design Intern",
    company: "InVision (Remote)",
    date: "Apr 2020",
    bullets: [
      "Supported senior designers in creating design system components",
      "Prototyped mobile-first interaction patterns for 3 product features",
      "Documented design decisions and contributed to design wiki",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "EcoCart – WooCommerce Store",
    type: "E-commerce Website | WordPress + WooCommerce",
    summary:
      "Full eco-product store with cart animations, and payment integration.",
    tech: ["WordPress", "WooCommerce", "ACF", "Elementor"],
    image: "/images/project/project-1.avif",
    url: "#",
  },
  {
    id: "proj-2",
    title: "MindSpace – Mental Health Blog",
    type: "Custom Blog Platform | WordPress",
    summary:
      "Fast, SEO-friendly blog with clean UI, dynamic content, and newsletter integration.",
    tech: ["WordPress", "WPBakery", "Mailchimp", "RankMath SEO"],
    image: "/images/project/project-2.avif",
    url: "#",
  },
  {
    id: "proj-3",
    title: "TaskFlow App – UI/UX Case Study",
    type: "Productivity App UI | Framer + Figma",
    summary:
      "Complete UI/UX design for a task manager app with prototypes and usability testing.",
    tech: ["Figma", "Framer", "Maze"],
    image: "/images/project/project-3.avif",
    url: "#",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Olivia Brooks",
    role: "Marketing Manager",
    avatar: "/avatars/olivia.png",
    quote:
      "Afif Ramadhan is our go-to expert for all things WordPress. He built a custom site for our brand that looks incredible and is super easy to manage. His communication and turnaround time are top-notch.",
    rating: 5,
    date: "Jan 15, 2022",
  },
  {
    id: "test-2",
    name: "Michael Carter",
    role: "CTO",
    avatar: "/avatars/michael.png",
    quote:
      "Afif Ramadhan transformed our outdated dashboard into a sleek, user-friendly interface that our users love. His approach to UX is both strategic and empathetic — highly recommended!",
    rating: 5,
    date: "Nov 20, 2024",
  },
  {
    id: "test-3",
    name: "Emily Chen",
    role: "Founder",
    avatar: "/avatars/emily.png",
    quote:
      "We hired Afif Ramadhan for a time-sensitive landing page project, and he delivered it ahead of schedule with pixel-perfect precision.",
    rating: 5,
    date: "Oct 23, 2025",
  },
];

export const marqueeItems = [
  "High conversion",
  "Accessible UI",
  "User-First",
  "Fast delivery",
];

export const iconNodes = [
  { id: "wordpress", label: "WordPress", emoji: "🌐", className: "absolute top-2 left-[8%]" },
  { id: "framer",    label: "Framer",    emoji: "◼",  className: "absolute top-[38%] left-[20%]" },
  { id: "figma",     label: "Figma",     emoji: "🎨", className: "absolute bottom-2 left-[8%]" },
  { id: "screen",   label: "Screenshot",emoji: "📷", className: "absolute bottom-[32%] left-[32%]" },
  { id: "xd",       label: "Adobe XD",  emoji: "🟣", className: "absolute top-2 right-[8%]" },
  { id: "html5",    label: "HTML5",     emoji: "🟠", className: "absolute top-[38%] right-[20%]" },
  { id: "js",       label: "JavaScript",emoji: "🟡", className: "absolute bottom-2 right-[8%]" },
  { id: "css3",     label: "CSS3",      emoji: "🔵", className: "absolute bottom-[32%] right-[32%]" },
];
