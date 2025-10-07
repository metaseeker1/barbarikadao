"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
// NOTE: Removed import for './profile/UserProfile' because the file does not exist.
// If you add it later, create app/profile/UserProfile.tsx (or components/profile/UserProfile.tsx)
// and restore the import.
// import { UserProfile } from "./profile/UserProfile";

type PageId =
  | "home"
  | "calibration"
  | "control"
  | "upload"
  | "datasets"
  | "annotate"
  | "visualize"
  | "replay"
  | "training"
  | "aicontrol"
  | "skillstore"
  | "store";

export default function Home() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [activePage, setActivePage] = useState<PageId>("home");
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleGoogleSignIn = () => signIn("google");
  const handleSignOut = () => signOut({ callbackUrl: "/" });

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  const NavItem = ({
    id,
    icon,
    label,
    live,
  }: {
    id: PageId;
    icon: string;
    label: string;
    live?: boolean;
  }) => (
    <div
      className={`px-5 py-3 cursor-pointer transition-all flex items-center gap-3 text-[12px] tracking-wider ${
        activePage === id
          ? "bg-[#a4f431] text-black font-bold"
          : "text-gray-400 hover:bg-[#a4f431]/10 hover:text-[#a4f431]"
      }`}
      onClick={() => {
        setActivePage(id);
        setSidebarOpen(false); // auto-close drawer on mobile
      }}
    >
      <span className="text-base leading-none">{icon}</span>
      <span className="uppercase">{label}</span>
      {live && (
        <span className="ml-auto bg-green-500 text-black px-1.5 py-0.5 text-[9px] tracking-wide font-bold rounded-sm animate-pulse">
          LIVE
        </span>
      )}
    </div>
  );

  const TwitterIcon = () => (
    <a
      href="https://x.com/barbarikaAI"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-9 h-9 rounded hover:bg-black/10"
      title="Follow on X"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black" aria-hidden>
        <path d="M18.244 2H21l-6.5 7.43L22.5 22H16l-5-6-5.5 6H3l7.1-7.77L1.5 2h6.6l4.4 5.5L18.244 2zM16 20l-9.5-12L4 4h2.5l9.5 12L20 20h-4z" />
      </svg>
    </a>
  );

  const Hamburger = ({ className = "" }: { className?: string }) => (
    <button
      type="button"
      aria-label="Open menu"
      onClick={openSidebar}
      className={`md:hidden inline-flex items-center justify-center w-9 h-9 rounded hover:bg-black/10 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
        <path
          d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
          fill="currentColor"
        />
      </svg>
    </button>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a4f431]" />
          <p className="text-sm tracking-wide">Loading...</p>
        </div>
      </div>
    );
  }

  // Logged-in view
  if (session) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex flex-col">
        {/* Header */}
        <header className="relative z-10 bg-white py-4 px-4 sm:px-6 md:px-8 grid grid-cols-3 items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://raw.githubusercontent.com/metaseeker1/barbarika_site/main/hjg.png"
              alt="BARBARIKA"
              className="h-10 sm:h-12"
            />
          </div>
          <div className="justify-self-center">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-black tracking-widest text-black leading-none text-center"
              style={{ fontFamily: "Impact, Arial Black, sans-serif" }}
            >
              BARBARIKA
            </h1>
          </div>
          <div className="justify-self-end flex items-center gap-2">
            <TwitterIcon />
            <Hamburger />
            <button
              onClick={handleSignOut}
              className="hidden md:inline-flex px-3 sm:px-4 py-2 bg-black text-[#a4f431] hover:bg-gray-800 transition-colors font-semibold text-xs sm:text-sm"
            >
              Sign out
            </button>
          </div>
        </header>

        {/* Desktop-only sidebar + content shell */}
        <div className="relative z-[1] flex min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-80px)]">
          {/* Desktop sidebar (hidden on mobile) */}
          <nav className="hidden md:flex w-60 flex-shrink-0 bg-black/95 border-r border-white/10 py-5 min-h-[calc(100vh-80px)] flex-col">
            <div className="mb-8">
              <div className="px-5 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                NAVIGATION
              </div>
              <NavItem id="home" icon="⊞" label="DASHBOARD" />
            </div>

            <div className="mb-8">
              <div className="px-5 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                CONTROL & RECORD
              </div>
              <NavItem id="calibration" icon="▲" label="CALIBRATION" />
              <NavItem id="control" icon="⊙" label="CONTROL ROBOT" />
              <NavItem id="upload" icon="↑" label="UPLOAD DATASET" live />
              <NavItem id="datasets" icon="☰" label="BROWSE DATASETS" />
            </div>

            <div className="mb-8">
              <div className="px-5 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                ANNOTATE & DEBUG
              </div>
              <NavItem id="annotate" icon="✎" label="ANNOTATE DATA" />
              <NavItem id="visualize" icon="☰" label="VISUALIZE DATA" />
              <NavItem id="replay" icon="⊡" label="REPLAY SESSIONS" />
            </div>

            <div className="mb-8">
              <div className="px-5 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                AI & TRAINING
              </div>
              <NavItem id="training" icon="◊" label="AI TRAINING" />
              <NavItem id="aicontrol" icon="◉" label="AI CONTROL" />
              <NavItem id="skillstore" icon="★" label="SKILL STORE" />
            </div>

            <div className="mb-0">
              <div className="px-5 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                SHOP
              </div>
              <NavItem id="store" icon="⊠" label="STORE" />
            </div>
          </nav>

          {/* MOBILE DRAWER SIDEBAR */}
          {sidebarOpen && (
            <div className="md:hidden fixed inset-0 z-[60]">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={closeSidebar}
                aria-hidden
              />
              <aside
                className="absolute left-0 top-0 bottom-0 w-72 max-w-[85%] bg-black/95 border-r border-white/10 p-5 overflow-y-auto"
                role="dialog"
                aria-label="Mobile navigation"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/70 text-xs tracking-[0.2em]">
                    MENU
                  </span>
                  <button
                    aria-label="Close menu"
                    onClick={closeSidebar}
                    className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-white/10"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                      <path
                        d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.71 4.3 4.29l6.29 6.3 6.29-6.3z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <div className="px-1 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                    NAVIGATION
                  </div>
                  <NavItem id="home" icon="⊞" label="DASHBOARD" />
                </div>

                <div className="mb-6">
                  <div className="px-1 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                    CONTROL & RECORD
                  </div>
                  <NavItem id="calibration" icon="▲" label="CALIBRATION" />
                  <NavItem id="control" icon="⊙" label="CONTROL ROBOT" />
                  <NavItem id="upload" icon="↑" label="UPLOAD DATASET" live />
                  <NavItem id="datasets" icon="☰" label="BROWSE DATASETS" />
                </div>

                <div className="mb-6">
                  <div className="px-1 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                    ANNOTATE & DEBUG
                  </div>
                  <NavItem id="annotate" icon="✎" label="ANNOTATE DATA" />
                  <NavItem id="visualize" icon="☰" label="VISUALIZE DATA" />
                  <NavItem id="replay" icon="⊡" label="REPLAY SESSIONS" />
                </div>

                <div className="mb-6">
                  <div className="px-1 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                    AI & TRAINING
                  </div>
                  <NavItem id="training" icon="◊" label="AI TRAINING" />
                  <NavItem id="aicontrol" icon="◉" label="AI CONTROL" />
                  <NavItem id="skillstore" icon="★" label="SKILL STORE" />
                </div>

                <div>
                  <div className="px-1 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                    SHOP
                  </div>
                  <NavItem id="store" icon="⊠" label="STORE" />
                </div>
              </aside>
            </div>
          )}

          {/* main content */}
          <main className="flex-1 p-10 md:p-16 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Placeholder profile while missing actual component */}
              <UserProfile />
            </div>
          </main>
        </div>

        <WhiteFooter />
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      {/* grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 49px, white 49px, white 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, white 49px, white 50px)",
        }}
      />

      {/* header — logo left, title centered, twitter/hamburger right */}
      <header className="relative z-10 bg-white py-4 px-4 sm:px-6 md:px-8 grid grid-cols-3 items-center">
        <div className="flex items-center gap-3">
          <img
            src="https://raw.githubusercontent.com/metaseeker1/barbarika_site/main/hjg.png"
            alt="BARBARIKA"
            className="h-10 sm:h-12"
          />
        </div>
        <div className="justify-self-center">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-widest text-black leading-none text-center"
            style={{ fontFamily: "Impact, Arial Black, sans-serif" }}
          >
            BARBARIKA
          </h1>
        </div>
        <div className="justify-self-end flex items-center gap-2">
          <TwitterIcon />
          <Hamburger />
        </div>
      </header>

      {/* shell */}
      <div className="relative z-[1] flex min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-80px)]">
        {/* Desktop sidebar (hidden on mobile) */}
        <nav className="hidden md:flex w-60 flex-shrink-0 bg-black/95 border-r border-white/10 py-5 min-h-[calc(100vh-80px)] flex-col">
          <div className="mb-8">
            <div className="px-5 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
              NAVIGATION
            </div>
            <NavItem id="home" icon="⊞" label="DASHBOARD" />
          </div>

          <div className="mb-8">
            <div className="px-5 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
              CONTROL & RECORD
            </div>
            <NavItem id="calibration" icon="▲" label="CALIBRATION" />
            <NavItem id="control" icon="⊙" label="CONTROL ROBOT" />
            <NavItem id="upload" icon="↑" label="UPLOAD DATASET" live />
            <NavItem id="datasets" icon="☰" label="BROWSE DATASETS" />
          </div>

          <div className="mb-8">
            <div className="px-5 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
              ANNOTATE & DEBUG
            </div>
            <NavItem id="annotate" icon="✎" label="ANNOTATE DATA" />
            <NavItem id="visualize" icon="☰" label="VISUALIZE DATA" />
            <NavItem id="replay" icon="⊡" label="REPLAY SESSIONS" />
          </div>

          <div className="mb-8">
            <div className="px-5 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
              AI & TRAINING
            </div>
            <NavItem id="training" icon="◊" label="AI TRAINING" />
            <NavItem id="aicontrol" icon="◉" label="AI CONTROL" />
            <NavItem id="skillstore" icon="★" label="SKILL STORE" />
          </div>

          <div className="mb-0">
            <div className="px-5 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
              SHOP
            </div>
            <NavItem id="store" icon="⊠" label="STORE" />
          </div>
        </nav>

        {/* MOBILE DRAWER SIDEBAR */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-[60]">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={closeSidebar}
              aria-hidden
            />
            <aside
              className="absolute left-0 top-0 bottom-0 w-72 max-w-[85%] bg-black/95 border-r border-white/10 p-5 overflow-y-auto"
              role="dialog"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/70 text-xs tracking-[0.2em]">
                  MENU
                </span>
                <button
                  aria-label="Close menu"
                  onClick={closeSidebar}
                  className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-white/10"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                    <path
                      d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.71 4.3 4.29l6.29 6.3 6.29-6.3z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <div className="px-1 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                  NAVIGATION
                </div>
                <NavItem id="home" icon="⊞" label="DASHBOARD" />
              </div>

              <div className="mb-6">
                <div className="px-1 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                  CONTROL & RECORD
                </div>
                <NavItem id="calibration" icon="▲" label="CALIBRATION" />
                <NavItem id="control" icon="⊙" label="CONTROL ROBOT" />
                <NavItem id="upload" icon="↑" label="UPLOAD DATASET" live />
                <NavItem id="datasets" icon="☰" label="BROWSE DATASETS" />
              </div>

              <div className="mb-6">
                <div className="px-1 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                  ANNOTATE & DEBUG
                </div>
                <NavItem id="annotate" icon="✎" label="ANNOTATE DATA" />
                <NavItem id="visualize" icon="☰" label="VISUALIZE DATA" />
                <NavItem id="replay" icon="⊡" label="REPLAY SESSIONS" />
              </div>

              <div className="mb-6">
                <div className="px-1 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                  AI & TRAINING
                </div>
                <NavItem id="training" icon="◊" label="AI TRAINING" />
                <NavItem id="aicontrol" icon="◉" label="AI CONTROL" />
                <NavItem id="skillstore" icon="★" label="SKILL STORE" />
              </div>

              <div>
                <div className="px-1 py-2 text-[10px] text-white/90 tracking-[0.2em] font-bold mb-1">
                  SHOP
                </div>
                <NavItem id="store" icon="⊠" label="STORE" />
              </div>
            </aside>
          </div>
        )}

        {/* main content */}
        <main className="flex-1 p-10 md:p-16 overflow-y-auto">
          {/* HOME */}
          {activePage === "home" && (
            <>
              <div className="flex flex-col items-center justify-center text-center min-h-[520px]">
                {/* Video grid: horizontal scroll on mobile, grid on md+ */}
                <div className="mb-10 md:mb-12 w-full max-w-6xl">
                  {/* mobile: horizontal lookbook strip */}
                  <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
                    {[
                      "robot41.mp4",
                      "robo_1.mp4",
                      "eg0_3.mp4",
                      "ego_2.mp4",
                      "robot3.mp4",
                      "robot41.mp4",
                    ].map((file, i) => (
                      <div
                        key={i}
                        className="min-w-[78%] sm:min-w-[65%] snap-center aspect-video bg-[#111] rounded-lg overflow-hidden border border-[#2a2a2a] transform transition-all duration-500 hover:scale-[1.015] hover:border-[#a4f431] hover:shadow-lg hover:shadow-[#a4f431]/15"
                      >
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          <source
                            src={`https://cdn.jsdelivr.net/gh/metaseeker1/barbarika_site@main/${file}`}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    ))}
                  </div>

                  {/* desktop: 3×2 grid */}
                  <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {[
                      "robot41.mp4",
                      "robo_1.mp4",
                      "eg0_3.mp4",
                      "ego_2.mp4",
                      "robot3.mp4",
                      "robot41.mp4",
                    ].map((file, i) => (
                      <div
                        key={i}
                        className="aspect-video bg-[#111] rounded-lg overflow-hidden border border-[#2a2a2a] transform transition-all duration-500 hover:scale-[1.015] hover:border-[#a4f431] hover:shadow-lg hover:shadow-[#a4f431]/15"
                      >
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          <source
                            src={`https://cdn.jsdelivr.net/gh/metaseeker1/barbarika_site@main/${file}`}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    ))}
                  </div>
                </div>

                <h1
                  className="text-4xl md:text-5xl font-black tracking-tight md:tracking-[-0.01em] mb-4 uppercase leading-tight"
                  style={{ fontFamily: "Impact, Arial Black, sans-serif" }}
                >
                  OPEN DATA FACTORY FOR ROBOTICS
                </h1>
                <p className="text-sm md:text-base text-white/80 tracking-[0.25em] mb-10">
                  Let’s solve data scarcity in robotics — together
                </p>
                <p className="text-xl md:text-2xl font-bold tracking-[0.2em] mb-8">
                  CONNECT • TELEOPERATE • CONTRIBUTE • TRAIN
                </p>
                <button
                  onClick={openModal}
                  className="bg-[#a4f431] text-black px-10 md:px-16 py-4 md:py-5 text-lg md:text-2xl font-bold tracking-widest uppercase transition-all hover:bg-[#b5ff3d] hover:scale-[1.03] active:scale-[0.99]"
                >
                  JOIN THE COMMUNITY
                </button>
                <p className="text-xs md:text-sm text-[#a4f431] tracking-wide mt-4">
                  Earn BRBK by contributing your data
                </p>
                <p className="text-[11px] text-gray-400 tracking-wide mt-2">
                  Contribute data from your robots
                </p>
              </div>

              {/* STREETWEAR MARQUEE */}
              <div className="relative my-10 border-y border-white/10 bg-black">
                <div className="whitespace-nowrap overflow-hidden">
                  <div className="animate-[marquee_28s_linear_infinite] py-3 text-xs tracking-[0.5em] text-white/70">
                    <span className="mx-8">BRBK</span>
                    <span className="mx-8">OPEN DATA FACTORY</span>
                    <span className="mx-8">DATA DROPS</span>
                    <span className="mx-8">ROBOT SKILLS</span>
                    <span className="mx-8">DATADAO</span>
                    <span className="mx-8">BARBARIKA</span>
                    <span className="mx-8">BRBK</span>
                    <span className="mx-8">OPEN DATA FACTORY</span>
                    <span className="mx-8">DATA DROPS</span>
                    <span className="mx-8">ROBOT SKILLS</span>
                  </div>
                </div>
              </div>

              {/* Supported Robots */}
              <div className="mt-16 md:mt-20">
                <h2 className="text-2xl md:text-3xl tracking-widest mb-8 md:mb-10 text-center text-[#a4f431]">
                  SUPPORTED ROBOTS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  <RobotCard
                    name="SO-ARM100"
                    desc="Low-cost 6-DOF robotic arm. Fully supported."
                    imgSrc="/robots/so-arm100.png"
                  />
                  <RobotCard
                    name="K-SCALE"
                    desc="Humanoid platform. Integration in progress."
                    imgSrc="/robots/k-scale.png"
                    soon
                  />
                  <RobotCard
                    name="ARX5"
                    desc="Precision arm. Driver development underway."
                    imgSrc="/robots/arx5.png"
                    soon
                  />
                  <RobotCard
                    name="TORSSEN"
                    desc="Collaborative robot. SDK integration planned."
                    imgSrc="/robots/torssen.png"
                    soon
                  />
                  <RobotCard
                    name="UNITREE HUMANOID"
                    desc="Humanoid platform. Integration planned."
                    imgSrc="/robots/unitree.png"
                    soon
                  />
                  <RobotCard
                    name="OPEN ARMS"
                    desc="Open-source manipulators. Support coming soon."
                    imgSrc="/robots/open-arms.png"
                    soon
                  />
                </div>
              </div>
            </>
          )}

          {/* STORE */}
          {activePage === "store" && (
            <div>
              <h2 className="text-4xl md:text-5xl tracking-widest mb-4 md:mb-5 text-[#a4f431] leading-tight">
                STORE
              </h2>
              <p className="text-sm md:text-base text-gray-400 mb-10 md:mb-12">
                Premium robotics hardware and gear for researchers and builders
              </p>

              {/* Drops Banner */}
              <div className="relative bg-gradient-to-br from-[#a4f431] to-[#8BE948] p-8 md:p-10 mb-14 md:mb-16 text-center overflow-hidden rounded">
                <h3
                  className="text-2xl md:text-3xl tracking-widest text-black mb-3 md:mb-4 font-black leading-none"
                  style={{ fontFamily: "Impact, sans-serif" }}
                >
                  DROPS
                </h3>
                <p className="text-sm text-black mb-5 md:mb-6">
                  Exclusive drops for cameras, sensors, motors, Barbarika streetwear & tokens
                </p>
                <button
                  className="bg-black text-[#a4f431] px-8 md:px-10 py-3 md:py-4 text-xs md:text-sm font-bold tracking-widest rounded"
                  onClick={() => alert("Drops coming soon! Follow us for updates.")}
                >
                  NOTIFY ME
                </button>
              </div>

              {/* Products Grid */}
              <h3 className="text-base md:text-xl tracking-widest mb-5 md:mb-6">
                ROBOTS & HARDWARE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                <StorePreorderCard
                  imgSrc="/store/so-arm100.png"
                  title="SO-ARM100"
                  desc="Complete 6-DOF robotic arm kit with gripper"
                  contact="Contact: praveen@barbarika.foundation"
                />
                <StoreSoonImageCard
                  imgSrc="/store/k-scale.png"
                  title="K-SCALE HUMANOID"
                  desc="Advanced humanoid platform for research"
                />
                <StoreSoonImageCard
                  imgSrc="/store/arx5.png"
                  title="ARX5 ARM"
                  desc="Precision 5-DOF manipulation system"
                />
                <StoreSoonImageCard
                  imgSrc="/store/torssen.png"
                  title="TORSSEN COBOT"
                  desc="Industrial collaborative robot"
                />
                <StoreSoonImageCard
                  imgSrc="/store/unitree.png"
                  title="UNITREE HUMANOID"
                  desc="Humanoid platform"
                />
                <StoreSoonImageCard
                  imgSrc="/store/open-arms.png"
                  title="OPEN ARMS KIT"
                  desc="Open-source manipulator"
                />
                <StoreSoonImageCard
                  imgSrc="/store/realsense.png"
                  title="REALSENSE CAMERA"
                  desc="Depth camera for 3D perception"
                />
                <StoreSoonImageCard
                  imgSrc="/store/full-setup.png"
                  title="FULL SETUP"
                  desc="Complete teleoperation system"
                />
              </div>

              {/* Shipping Banner */}
              <div className="mt-14 md:mt-16 bg-[#0f0f0f] border border-[#a4f431] p-7 md:p-8 text-center rounded">
                <p className="text-sm text-[#a4f431] tracking-wider mb-2">
                  🚀 FREE SHIPPING ON ORDERS OVER $500
                </p>
                <p className="text-xs text-gray-400">
                  All products ship with full documentation, software support, and integration guides
                </p>
              </div>
            </div>
          )}

          {/* CALIBRATION */}
          {activePage === "calibration" && (
            <FeatureDetail
              title="CALIBRATION"
              bullets={[
                "Camera intrinsic/extrinsic calibration",
                "Robot kinematics calibration",
                "Leader–follower alignment",
                "Sensor zeroing and scaling",
              ]}
              comingSoon
            />
          )}

          {/* CONTROL */}
          {activePage === "control" && (
            <FeatureDetail
              title="TELEOPERATION"
              bullets={[
                "VR, Exoskeleton, Leader Arms",
                "Low-latency real-time control",
                "Multi-camera recording",
                "Joint/torque logging",
              ]}
              comingSoon
            />
          )}

          {/* UPLOAD (LIVE NOW) */}
          {activePage === "upload" && (
            <div>
              <h2 className="text-3xl md:text-4xl tracking-widest mb-3 text-[#a4f431]">
                UPLOAD TO DATADAO
              </h2>
              <p className="text-sm leading-relaxed text-gray-300 mb-3">
                Upload datasets and earn BRBK tokens.
              </p>
              <span className="inline-block px-3 py-1 border border-green-500 text-green-500 text-[11px] tracking-widest mt-1">
                ● LIVE NOW
              </span>
              <ul className="mt-6 space-y-3 text-sm text-gray-300">
                <li>• Connect Google account</li>
                <li>• Client-side encryption</li>
                <li>• Earn BRBK tokens</li>
                <li>• IPFS permanent storage</li>
              </ul>
              <button
                onClick={openModal}
                className="mt-8 bg-[#a4f431] text-black px-8 md:px-10 py-3 md:py-4 text-base md:text-lg font-bold tracking-widest uppercase transition-all hover:bg-[#b5ff3d]"
              >
                UPLOAD
              </button>
            </div>
          )}

          {/* DATASETS (COMING SOON) */}
          {activePage === "datasets" && (
            <div>
              <h2 className="text-3xl md:text-4xl tracking-widest mb-3 text-[#a4f431]">
                BROWSE DATASETS
              </h2>
              <p className="text-sm leading-relaxed text-gray-300 mb-3">
                Explore community robot datasets. Free for research.
              </p>
              <span className="inline-block px-3 py-1 border border-[#ff4500] text-[#ff4500] text-[11px] tracking-widest mt-1">
                COMING SOON
              </span>
              <ul className="mt-6 space-y-3 text-sm text-gray-300">
                <li>• Search by robot type and task</li>
                <li>• Preview videos and trajectories</li>
                <li>• Download in LeRobot format</li>
                <li>• Filter by data modalities</li>
              </ul>
            </div>
          )}

          {/* ANNOTATE */}
          {activePage === "annotate" && (
            <FeatureDetail
              title="ANNOTATE DATA"
              bullets={[
                "Object detection and segmentation",
                "Task-level semantic annotations",
                "Keypoint and grasp labeling",
                "Vision-language auto-labeling",
              ]}
              comingSoon
            />
          )}

          {/* VISUALIZE */}
          {activePage === "visualize" && (
            <FeatureDetail
              title="VISUALIZE DATA"
              bullets={[
                "Multi-camera playback",
                "Joint trajectory plotting",
                "Force/torque analysis",
                "3D robot visualization",
              ]}
              comingSoon
            />
          )}

          {/* REPLAY */}
          {activePage === "replay" && (
            <FeatureDetail
              title="REPLAY SESSIONS"
              bullets={[
                "Frame-by-frame playback",
                "Synchronized multi-camera",
                "Trajectory overlays",
                "Episode comparison",
              ]}
              comingSoon
            />
          )}

          {/* TRAINING */}
          {activePage === "training" && (
            <FeatureDetail
              title="AI TRAINING"
              bullets={[
                "One-click cloud GPU training",
                "ACT, Diffusion Policy, BC architectures",
                "Hyperparameter optimization",
                "Cloud GPU infrastructure with PrimeIntellect (Coming Soon)",
              ]}
              comingSoon
            />
          )}

          {/* AI CONTROL */}
          {activePage === "aicontrol" && (
            <FeatureDetail
              title="AI CONTROL"
              bullets={[
                "One-click model deployment",
                "Real-time inference",
                "Browse community skills",
                "Earn BRBK for popular models",
              ]}
              comingSoon
            />
          )}

          {/* SKILL STORE */}
          {activePage === "skillstore" && (
            <div>
              <h2 className="text-3xl md:text-4xl tracking-widest mb-3 text-[#a4f431]">
                SKILL STORE
              </h2>
              <p className="text-sm leading-relaxed text-gray-300 mb-3">
                Discover, install, and compose robot skills as lightweight adapters.
              </p>
              <span className="inline-block px-3 py-1 border border-[#ff4500] text-[#ff4500] text-[11px] tracking-widest mt-1">
                COMING SOON
              </span>
              <ul className="mt-6 space-y-3 text-sm text-gray-300">
                <li>
                  • <b>LoRA/Adapter Skills</b>: Parameter-efficient fine-tuning packs (PEFT) that specialize a base VLA/Policy for a task (e.g., “open drawer”, “wipe table”, “insert peg”).
                </li>
                <li>
                  • <b>Composable</b>: Chain skills into routines; adapters load per-task at runtime with low VRAM overhead.
                </li>
                <li>
                  • <b>Multi-modal I/O</b>: Vision embeddings + proprioception + language prompts; adapters bind to specific observation/action spaces.
                </li>
                <li>
                  • <b>Safety Shims</b>: Optional constraints & guard adapters (limits, force caps, workspace masks).
                </li>
                <li>
                  • <b>Telemetry & Scoring</b>: On-device metrics + eval traces to rate skill reliability before publishing.
                </li>
              </ul>
              <div className="mt-6 text-xs text-gray-400">
                Publishers package a <i>manifest</i> (model hash, base-model, robot bindings, sensors, license) + <i>adapter weights</i>. Consumers install, map bindings, and run.
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[#121212] border-2 border-[#a4f431] p-8 md:p-10 max-w-md w-11/12 relative rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-5 text-3xl text-[#a4f431] bg-transparent border-0 cursor-pointer hover:text-[#b5ff3d]"
            >
              ×
            </button>

            <h2 className="text-xl md:text-2xl mb-6 md:mb-8 tracking-widest text-center">
              Beta Program: How it works
            </h2>

            <ul className="mb-6 md:mb-8 list-none text-sm">
              <li className="py-3 leading-relaxed text-gray-300 border-b border-white/10">
                • Connect your Google account
              </li>
              <li className="py-3 leading-relaxed text-gray-300 border-b border-white/10">
                • Your data is encrypted client-side
              </li>
              <li className="py-3 leading-relaxed text-gray-300 border-b border-white/10">
                • Encrypted data stored in Google Drive
              </li>
              <li className="py-3 leading-relaxed text-gray-300 border-b border-white/10">
                • Pointer registered with <span className="font-semibold">VANA</span>
              </li>
              <li className="py-3 leading-relaxed text-gray-300 border-b border-white/10">
                • Send your datasets for primary checks to{" "}
                <span className="font-semibold">praveen@barbarika.foundation</span>
              </li>
              <li className="py-3 leading-relaxed text-gray-300">
                • Once verified, we’ll add your email to our <span className="font-semibold">Beta Users</span> list and unlock early-access uploads
              </li>
            </ul>

            <div className="text-[11px] text-gray-400 mb-4 text-center">
              This is the onboarding process for our closed beta program.
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 w-full p-4 bg-white text-black text-sm font-bold cursor-pointer hover:bg-gray-100 transition-colors rounded"
            >
              <div className="w-5 h-5 bg-blue-500 rounded-sm" />
              Sign in with Google
            </button>
          </div>
        </div>
      )}

      <WhiteFooter />

      {/* marquee keyframes */}
      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Fallback UserProfile component
 * Replace this with your real component once you add profile/UserProfile.tsx
 */
function UserProfile() {
  return (
    <div className="border border-white/10 bg-[#0f0f0f] p-6 rounded">
      <h2 className="text-xl font-bold tracking-wider mb-2">User Profile</h2>
      <p className="text-sm text-white/70">
        Placeholder component: <code>./profile/UserProfile</code> not found.
      </p>
      <ul className="list-disc list-inside text-xs text-white/60 mt-3">
        <li>
          Create <code>app/profile/UserProfile.tsx</code> (or{" "}
          <code>components/profile/UserProfile.tsx</code>).
        </li>
        <li>
          Export it as <code>export function UserProfile() {"{"} ... {"}"}</code>{" "}
          or <code>export default</code>.
        </li>
        <li>Restore the import at the top of this file.</li>
      </ul>
    </div>
  );
}

/** White Footer (not on grid; white background) */
function WhiteFooter() {
  return (
    <footer className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/barbarikaAI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-black/5"
              title="Follow on X"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
                <path d="M18.244 2H21l-6.5 7.43L22.5 22H16l-5-6-5.5 6H3l7.1-7.77L1.5 2h6.6l4.4 5.5L18.244 2zM16 20l-9.5-12L4 4h2.5l9.5 12L20 20h-4z" />
              </svg>
            </a>
            <span className="text-black/50">/</span>
            <span>
              contact:{" "}
              <a
                href="mailto:praveen@barbarika.foundation"
                className="underline underline-offset-4 hover:text-[#5a7a22]"
              >
                praveen@barbarika.foundation
              </a>
            </span>
          </div>
          <p className="tracking-wide text-black/70">
            BARBARIKA DataDAO — Open Data Factory for Robotics
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Cards & Helpers */
function RobotCard({
  name,
  desc,
  imgSrc,
  soon,
}: {
  name: string;
  desc: string;
  imgSrc: string;
  soon?: boolean;
}) {
  return (
    <div className="relative bg-[#0f0f0f] border-2 border-[#2a2a2a] p-7 text-center transition-all hover:border-[#a4f431] hover:-translate-y-[2px] rounded">
      {soon && (
        <div className="absolute top-2 right-2 bg-[#ff4500] text-white px-2 py-1 text-[9px] tracking-wide rounded">
          COMING SOON
        </div>
      )}
      <div className="w-36 h-36 mx-auto mb-5 bg-[#151515] border-2 border-[#333] rounded flex items-center justify-center overflow-hidden">
        <img src={imgSrc} alt={name} className="w-full h-full object-contain" />
      </div>
      <div className="text-[15px] tracking-widest mb-1.5 font-bold">{name}</div>
      <p className="text-[12px] text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureDetail({
  title,
  bullets,
  comingSoon,
}: {
  title: string;
  bullets: string[];
  comingSoon?: boolean;
}) {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl tracking-widest mb-6 md:mb-8 text-[#a4f431]">
        {title}
      </h2>
      <p className="text-sm leading-relaxed text-gray-300 mb-5">
        {featureLead(title)}
      </p>
      <ul className="list-none space-y-2.5">
        {bullets.map((b, i) => (
          <li key={i} className="text-sm text-gray-300">
            • {b}
          </li>
        ))}
      </ul>
      {comingSoon && (
        <div className="mt-8 text-center bg-[#0f0f0f] border-2 border-[#ff4500] p-7 rounded">
          <h3
            className="text-xl md:text-2xl tracking-widest mb-2 text-[#ff4500] font-black leading-none"
            style={{ fontFamily: "Impact, Arial Black, sans-serif" }}
          >
            COMING SOON
          </h3>
          <p className="text-sm text-gray-400">
            We’re polishing this module for contributors. Stay tuned.
          </p>
        </div>
      )}
    </div>
  );
}

function featureLead(title: string) {
  const map: Record<string, string> = {
    CALIBRATION:
      "Automated calibration for accurate control and data collection.",
    TELEOPERATION: "Control robots and record demonstration data.",
    "ANNOTATE DATA": "Annotate robot data for foundation models.",
    "VISUALIZE DATA": "Analyze robot data with visualization tools.",
    "REPLAY SESSIONS": "Review recorded teleoperation sessions.",
    "AI TRAINING": "Train imitation learning models from your data.",
    "AI CONTROL": "Deploy AI models and browse skill marketplace.",
  };
  return map[title] ?? "";
}

/** Store cards */
function StorePreorderCard({
  imgSrc,
  title,
  desc,
  contact,
}: {
  imgSrc: string;
  title: string;
  desc: string;
  contact: string;
}) {
  return (
    <div
      className="relative bg-[#0f0f0f] border-2 border-[#2a2a2a] p-7 text-center hover:border-[#a4f431] transition-all cursor-pointer rounded"
      onClick={() => alert("Pre-order coming soon!")}
    >
      <div className="absolute top-2 right-2 bg-[#a4f431] text-black px-2 py-1 text-[9px] tracking-wide font-bold rounded">
        PRE-ORDER
      </div>
      <div className="w-36 h-36 mx-auto mb-5 bg-[#151515] border-2 border-[#333] flex items-center justify-center rounded overflow-hidden">
        <img src={imgSrc} alt={title} className="w-full h-full object-contain" />
      </div>
      <div className="text-lg tracking-widest mb-2 font-bold">{title}</div>
      <p className="text-[12px] text-gray-400 leading-relaxed">{desc}</p>
      {/* Smaller email text so it never overflows */}
      <div className="mt-4 text-xs text-[#a4f431] font-bold break-words">
        {contact}
      </div>
    </div>
  );
}

function StoreSoonImageCard({
  imgSrc,
  title,
  desc,
}: {
  imgSrc: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative bg-[#0f0f0f] border-2 border-[#2a2a2a] p-7 text-center hover:border-[#a4f431] transition-all rounded">
      <div className="absolute top-2 right-2 bg-[#ff4500] text-white px-2 py-1 text-[9px] tracking-wide rounded">
        AVAILABLE SOON
      </div>
      <div className="w-36 h-36 mx-auto mb-5 bg-[#151515] border-2 border-[#333] flex items-center justify-center rounded overflow-hidden">
        <img src={imgSrc} alt={title} className="w-full h-full object-contain" />
      </div>
      <div className="text-lg tracking-widest mb-2 font-bold">{title}</div>
      <p className="text-[12px] text-gray-400 leading-relaxed">{desc}</p>
      <div className="mt-3 text-xs text-gray-400">Available Soon</div>
    </div>
  );
}