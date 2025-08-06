// components/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
       signOut({
         callbackUrl: "https://glorious-system-pj7pqv74vrqq294vw-3000.app.github.dev"
       })
     }
      title="Log out"
      className="
        fixed bottom-4 right-4
        p-3 rounded-full
        bg-red-600 hover:bg-red-700
        text-white
        shadow-lg transition-colors
        z-50
      "
    >
      <LogOut className="w-6 h-6" />
    </button>
  );
}
