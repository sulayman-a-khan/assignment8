"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import {
  FiUser,
  FiMail,
  FiEdit3,
  FiSave,
  FiX,
  FiLogOut,
  FiBookOpen,
  FiAward,
  FiTrendingUp,
  FiCamera,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import Link from "next/link";

const statCards = [
  { icon: FiBookOpen, label: "Courses Enrolled", value: "3", color: "from-primary-500 to-violet-500" },
  { icon: FiAward, label: "Certificates", value: "1", color: "from-emerald-400 to-cyan-500" },
  { icon: FiTrendingUp, label: "Hours Learned", value: "42", color: "from-amber-400 to-orange-500" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", image: "" });

  useEffect(() => {
    if (session?.user) {
      setForm({
        name: session.user.name || "",
        image: session.user.image || "",
      });
    }
  }, [session]);

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await authClient.updateUser({
        name: form.name,
        image: form.image || undefined,
      });
      if (error) {
        toast.error(error.message || "Failed to update profile.");
      } else {
        toast.success("Profile updated successfully! ✨");
        setEditing(false);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out successfully.");
    router.push("/");
  };

  if (isPending) return <Loader fullPage />;

  if (!session && !isPending) return null;

  const user = session.user;
  const initials = user.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="page-container pb-20">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent-500/6 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-800 text-white mb-1">
            My <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-white/40 text-sm">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass-card neon-border p-6 text-center">
              {/* Avatar */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-0.5 shadow-xl shadow-primary-500/20">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover bg-[#1e1e3a]"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#1e1e3a] flex items-center justify-center">
                      <span className="text-2xl font-display font-800 gradient-text">
                        {initials}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-400 border-2 border-[#0f0f1a] flex items-center justify-center">
                  <HiSparkles className="text-[#0f0f1a] text-xs" />
                </div>
              </div>

              <h2 className="font-display font-700 text-white text-lg mb-0.5">
                {user.name}
              </h2>
              <p className="text-white/40 text-xs mb-4">{user.email}</p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-medium mb-6">
                <HiSparkles size={10} /> Pro Learner
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => setEditing(true)}
                  id="edit-profile-btn"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/20 hover:border-primary-500/40 text-primary-400 text-sm font-medium transition-all"
                >
                  <FiEdit3 size={14} /> Edit Profile
                </button>
                <button
                  onClick={handleSignOut}
                  id="profile-signout-btn"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 text-red-400 text-sm font-medium transition-all"
                >
                  <FiLogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {statCards.map(({ icon: Icon, label, value, color }, i) => (
                <div key={label} className="glass-card p-4 text-center">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-2 shadow-lg`}
                  >
                    <Icon className="text-white text-base" />
                  </div>
                  <div className="font-display font-900 text-xl gradient-text">
                    {value}
                  </div>
                  <div className="text-white/40 text-xs mt-0.5 leading-tight">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-700 text-white text-base">
                  Account Information
                </h3>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <FiEdit3 size={12} /> Edit
                  </button>
                )}
              </div>

              {editing ? (
                <div className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                      <input
                        id="profile-name-input"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl input-glass text-sm"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-1.5">
                      Profile Photo URL
                    </label>
                    <div className="relative">
                      <FiCamera className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                      <input
                        id="profile-image-input"
                        type="url"
                        value={form.image}
                        onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl input-glass text-sm"
                        placeholder="https://..."
                      />
                    </div>
                    {form.image && (
                      <div className="mt-2 flex items-center gap-2">
                        <img
                          src={form.image}
                          alt="Preview"
                          className="w-10 h-10 rounded-full object-cover border border-white/10"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                        <span className="text-xs text-white/30">Preview</span>
                      </div>
                    )}
                  </div>

                  {/* Email (read-only) */}
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full pl-10 pr-4 py-3 rounded-xl input-glass text-sm opacity-50 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-white/30 mt-1 ml-1">Email cannot be changed</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      id="save-profile-btn"
                      className="flex-1 btn-glow py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {saving ? <Loader size="sm" /> : <><FiSave size={14} /> Save Changes</>}
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setForm({ name: user.name || "", image: user.image || "" });
                      }}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 text-sm font-medium transition-all flex items-center gap-2"
                    >
                      <FiX size={14} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    { icon: FiUser, label: "Full Name", value: user.name || "Not set" },
                    { icon: FiMail, label: "Email Address", value: user.email },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/5"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-primary-400 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 mb-0.5">{label}</p>
                        <p className="text-sm text-white/80 font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass-card p-6"
            >
              <h3 className="font-display font-700 text-white text-base mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/courses"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-primary-500/10 border border-white/5 hover:border-primary-500/20 transition-all group"
                >
                  <FiBookOpen className="text-primary-400 text-base group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-white/60 group-hover:text-white/90">Browse Courses</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/20 transition-all group"
                >
                  <HiSparkles className="text-emerald-400 text-base group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-white/60 group-hover:text-white/90">Go to Home</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
