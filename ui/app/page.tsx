// "use client";

// import { Button } from "@/components/ui/button";
// import { LogOut } from "lucide-react";
// import { signOut, useSession } from "next-auth/react";
// import { LoginButton } from "./auth/LoginButton";
// import { UserProfile } from "./profile/UserProfile";

// export default function Home() {
//   const { data: session, status } = useSession();
//   const isLoading = status === "loading";

//   const handleSignOut = () => {
//     signOut({ callbackUrl: "/" });
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="border-b bg-white dark:bg-black py-4">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">VANA DLP Demo</h1>
//           {session && (
//             <Button
//               variant="ghost"
//               size="sm"
//               className="flex items-center gap-1"
//               onClick={handleSignOut}
//             >
//               <LogOut className="h-4 w-4" />
//               <span>Sign out</span>
//             </Button>
//           )}
//         </div>
//       </header>

//       <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center space-y-4">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             <p>Loading...</p>
//           </div>
//         ) : session ? (
//           <div className="w-full max-w-2xl flex justify-center">
//             <UserProfile />
//           </div>
//         ) : (
//           <div className="flex flex-col items-center text-center space-y-8 max-w-2xl">
//             <div className="space-y-4">
//               <h2 className="text-3xl font-bold tracking-tight">
//                 VANA Data Liquidity Pool Demo
//               </h2>
//               <p className="text-lg text-gray-600 dark:text-gray-400">
//                 Sign in with your Google account to contribute your data to the
//                 VANA network. Your data will be encrypted and stored in your
//                 Google Drive.
//               </p>
//             </div>

//             <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg w-full max-w-md space-y-4 text-center">
//               <div className="space-y-2">
//                 <h3 className="font-semibold">How it works:</h3>
//                 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
//                   <li>• Connect your Google account</li>
//                   <li>• Your data is encrypted client-side</li>
//                   <li>• Encrypted data is stored in your Google Drive</li>
//                   <li>• A pointer to your data is registered with VANA</li>
//                 </ul>
//               </div>

//               <div className="pt-4 flex justify-center">
//                 <LoginButton />
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       <footer className="border-t py-6 text-center text-sm text-gray-500 dark:text-gray-400">
//         <div className="container mx-auto px-4">
//           <p>This app demonstrates VANA DLP integration with Google Drive</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [activePage, setActivePage] = useState('home');
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleGoogleSignIn = () => {
    signIn('google');
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a4f431]"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen bg-black text-white font-mono">
        <header className="relative z-10 bg-white py-5 flex justify-between items-center px-8">
          <div className="flex items-center gap-4">
            <img src="https://raw.githubusercontent.com/metaseeker1/barbarika_site/refs/heads/main/hjg.png" alt="BARBARIKA" className="h-12" />
            <h1 className="text-4xl font-black tracking-widest text-black" style={{fontFamily: 'Impact, Arial Black, sans-serif'}}>BARBARIKA</h1>
          </div>
          <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 bg-black text-[#a4f431] hover:bg-gray-800 transition-colors">
            <span>Sign out</span>
          </button>
        </header>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome, {session.user?.name}!</h2>
          <p className="text-gray-400">You are now connected to BARBARIKA DataDAO</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="fixed inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, white 49px, white 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, white 49px, white 50px)'
      }}></div>

      <header className="relative z-10 bg-white py-5 flex justify-center items-center">
        <div className="flex items-center gap-4">
          <img src="https://raw.githubusercontent.com/metaseeker1/barbarika_site/refs/heads/main/hjg.png" alt="BARBARIKA" className="h-12" />
          <h1 className="text-4xl font-black tracking-widest text-black" style={{fontFamily: 'Impact, Arial Black, sans-serif'}}>BARBARIKA</h1>
        </div>
      </header>

      <div className="relative z-1 flex min-h-[calc(100vh-90px)]">
        <nav className="w-60 bg-black bg-opacity-95 border-r border-white border-opacity-10 py-5">
          <div className="mb-8">
            <div className="px-5 py-2 text-[10px] text-white tracking-wider font-bold mb-1">NAVIGATION</div>
            <div className={`px-5 py-3 cursor-pointer transition-all flex items-center gap-3 text-xs tracking-wide ${activePage === 'home' ? 'bg-[#a4f431] text-black font-bold' : 'text-gray-400 hover:bg-[#a4f431] hover:bg-opacity-10 hover:text-[#a4f431]'}`} onClick={() => setActivePage('home')}>
              <span>⊞</span><span>DASHBOARD</span>
            </div>
          </div>
          <div className="mb-8">
            <div className="px-5 py-2 text-[10px] text-white tracking-wider font-bold mb-1">CONTROL & RECORD</div>
            <div className={`px-5 py-3 cursor-pointer transition-all flex items-center gap-3 text-xs tracking-wide ${activePage === 'calibration' ? 'bg-[#a4f431] text-black font-bold' : 'text-gray-400 hover:bg-[#a4f431] hover:bg-opacity-10 hover:text-[#a4f431]'}`} onClick={() => setActivePage('calibration')}>
              <span>▲</span><span>CALIBRATION</span>
            </div>
            <div className={`px-5 py-3 cursor-pointer transition-all flex items-center gap-3 text-xs tracking-wide ${activePage === 'control' ? 'bg-[#a4f431] text-black font-bold' : 'text-gray-400 hover:bg-[#a4f431] hover:bg-opacity-10 hover:text-[#a4f431]'}`} onClick={() => setActivePage('control')}>
              <span>⊙</span><span>CONTROL ROBOT</span>
            </div>
            <div className={`px-5 py-3 cursor-pointer transition-all flex items-center gap-3 text-xs tracking-wide ${activePage === 'upload' ? 'bg-[#a4f431] text-black font-bold' : 'text-gray-400 hover:bg-[#a4f431] hover:bg-opacity-10 hover:text-[#a4f431]'}`} onClick={() => setActivePage('upload')}>
              <span>↑</span><span>UPLOAD DATASET</span>
              <span className="ml-auto bg-green-500 text-black px-1.5 py-0.5 text-[8px] tracking-wide font-bold rounded-sm animate-pulse">LIVE</span>
            </div>
            <div className={`px-5 py-3 cursor-pointer transition-all flex items-center gap-3 text-xs tracking-wide ${activePage === 'datasets' ? 'bg-[#a4f431] text-black font-bold' : 'text-gray-400 hover:bg-[#a4f431] hover:bg-opacity-10 hover:text-[#a4f431]'}`} onClick={() => setActivePage('datasets')}>
              <span>☰</span><span>BROWSE DATASETS</span>
            </div>
          </div>
          <div className="mb-8">
            <div className="px-5 py-2 text-[10px] text-white tracking-wider font-bold mb-1">SHOP</div>
            <div className={`px-5 py-3 cursor-pointer transition-all flex items-center gap-3 text-xs tracking-wide ${activePage === 'store' ? 'bg-[#a4f431] text-black font-bold' : 'text-gray-400 hover:bg-[#a4f431] hover:bg-opacity-10 hover:text-[#a4f431]'}`} onClick={() => setActivePage('store')}>
              <span>⊠</span><span>STORE</span>
            </div>
          </div>
        </nav>

        <main className="flex-1 p-16 overflow-y-auto">
          {activePage === 'home' && (
            <>
              <div className="flex flex-col items-center justify-center text-center min-h-[600px]">
                <div className="mb-8">
                  <img src="https://raw.githubusercontent.com/metaseeker1/barbarika_site/refs/heads/main/hjg.png" alt="BARBARIKA" className="max-w-xs w-full" />
                </div>
                <h1 className="text-5xl font-black tracking-wider mb-5 uppercase" style={{fontFamily: 'Impact, Arial Black, sans-serif'}}>OPEN DATA FACTORY FOR ROBOTICS</h1>
                <p className="text-base text-gray-400 tracking-widest mb-12">Lets Solve Data Scarcity in Robotics Together</p>
                <p className="text-2xl font-bold tracking-widest mb-10">CONNECT - TELEOPERATE - CONTRIBUTE - TRAIN</p>
                <button onClick={openModal} className="bg-[#a4f431] text-black px-16 py-5 text-2xl font-bold tracking-widest uppercase transition-all hover:bg-[#b5ff3d] hover:scale-105">JOIN THE COLLECTIVE</button>
                <p className="text-sm text-[#a4f431] tracking-wide mt-5">Contribute data from your robots</p>
              </div>

              <div className="mt-20">
                <h2 className="text-3xl tracking-widest mb-10 text-center text-[#a4f431]">SUPPORTED ROBOTS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-[#1a1a1a] bg-opacity-95 border-2 border-[#333] p-8 text-center transition-all hover:border-[#a4f431] hover:-translate-y-1">
                    <div className="w-36 h-36 mx-auto mb-5 bg-[#2a2a2a] border-2 border-[#444] flex items-center justify-center text-6xl">🦾</div>
                    <div className="text-lg tracking-widest mb-2 font-bold">SO-ARM100</div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Low-cost 6-DOF robotic arm. Fully supported.</p>
                  </div>
                  <div className="bg-[#1a1a1a] bg-opacity-95 border-2 border-[#333] p-8 text-center transition-all hover:border-[#a4f431] hover:-translate-y-1 relative">
                    <div className="absolute top-2 right-2 bg-[#ff4500] text-white px-2 py-1 text-[9px] tracking-wide">COMING SOON</div>
                    <div className="w-36 h-36 mx-auto mb-5 bg-[#2a2a2a] border-2 border-[#444] flex items-center justify-center text-6xl">🤖</div>
                    <div className="text-lg tracking-widest mb-2 font-bold">K-SCALE</div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Humanoid platform. Integration in progress.</p>
                  </div>
                  <div className="bg-[#1a1a1a] bg-opacity-95 border-2 border-[#333] p-8 text-center transition-all hover:border-[#a4f431] hover:-translate-y-1 relative">
                    <div className="absolute top-2 right-2 bg-[#ff4500] text-white px-2 py-1 text-[9px] tracking-wide">COMING SOON</div>
                    <div className="w-36 h-36 mx-auto mb-5 bg-[#2a2a2a] border-2 border-[#444] flex items-center justify-center text-6xl">🦿</div>
                    <div className="text-lg tracking-widest mb-2 font-bold">ARX5</div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">Precision arm. Driver development underway.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activePage === 'store' && (
            <div>
              <h2 className="text-5xl tracking-widest mb-5 text-[#a4f431]">STORE</h2>
              <p className="text-base text-gray-400 mb-12">Premium robotics hardware and gear for researchers and builders</p>
              <div className="bg-gradient-to-br from-[#a4f431] to-[#8BE948] p-10 mb-16 text-center relative">
                <div className="absolute top-2 right-5 bg-black text-[#a4f431] px-4 py-1 text-[10px] tracking-widest font-bold">NEW</div>
                <h3 className="text-3xl tracking-widest text-black mb-4 font-black" style={{fontFamily: 'Impact, sans-serif'}}>DROPS</h3>
                <p className="text-sm text-black mb-6">Tune into exclusive drops for cameras, sensors, motors, Barbarika streetwear & tokens</p>
                <button className="bg-black text-[#a4f431] px-10 py-4 text-sm font-bold tracking-widest" onClick={() => alert('Drops coming soon!')}>NOTIFY ME</button>
              </div>
            </div>
          )}

          {activePage === 'calibration' && (
            <div>
              <h2 className="text-4xl tracking-widest mb-8 text-[#a4f431]">CALIBRATION</h2>
              <p className="text-sm leading-relaxed text-gray-300">Automated calibration for accurate control and data collection.</p>
            </div>
          )}

          {activePage === 'control' && (
            <div>
              <h2 className="text-4xl tracking-widest mb-8 text-[#a4f431]">TELEOPERATION</h2>
              <p className="text-sm leading-relaxed text-gray-300">Control robots and record demonstration data.</p>
            </div>
          )}

          {activePage === 'upload' && (
            <div>
              <h2 className="text-4xl tracking-widest mb-8 text-[#a4f431]">UPLOAD TO DATADAO</h2>
              <p className="text-sm leading-relaxed text-gray-300 mb-8">Upload datasets and earn BARB tokens.</p>
              <button onClick={openModal} className="bg-[#a4f431] text-black px-10 py-4 text-lg font-bold tracking-widest uppercase transition-all hover:bg-[#b5ff3d]">UPLOAD</button>
            </div>
          )}

          {activePage === 'datasets' && (
            <div>
              <h2 className="text-4xl tracking-widest mb-8 text-[#a4f431]">BROWSE DATASETS</h2>
              <p className="text-sm leading-relaxed text-gray-300">Explore community robot datasets. Free for research.</p>
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-[#1a1a1a] border-2 border-[#a4f431] p-10 max-w-md w-11/12 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-5 text-3xl text-[#a4f431] bg-transparent border-0 cursor-pointer">×</button>
            <h2 className="text-2xl mb-8 tracking-widest text-center">How it works:</h2>
            <ul className="mb-8 list-none">
              <li className="py-3 text-sm leading-relaxed text-gray-300 border-b border-white border-opacity-10">• Connect your Google account</li>
              <li className="py-3 text-sm leading-relaxed text-gray-300 border-b border-white border-opacity-10">• Your data is encrypted client-side</li>
              <li className="py-3 text-sm leading-relaxed text-gray-300 border-b border-white border-opacity-10">• Encrypted data stored in Google Drive</li>
              <li className="py-3 text-sm leading-relaxed text-gray-300 border-b border-white border-opacity-10">• Pointer registered with VANA</li>
            </ul>
            <button onClick={handleGoogleSignIn} className="flex items-center justify-center gap-2 w-full p-4 bg-white text-black text-sm font-bold cursor-pointer">
              <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
              Sign in with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}