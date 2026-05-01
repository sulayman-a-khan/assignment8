import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: {
    default: "SkillSphere – Learn Without Limits",
    template: "%s | SkillSphere",
  },
  description:
    "SkillSphere is an online learning platform offering expert-led courses in web development, AI, design, and more. Start learning today.",
  keywords: ["online learning", "courses", "web development", "AI", "design"],
  authors: [{ name: "SkillSphere Team" }],
  openGraph: {
    title: "SkillSphere – Learn Without Limits",
    description: "Expert-led courses for modern learners.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="skillsphere"
      className={`${inter.variable} ${outfit.variable}`}
    >
      <body className="bg-[#0f0f1a] text-white antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e1e3a",
              color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#06d6a0", secondary: "#1e1e3a" },
            },
            error: {
              iconTheme: { primary: "#f43f5e", secondary: "#1e1e3a" },
            },
          }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
