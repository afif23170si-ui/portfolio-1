# PRD — ProfileX Portfolio Replication
**Stack Target:** Next.js 14 (App Router) + Tailwind CSS v3 + Framer Motion v11  
**Reference:** Framer Portfolio Site — "ProfileX" by Julian Scott  
**Sections Covered:** 9 sections dari screenshot yang dianalisis  
**Dibuat:** 2026-06-21  

---

## Daftar Isi
1. [Design Tokens](#1-design-tokens)
2. [Arsitektur File & Routing](#2-arsitektur-file--routing)
3. [Component Structure — Hirarki HTML/JSX](#3-component-structure--hirarki-htmljsx)
4. [Animation Spec — Framer Motion](#4-animation-spec--framer-motion)
5. [Section-by-Section Breakdown](#5-section-by-section-breakdown)

---

## 1. Design Tokens

### 1.1 Color Palette

```js
// tailwind.config.js — extend colors
module.exports = {
  theme: {
    extend: {
      colors: {
        // === PRIMARY BACKGROUNDS ===
        'bg-hero':    '#1a2510', // Hijau gelap pekat — Hero section background
        'bg-dark':    '#0d0d0d', // Hitam murni — Main background (sections bawah)
        'bg-card':    '#141414', // Hitam sedikit lebih terang — Card backgrounds
        'bg-surface': '#1c1c1c', // Surface untuk input fields & form cards
        'bg-pill':    '#1f2916', // Hijau sangat gelap — contact info pill di Hero

        // === ACCENT / PRIMARY ===
        'accent':       '#c8f135', // Kuning-Hijau neon — PRIMARY ACCENT
        'accent-hover': '#b8e020', // Lebih gelap saat hover
        'accent-muted': '#8aad12', // Digunakan untuk icon warna di contact pill

        // === TEXT COLORS ===
        'text-primary':   '#ffffff',  // Putih murni — heading utama
        'text-secondary': '#b8b8b8',  // Abu-abu terang — body text, paragraf
        'text-muted':     '#6b7280',  // Abu-abu gelap — placeholder, tanggal kecil
        'text-accent':    '#c8f135',  // Accent untuk role title ("A Full Stack Developer")

        // === BORDERS ===
        'border-default': '#2a2a2a',  // Border tipis card & input
        'border-accent':  '#c8f135',  // Border accent — active experience card, input focus
        'border-hero':    '#3a4a20',  // Border subtle di Hero section
        
        // === NAVBAR ===
        'nav-bg':     'rgba(26,37,16,0.85)', // Semi-transparan saat scroll

        // === MARQUEE STRIPES ===
        'stripe-white': '#ffffff', // Stripe atas (background putih, text hitam)
        'stripe-lime':  '#c8f135', // Stripe bawah (background lime, text hitam)
      },
    },
  },
};
```

### 1.2 Typography

```js
// tailwind.config.js — typography tokens
// Google Font: "Inter" — weight 300, 400, 500, 600, 700, 800
// Import di layout.tsx: import { Inter } from 'next/font/google'

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // === DISPLAY / HERO ===
        'hero-name':   ['72px', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '700' }],
        // → "Julian Scott" — ~72-80px, bold, tight tracking
        
        'hero-greeting': ['22px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '400' }],
        // → "Hey, 👋 I am" — ~22px regular

        'hero-role':   ['18px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '700' }],
        // → "A Full Stack Developer" — 18px bold, warna accent

        'hero-body':   ['16px', { lineHeight: '1.65', letterSpacing: '0', fontWeight: '400' }],
        // → Paragraf deskripsi di hero
        
        // === SECTION HEADINGS ===
        'section-title': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }],
        // → "Career Goal", "Experiences", "Featured Projects", "What Clients Say" — ~56px
        
        // === COMPONENT LABELS ===
        'card-title':    ['18px', { lineHeight: '1.3', fontWeight: '700' }],
        'card-subtitle': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm':       ['14px', { lineHeight: '1.65', fontWeight: '400' }],
        'label':         ['12px', { lineHeight: '1', fontWeight: '500', letterSpacing: '0.05em' }],

        // === MARQUEE TICKER ===
        'marquee-text': ['28px', { lineHeight: '1', fontWeight: '700' }],

        // === NAVBAR ===
        'nav-brand': ['22px', { lineHeight: '1', fontWeight: '600' }],

        // === FOOTER ===
        'footer-copy': ['13px', { lineHeight: '1', fontWeight: '400' }],
      },
    },
  },
};
```

### 1.3 Spacing, Border Radius & Shadows

```js
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        'card':    '16px', // rounded-2xl — kartu project, kartu experience
        'pill':    '50px', // rounded-full — contact pill, date badge
        'icon':    '14px', // rounded-[14px] — app icon di Career Goal
        'btn':     '10px', // rounded-[10px] — tombol CTA "View Live Site"
        'input':   '10px', // rounded-[10px] — input fields form
      },
      boxShadow: {
        'glow-accent': '0 0 30px rgba(200, 241, 53, 0.15)',
        'card-hover':  '0 8px 40px rgba(0,0,0,0.5)',
        'nav':         '0 1px 0 rgba(255,255,255,0.06)',
      },
    },
  },
};
```

---

## 2. Arsitektur File & Routing

```
/app
├── layout.tsx                  ← Font import, global metadata, Navbar wrapper
├── page.tsx                    ← Single-page: merender semua sections berurutan
├── globals.css                 ← Base styles, scrollbar custom, selection color
/components
├── Navbar.tsx                  ← Sticky navbar dengan scroll-aware opacity
├── sections/
│   ├── HeroSection.tsx         ← Section 1: Hero + foto + contact pill
│   ├── MarqueeSection.tsx      ← Section 2: Dua stripe scrolling marquee (silang)
│   ├── CareerGoalSection.tsx   ← Section 3: Node graph + center card
│   ├── AboutSection.tsx        ← Section 3b: Dua kolom teks tentang diri
│   ├── ExperienceSection.tsx   ← Section 4: Accordion-style experience list
│   ├── ProjectsSection.tsx     ← Section 5: Featured project cards (full-width)
│   ├── TestimonialsSection.tsx ← Section 6: Sliding testimonial cards
│   ├── ContactSection.tsx      ← Section 7: Form kontak
│   └── FooterSection.tsx       ← Section 8: Footer dengan social icons
├── ui/
│   ├── MarqueeTrack.tsx        ← Reusable marquee animation component
│   ├── AppIconNode.tsx         ← Node graph icon item
│   ├── ExperienceCard.tsx      ← Satu baris experience
│   ├── ProjectCard.tsx         ← Satu kartu project
│   ├── TestimonialCard.tsx     ← Satu kartu testimonial
│   └── StarRating.tsx          ← Bintang rating
/lib
├── data.ts                     ← Semua data statis (experience, projects, testimonials)
└── animations.ts               ← Framer Motion variant presets (reusable)
```

---

## 3. Component Structure — Hirarki HTML/JSX

### 3.1 `<Navbar />`
```jsx
<header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
  <nav className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
    {/* LEFT: Grid/Hamburger Icon */}
    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]">
      <GridIcon className="w-5 h-5 text-white" />
    </button>

    {/* CENTER: Brand */}
    <span className="text-white font-semibold text-[22px] tracking-tight">
      ProfileX
    </span>

    {/* RIGHT: CTA + underline dekoratif */}
    <div className="relative">
      <button className="px-5 py-2.5 bg-[#c8f135] text-black font-semibold text-[14px] rounded-[10px] hover:bg-[#b8e020] transition-colors">
        Let's Connect
      </button>
      <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#c8f135]" />
    </div>
  </nav>
</header>
```

### 3.2 `<HeroSection />`
```jsx
<section className="relative min-h-screen bg-[#1a2510] overflow-hidden">
  {/* Radial gradient overlay — hijau terang di kanan */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,#3d6b1a_0%,#1a2510_55%,#0d1a08_100%)]" />
  
  {/* Grid lines overlay — subtle */}
  <div className="absolute inset-0 opacity-10"
    style={{
      backgroundImage: 'linear-gradient(#4a7a20 1px,transparent 1px),linear-gradient(90deg,#4a7a20 1px,transparent 1px)',
      backgroundSize: '120px 120px'
    }}
  />

  <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 min-h-screen flex items-start">
    
    {/* LEFT: Text Content */}
    <div className="flex-1 pt-16">
      <p className="text-white text-[22px] font-normal mb-3">Hey, 👋 I am</p>
      
      <h1 className="text-white font-bold text-[72px] lg:text-[88px] leading-none tracking-[-0.03em] mb-4">
        Julian Scott
      </h1>
      
      <p className="text-[#c8f135] font-bold text-[18px] mb-6">A Full Stack Developer</p>
      
      <p className="text-[#b8b8b8] text-[16px] leading-relaxed max-w-[480px] mb-10">
        I architect pixel-perfect interfaces and code them into seamless, human-centered experiences.
      </p>
      
      {/* Contact Info Pill */}
      <div className="inline-flex items-center gap-5 bg-[#1f2916] border border-[#3a4a20] rounded-full px-5 py-3">
        <span className="flex items-center gap-2 text-white text-[13px]">
          <MailIcon className="w-4 h-4 text-[#c8f135]" /> hello@julian.com
        </span>
        <span className="w-px h-4 bg-[#3a4a20]" />
        <span className="flex items-center gap-2 text-white text-[13px]">
          <PhoneIcon className="w-4 h-4 text-[#c8f135]" /> +49 176 1234 5678
        </span>
        <span className="w-px h-4 bg-[#3a4a20]" />
        <span className="flex items-center gap-2 text-white text-[13px]">
          <MapPinIcon className="w-4 h-4 text-[#c8f135]" /> Berlin, Germany
        </span>
      </div>
    </div>

    {/* RIGHT: Photo + Decorative Elements */}
    <div className="relative flex-1 flex justify-end items-end h-full min-h-[600px]">
      <div className="absolute top-20 left-10 opacity-20">
        <WireframePenIcon className="w-20 h-20 text-[#c8f135]" />
      </div>
      <div className="absolute top-10 right-10 opacity-15">
        <WireframeDashboardIcon className="w-28 h-28 text-[#c8f135]" />
      </div>
      <StarIcon className="absolute top-12 right-[45%] text-[#c8f135] w-6 h-6 fill-[#c8f135]" />
      <StarIcon className="absolute bottom-[35%] left-0 text-[#c8f135] w-5 h-5 fill-[#c8f135]" />
      <img src="/images/julian-hero.png" alt="Julian Scott"
        className="relative z-10 h-[580px] object-contain object-bottom" />
    </div>
  </div>
</section>
```

### 3.3 `<MarqueeSection />`
```jsx
<section className="relative overflow-hidden bg-[#0d0d0d] py-0">
  {/* Wrapper dengan rotasi diagonal */}
  <div className="relative flex flex-col gap-0 -rotate-3 scale-110 my-8">
    
    {/* STRIPE 1 — Putih */}
    <div className="bg-white py-3 overflow-hidden">
      <MarqueeTrack speed={40} direction="left">
        {['Fast delivery','User-First','Accessible UI','Premium design','High conversion'].map((text) => (
          <span key={text} className="flex items-center gap-3 mx-6">
            <StarIcon className="text-black w-5 h-5 fill-black" />
            <span className="text-black font-bold text-[26px] whitespace-nowrap">{text}</span>
          </span>
        ))}
      </MarqueeTrack>
    </div>

    {/* STRIPE 2 — Lime */}
    <div className="bg-[#c8f135] py-3 overflow-hidden">
      <MarqueeTrack speed={40} direction="right">
        {['Premium design','High conversion','User-First','Fast delivery','Accessible UI'].map((text) => (
          <span key={text} className="flex items-center gap-3 mx-6">
            <StarIcon className="text-black w-5 h-5 fill-black" />
            <span className="text-black font-bold text-[26px] whitespace-nowrap">{text}</span>
          </span>
        ))}
      </MarqueeTrack>
    </div>
  </div>
</section>
```

### 3.4 `<CareerGoalSection />`
```jsx
<section className="relative bg-[#0d0d0d] py-24 overflow-hidden">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
    
    {/* Node Graph Container */}
    <div className="relative flex items-center justify-center min-h-[480px]">
      
      {/* SVG Lines (z-index: 1, di balik icons) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
        {/* Setiap line: dari icon ke border card tengah */}
        <line x1="12%" y1="8%"  x2="33%" y2="46%" stroke="#c8f135" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="21%" y1="38%" x2="33%" y2="50%" stroke="#c8f135" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="9%"  y1="75%" x2="33%" y2="58%" stroke="#c8f135" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="31%" y1="62%" x2="37%" y2="58%" stroke="#c8f135" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="88%" y1="8%"  x2="67%" y2="46%" stroke="#c8f135" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="79%" y1="38%" x2="67%" y2="50%" stroke="#c8f135" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="91%" y1="75%" x2="67%" y2="58%" stroke="#c8f135" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="69%" y1="62%" x2="63%" y2="58%" stroke="#c8f135" strokeWidth="1" strokeOpacity="0.5" />
      </svg>

      {/* CENTER CARD */}
      <div className="relative z-10 bg-[#141414] border border-[#2a2a2a] rounded-2xl p-10 max-w-[520px] text-center">
        <h2 className="text-white text-[48px] font-medium tracking-tight mb-5">Career Goal</h2>
        <p className="text-[#b8b8b8] text-[15px] leading-relaxed">
          To join a forward-thinking team where design and technology intersect, creating meaningful digital products that enhance user experiences at scale and push creative boundaries.
        </p>
      </div>

      {/* ICON NODES — 8 posisi: 4 kiri, 4 kanan */}
      <AppIconNode icon="wordpress"    className="absolute top-0    left-[8%]  z-10" />
      <AppIconNode icon="framer"       className="absolute top-[35%] left-[18%] z-10" />
      <AppIconNode icon="figma"        className="absolute bottom-[5%]  left-[8%]  z-10" />
      <AppIconNode icon="screenpresso" className="absolute bottom-[30%] left-[30%] z-10" />
      <AppIconNode icon="adobexd"      className="absolute top-0    right-[8%]  z-10" />
      <AppIconNode icon="html5"        className="absolute top-[35%] right-[18%] z-10" />
      <AppIconNode icon="javascript"   className="absolute bottom-[5%]  right-[8%]  z-10" />
      <AppIconNode icon="css3"         className="absolute bottom-[30%] right-[30%] z-10" />
    </div>

    {/* ABOUT TEXT — 2 kolom */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
      <p className="text-[#b8b8b8] text-[15px] leading-relaxed">
        I'm a multidisciplinary designer and full-stack developer with 4+ years of experience creating conversion-focused digital experiences. I specialize in intuitive UI/UX and modern websites using WordPress, React, and Framer.
      </p>
      <p className="text-[#b8b8b8] text-[15px] leading-relaxed">
        From no-code builds to custom themes, I help global brands craft fast, scalable web solutions. Off hours? I'm likely exploring design trends or fine-tuning plugins over a cold brew.
      </p>
    </div>
  </div>
</section>
```

### 3.5 `<ExperienceSection />`
```jsx
<section className="bg-[#000000] py-24">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
    <h2 className="text-white text-[56px] font-medium text-center mb-16 tracking-tight">
      Experiences
    </h2>
    <div className="flex flex-col divide-y divide-[#1a1a1a]">
      {experiences.map((exp, index) => (
        <ExperienceCard key={exp.id} exp={exp} isFirst={index === 0} />
      ))}
    </div>
  </div>
</section>

{/* ExperienceCard JSX anatomy: */}
<div className={cn(
  "py-6 px-0 cursor-pointer group transition-all duration-300",
  isExpanded && "bg-[#141414] rounded-2xl border border-[#c8f135] px-6"
)}>
  {/* HEADER ROW */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-[14px] bg-[#1c1c1c] flex items-center justify-center overflow-hidden flex-shrink-0">
        <img src={exp.logo} alt={exp.company} className="w-7 h-7 object-contain" />
      </div>
      <span className={cn("font-bold text-[17px] transition-colors", isExpanded ? "text-white" : "text-[#b8b8b8] group-hover:text-white")}>
        {exp.title}
      </span>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-[#6b7280] text-[14px] hidden md:block">{exp.company}</span>
      <div className="flex items-center gap-2 bg-[#1c1c1c] rounded-full px-4 py-1.5">
        <CalendarIcon className="w-3.5 h-3.5 text-[#c8f135]" />
        <span className="text-white text-[13px]">{exp.date}</span>
      </div>
    </div>
  </div>
  
  {/* EXPANDED — animasi di Section 4 */}
  {isExpanded && (
    <div className="mt-4 pl-[60px]">
      <div className="w-full h-px bg-[#2a2a2a] mb-4" />
      <ul className="space-y-2">
        {exp.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-[#b8b8b8] text-[14px]">
            <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#b8b8b8] flex-shrink-0" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  )}
</div>
```

### 3.6 `<ProjectsSection />`
```jsx
<section className="bg-[#000000] py-24">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
    <div className="text-center mb-16">
      <h2 className="text-white text-[56px] font-medium tracking-tight mb-4">Featured Projects</h2>
      <p className="text-[#6b7280] text-[15px]">Some of the work I'm most proud of — designed with purpose, built to perform.</p>
    </div>
    <div className="flex flex-col gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  </div>
</section>

{/* ProjectCard JSX anatomy */}
<div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl overflow-hidden">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
    {/* LEFT: Info */}
    <div className="p-10 flex flex-col justify-between">
      <div>
        <h3 className="text-white font-bold text-[28px] mb-4 leading-tight">{project.title}</h3>
        <p className="text-[#6b7280] text-[14px] mb-2">Type: {project.type}</p>
        <p className="text-[#b8b8b8] text-[14px] leading-relaxed mb-2">Summary: {project.summary}</p>
        <p className="text-[#6b7280] text-[14px]">Tech: {project.tech.join(', ')}</p>
      </div>
      <div className="mt-8">
        <div className="w-14 h-[2px] bg-[#c8f135] mb-3" />
        <button className="bg-[#c8f135] text-black font-bold text-[15px] px-6 py-3 rounded-[10px] hover:bg-[#b8e020] transition-colors">
          View Live Site
        </button>
        <div className="w-14 h-[2px] bg-[#c8f135] mt-3" />
      </div>
    </div>
    {/* RIGHT: Screenshot */}
    <div className="relative bg-[#12122a] rounded-2xl m-4 overflow-hidden min-h-[340px]">
      {/* Browser chrome dots */}
      <div className="absolute top-3 left-4 flex gap-1.5 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <img src={project.image} alt={project.title}
        className="w-full h-full object-cover object-top" />
    </div>
  </div>
</div>
```

### 3.7 `<TestimonialsSection />`
```jsx
<section className="bg-[#000000] py-24">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
    <div className="text-center mb-12">
      <h2 className="text-white text-[56px] font-medium tracking-tight mb-3">What Clients Say</h2>
      <p className="text-[#6b7280] text-[15px]">A few kind words from the people I've worked with.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {testimonials.map((t) => (
        <TestimonialCard key={t.id} testimonial={t} />
      ))}
    </div>
    <div className="flex justify-center gap-3">
      <button onClick={prev} className="w-12 h-12 rounded-full bg-[#c8f135] flex items-center justify-center hover:bg-[#b8e020] transition-colors">
        <ChevronLeftIcon className="w-5 h-5 text-black" />
      </button>
      <button onClick={next} className="w-12 h-12 rounded-full bg-[#c8f135] flex items-center justify-center hover:bg-[#b8e020] transition-colors">
        <ChevronRightIcon className="w-5 h-5 text-black" />
      </button>
    </div>
  </div>
</section>

{/* TestimonialCard JSX anatomy */}
<div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-6 flex flex-col min-h-[280px]">
  <div className="flex items-center gap-3 mb-5">
    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-xl object-cover" />
    <div>
      <p className="text-white font-bold text-[15px]">{t.name}</p>
      <p className="text-[#6b7280] text-[13px]">{t.role}</p>
    </div>
  </div>
  <p className="text-[#b8b8b8] text-[14px] leading-relaxed flex-1">"{t.quote}"</p>
  <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#1a1a1a]">
    <StarRating rating={t.rating} />
    <span className="text-[#6b7280] text-[13px]">{t.date}</span>
  </div>
</div>
```

### 3.8 `<ContactSection />` & `<FooterSection />`
```jsx
{/* CONTACT */}
<section className="bg-[#000000] py-24">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
    <div className="text-center mb-16">
      <h2 className="text-white text-[56px] font-medium tracking-tight mb-3">Let's Work Together</h2>
      <p className="text-[#6b7280] text-[15px]">Have a project in mind, a question, or just want to say hello? I'd love to hear from you.</p>
    </div>
    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-8 lg:p-12">
      {/* Row 1: 3 inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {[
          { label: 'Name', placeholder: 'Enter your name', icon: <UserIcon /> },
          { label: 'Email', placeholder: 'Enter your email', icon: <MailIcon /> },
          { label: 'Contact Number', placeholder: '321-654-879', icon: <PhoneIcon /> },
        ].map(({ label, placeholder, icon }) => (
          <div key={label}>
            <label className="text-white text-[13px] font-medium mb-2 block">{label}</label>
            <div className="relative">
              <input placeholder={placeholder}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-[10px] px-4 py-3 text-[#b8b8b8] text-[14px] pr-10 focus:outline-none focus:border-[#c8f135] transition-colors placeholder:text-[#3a3a3a]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c8f135]">{icon}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Textarea */}
      <div className="mb-8">
        <label className="text-white text-[13px] font-medium mb-2 block">Message</label>
        <div className="relative">
          <textarea rows={6} placeholder="Enter your message...."
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-[10px] px-4 py-3 text-[#b8b8b8] text-[14px] resize-none focus:outline-none focus:border-[#c8f135] transition-colors placeholder:text-[#3a3a3a]"
          />
          <span className="absolute right-3 bottom-3 text-[#c8f135]"><ChatIcon /></span>
        </div>
      </div>
      {/* Submit */}
      <div>
        <div className="w-14 h-[2px] bg-[#c8f135] mb-3" />
        <button className="bg-[#c8f135] text-black font-bold text-[15px] px-8 py-3 rounded-[10px] hover:bg-[#b8e020] transition-colors">
          Submit
        </button>
        <div className="w-14 h-[2px] bg-[#c8f135] mt-3" />
      </div>
    </div>
  </div>
</section>

{/* FOOTER */}
<footer className="bg-gradient-to-t from-[#1a2510] to-[#000000]">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
    <div className="flex items-center justify-between">
      <span className="text-white font-semibold text-[22px]">ProfileX</span>
      <p className="text-[#6b7280] text-[13px]">© 2026 ProfileX by Julian Scott. All rights reserved.</p>
      <div className="flex items-center gap-3">
        {['linkedin','globe','dribbble','behance','x'].map((social) => (
          <a key={social} href="#"
            className="w-10 h-10 rounded-full border border-[#2a2a2a] bg-[#141414] flex items-center justify-center hover:border-[#c8f135] transition-colors">
            <SocialIcon name={social} className="w-4 h-4 text-white" />
          </a>
        ))}
      </div>
    </div>
  </div>
</footer>
```

---

## 4. Animation Spec — Framer Motion

### 4.1 Reusable Variant Presets (`/lib/animations.ts`)

```ts
import { Variants } from 'framer-motion';

// FADE UP — Elemen masuk dari bawah (dipakai mayoritas)
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// FADE IN — Tanpa movement
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
};

// SLIDE FROM RIGHT — Untuk foto hero & project images
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// SLIDE FROM LEFT
export const slideRight: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// SCALE IN — Untuk cards, icons, pills (slight spring overshoot)
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay },
  }),
};

// STAGGER CONTAINER — Parent untuk sequential children animation
export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
```

### 4.2 Hero Section — Detailed Timing

```tsx
// HeroSection.tsx (menggunakan staggerContainer)
// Semua text menggunakan animate (bukan whileInView) karena ini section pertama

<motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex-1 pt-16">
  
  {/* 1. Greeting: opacity 0→1, y 40→0, delay=0s, duration=0.7s */}
  <motion.p variants={fadeUp} custom={0}>Hey, 👋 I am</motion.p>

  {/* 2. Name: opacity 0→1, y 40→0, delay=0.12s, duration=0.7s */}
  <motion.h1 variants={fadeUp} custom={0.12}>Julian Scott</motion.h1>

  {/* 3. Role: opacity 0→1, y 40→0, delay=0.24s, duration=0.7s */}
  <motion.p variants={fadeUp} custom={0.24}>A Full Stack Developer</motion.p>

  {/* 4. Bio: opacity 0→1, y 40→0, delay=0.36s, duration=0.7s */}
  <motion.p variants={fadeUp} custom={0.36}>I architect pixel-perfect...</motion.p>

  {/* 5. Contact Pill: opacity 0→1, y 40→0, delay=0.52s, duration=0.7s */}
  <motion.div variants={fadeUp} custom={0.52}>...</motion.div>

</motion.div>

{/* Hero Photo: opacity 0→1, x 80→0, scale 0.95→1, delay=0.2s, duration=1.0s */}
<motion.div
  initial={{ opacity: 0, x: 80, scale: 0.95 }}
  animate={{ opacity: 1, x: 0, scale: 1 }}
  transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
>
  <img src="/images/julian-hero.png" ... />
</motion.div>

{/* Wireframe icons: opacity 0→0.2, delay=0.8s, duration=1.5s (sangat lambat & halus) */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.2 }}
  transition={{ duration: 1.5, delay: 0.8 }}
>
  <WireframePenIcon />
</motion.div>

{/* Star decorations: scale 0→1 dengan spring, delay=1.0s */}
<motion.div
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, delay: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
>
  <StarIcon />
</motion.div>
```

### 4.3 MarqueeTrack Component

```tsx
// components/ui/MarqueeTrack.tsx
'use client';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  speed?: number;           // Durasi satu loop dalam detik (default 40s)
  direction?: 'left' | 'right';
}

export function MarqueeTrack({ children, speed = 40, direction = 'left' }: Props) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0"
        animate={{
          // Scroll dari 0% ke -50% (kiri) atau -50% ke 0% (kanan)
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,      // 40s per loop
          ease: 'linear',       // KRUSIAL: harus linear, tidak ada easing
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {/* Duplikasi 2x untuk seamless loop */}
        <div className="flex">{children}</div>
        <div className="flex">{children}</div>
      </motion.div>
    </div>
  );
}
// NOTE: CSS rotate(-3deg) diterapkan di parent section wrapper, BUKAN di MarqueeTrack
```

### 4.4 Career Goal — Node Graph Animation

```tsx
// CareerGoalSection.tsx

// 1. CENTER CARD — scale 0.9→1, opacity 0→1, viewport triggered
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
>
  {/* Career Goal Card */}
</motion.div>

// 2. ICON NODES — Muncul berurutan dengan spring, lalu floating idle
const nodeEnter: Variants = {
  hidden:  { opacity: 0, scale: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, y: 0,
    transition: {
      duration: 0.6,
      delay: 0.4 + i * 0.08,     // stagger: 80ms per icon
      ease: [0.34, 1.56, 0.64, 1], // spring dengan overshoot
    },
  }),
};

{iconNodes.map((node, i) => (
  <motion.div
    key={node.id}
    variants={nodeEnter}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={i}
    // FLOATING IDLE: y 0 → -8 → 0, repeat infinite
    // Setiap icon punya durasi & delay berbeda biar tidak sinkron
    animate={{ y: [0, -8, 0] }}
    // PENTING: animate harus dipisah dari whileInView menggunakan useAnimate atau
    // alternasi: setelah animasi entry selesai, baru floating dimulai via onAnimationComplete
    style={{ animationDuration: `${4 + i * 0.3}s`, animationDelay: `${i * 0.2}s` }}
    className={node.className}
  >
    <AppIconNode icon={node.icon} />
  </motion.div>
))}

// 3. SVG LINES — stroke-dasharray draw animation
// Gunakan motion.line dari framer-motion (SVG support built-in)
<motion.line
  initial={{ pathLength: 0, opacity: 0 }}
  whileInView={{ pathLength: 1, opacity: 0.5 }}
  viewport={{ once: true }}
  transition={{ duration: 1.2, delay: 0.5 + lineIndex * 0.1, ease: 'easeOut' }}
  x1="..." y1="..." x2="..." y2="..."
  stroke="#c8f135" strokeWidth="1"
/>
```

### 4.5 Experience Accordion — AnimatePresence

```tsx
// ExperienceCard.tsx
import { AnimatePresence, motion } from 'framer-motion';

// BORDER & BG animasi saat expand/collapse
<motion.div
  animate={{
    borderColor: isExpanded ? '#c8f135' : '#1a1a1a',
    backgroundColor: isExpanded ? '#141414' : 'transparent',
    paddingLeft: isExpanded ? '24px' : '0px',
    paddingRight: isExpanded ? '24px' : '0px',
  }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
  className="rounded-2xl border"
>
  {/* ... header row ... */}

  {/* EXPANDED CONTENT — height auto animation */}
  <AnimatePresence>
    {isExpanded && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}  // PENTING: overflow hidden untuk height animation
      >
        <div className="pt-4 pl-[60px]">
          {exp.bullets.map((bullet, i) => (
            <motion.li
              key={bullet}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
            >
              {bullet}
            </motion.li>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
```

### 4.6 Project Cards — Scroll-Triggered Stagger

```tsx
// ProjectsSection.tsx
{projects.map((project, index) => (
  <motion.div
    key={project.id}
    initial={{ opacity: 0, y: 50, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{
      duration: 0.7,
      delay: index * 0.12,          // 120ms stagger antar kartu
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {/* Hover effect: lift up */}
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl overflow-hidden"
    >
      <ProjectCard project={project} />
    </motion.div>
  </motion.div>
))}
```

### 4.7 Testimonial Slider — AnimatePresence Slide

```tsx
// TestimonialsSection.tsx
const [page, setPage] = useState(0);
const slideDir = useRef(1); // 1 = next, -1 = prev

const paginate = (dir: 1 | -1) => {
  slideDir.current = dir;
  setPage((prev) => (prev + dir + totalPages) % totalPages);
};

const slideVariants: Variants = {
  enter:  (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? '-30%' : '30%', opacity: 0 }),  // exit lebih subtle
};

<div className="relative overflow-hidden">
  <AnimatePresence mode="wait" custom={slideDir.current}>
    <motion.div
      key={page}
      custom={slideDir.current}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.3 },
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-5"
    >
      {currentTestimonials.map((t) => (
        <TestimonialCard key={t.id} testimonial={t} />
      ))}
    </motion.div>
  </AnimatePresence>
</div>

// TestimonialCard hover
<motion.div
  whileHover={{ y: -4, borderColor: '#c8f135' }}
  transition={{ duration: 0.25 }}
>...</motion.div>
```

### 4.8 Navbar Scroll-Aware Opacity

```tsx
// Navbar.tsx
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Navbar() {
  const { scrollY } = useScroll();

  // scrollY 0 → 80px: bg opacity 0 → 0.95
  const bgColor = useTransform(scrollY, [0, 80], ['rgba(13,13,13,0)', 'rgba(13,13,13,0.95)']);
  const borderColor = useTransform(scrollY, [0, 80], ['rgba(42,42,42,0)', 'rgba(42,42,42,1)']);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[16px]"
      style={{
        backgroundColor: bgColor,
        borderBottom: `1px solid`,
        borderBottomColor: borderColor,
      }}
    >
      ...
    </motion.header>
  );
}
```

### 4.9 Global Scroll Section Animations

```tsx
// Pattern standar untuk semua section headings
<motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
>
  Section Title
</motion.h2>

// Pattern untuk subtitle/description
<motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
>
  Subtitle text
</motion.p>
```

### 4.10 Button & Interactive Element Micro-animations

```tsx
// Semua tombol CTA utama (Let's Connect, View Live Site, Submit)
<motion.button
  whileHover={{ scale: 1.03, backgroundColor: '#b8e020' }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.2 }}
  className="bg-[#c8f135] text-black font-bold..."
>
  CTA Text
</motion.button>

// Icon nodes di Career Goal (hover + tap)
<motion.div
  whileHover={{ scale: 1.12, rotate: 4, boxShadow: '0 0 20px rgba(200,241,53,0.25)' }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
  className="w-[72px] h-[72px] rounded-[18px]..."
>

// Social icon links di footer
<motion.a
  whileHover={{ scale: 1.1, borderColor: '#c8f135' }}
  transition={{ duration: 0.2 }}
  className="w-10 h-10 rounded-full border border-[#2a2a2a]..."
>

// Star rating — pop-in saat scroll masuk
{[1,2,3,4,5].map((star, i) => (
  <motion.span
    key={star}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
  >★</motion.span>
))}
```

---

## 5. Section-by-Section Breakdown

### Overview Table

| # | Section | Background | Animation Entry | Key Framer Feature |
|---|---------|-----------|----------------|-------------------|
| 1 | Hero | `#1a2510` + radial gradient | `animate` (immediate) | staggerContainer + slideLeft foto |
| 2 | Marquee | `#0d0d0d` | Immediate (always playing) | `repeat: Infinity, ease: 'linear'` |
| 3 | Career Goal | `#0d0d0d` | `whileInView` | SVG pathLength draw + float idle |
| 3b | About | `#0d0d0d` | `whileInView` | fadeUp stagger |
| 4 | Experiences | `#000000` | `whileInView` + click | AnimatePresence height |
| 5 | Projects | `#000000` | `whileInView` stagger | scale + y on scroll |
| 6 | Testimonials | `#000000` | `whileInView` | AnimatePresence slide |
| 7 | Contact | `#000000` | `whileInView` | fadeUp form fields |
| 8 | Footer | `#000 → #1a2510` gradient | Static | `useScroll` useTransform |

### Responsive Breakpoints

```
Mobile (<768px):
  - Hero: flex-col, foto di atas, text di bawah, h1 text-[48px]
  - Career Goal: 4 icons saja (1 per sudut), simplified SVG
  - Projects: single column, image stacked below text
  - Testimonials: 1 card per view, swipe gesture enabled
  - Contact form: 1 kolom (3 fields stacked)

Tablet (768px-1024px):
  - Projects: masih single column (full-width design tetap dipertahankan)
  - Testimonials: 2 kolom
  - Contact: 2+1 layout (2 fields row 1, 1 field row 2)

Desktop (>1024px):
  - Layout penuh sesuai screenshot
  - Hero max-width 1400px centered
  - Semua section: max-w-[1400px] mx-auto px-12
```

### Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0"
  }
}
```

### Tailwind Config Final

```js
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', ...fontFamily.sans] },
      colors: {
        accent: '#c8f135',
        'accent-hover': '#b8e020',
        'bg-hero': '#1a2510',
        'bg-dark': '#0d0d0d',
        'bg-card': '#141414',
        'bg-surface': '#1c1c1c',
        'bg-pill': '#1f2916',
        'text-secondary': '#b8b8b8',
        'text-muted': '#6b7280',
        'border-default': '#2a2a2a',
        'border-accent': '#c8f135',
        'border-hero': '#3a4a20',
      },
      borderRadius: {
        card: '16px', pill: '50px', icon: '14px', btn: '10px', input: '10px',
      },
      boxShadow: {
        'glow-accent': '0 0 30px rgba(200, 241, 53, 0.15)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};
```

---

> **Catatan Implementasi:**
> 1. **Font**: Import `Inter` via `next/font/google` di `layout.tsx` — jangan pakai `<link>` di HTML untuk performa optimal
> 2. **Client Components**: Semua file yang menggunakan `motion.*`, `useState`, atau `useScroll` harus diawali dengan `'use client'`
> 3. **viewport once**: Selalu gunakan `viewport={{ once: true }}` agar animasi tidak replay saat user scroll balik
> 4. **Foto Hero**: Harus PNG dengan background transparan; posisikan absolute/fixed di bottom-right
> 5. **MarqueeTrack**: Render children DUA KALI dalam satu `motion.div` untuk seamless loop tanpa jank
> 6. **SVG Animasi**: Gunakan `motion.line` dan `motion.path` (bukan `<line>`) agar bisa dianimasikan via Framer Motion
> 7. **Marquee CSS rotate**: Terapkan `-rotate-3 scale-110` pada wrapper `<div>` di luar MarqueeTrack, bukan di dalam component
> 8. **AnimatePresence mode**: Gunakan `mode="wait"` untuk slider testimonial agar exit selesai sebelum enter dimulai
