"use client";

export function UserProfile() {
  return (
    <div className="border border-white/10 bg-[#0f0f0f] p-6 rounded">
      <h2 className="text-xl font-bold tracking-wider mb-2">User Profile</h2>
      <p className="text-sm text-white/70">
        Placeholder component — replace with real profile UI later.
      </p>
      <ul className="list-disc list-inside text-xs text-white/60 mt-3 space-y-1">
        <li>Show Google account info (name, email, picture)</li>
        <li>Show Drive storage info / dataset pointer</li>
        <li>Show tokens earned, etc.</li>
      </ul>
    </div>
  );
}