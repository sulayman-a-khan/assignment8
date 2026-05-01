import Link from "next/link";
import { HiSparkles } from "react-icons/hi";
import { FiTwitter, FiGithub, FiLinkedin, FiYoutube, FiInstagram } from "react-icons/fi";

const footerLinks = {
  Platform: [
    { label: "Home", href: "/" },
    { label: "All Courses", href: "/courses" },
    { label: "Instructors", href: "/" },
    { label: "Pricing", href: "/" },
  ],
  Categories: [
    { label: "Web Development", href: "/courses" },
    { label: "Data Science", href: "/courses" },
    { label: "Design", href: "/courses" },
    { label: "Mobile Dev", href: "/courses" },
  ],
  Company: [
    { label: "About Us", href: "/" },
    { label: "Careers", href: "/" },
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
  ],
};

const socials = [
  { icon: FiTwitter, href: "#", label: "Twitter" },
  { icon: FiGithub, href: "#", label: "GitHub" },
  { icon: FiLinkedin, href: "#", label: "LinkedIn" },
  { icon: FiYoutube, href: "#", label: "YouTube" },
  { icon: FiInstagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <HiSparkles className="text-white text-lg" />
              </div>
              <span className="font-display font-800 text-xl gradient-text">
                SkillSphere
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Empowering learners worldwide with world-class courses, expert
              instructors, and a vibrant learning community.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-500/20 border border-white/10 hover:border-primary-500/40 flex items-center justify-center text-white/50 hover:text-primary-400 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} SkillSphere. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/30">
            <span>Built with</span>
            <span className="gradient-text font-semibold mx-1">Next.js 14</span>
            <span>+</span>
            <span className="gradient-text font-semibold mx-1">DaisyUI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
