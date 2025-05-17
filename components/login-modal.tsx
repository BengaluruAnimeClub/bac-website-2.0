"use client";

import { signIn } from "next-auth/react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useUI } from "@/context/ui-context";
import { X } from 'lucide-react';
import { usePathname } from "next/navigation";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useUI();
  const pathname = usePathname();

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative p-8 bg-white rounded-lg shadow-xl w-full mx-4 max-w-sm sm:mx-auto sm:w-96 dark:bg-gray-900">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4"
          onClick={closeLoginModal}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
        <div className="flex justify-center mb-2"> {/* Adjusted mb from 3 to 2 */}
          <Icons.logo className="w-12 h-12" /> 
        </div>
        <h3 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4 mt-4">
          Log in to post comments!
        </h3>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full py-3 text-lg font-medium border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors duration-150 ease-in-out"
            onClick={() => signIn("google", { callbackUrl: pathname })}
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
            <span className="sm:hidden">Google</span>
            <span className="hidden sm:inline">Sign in with Google</span>
          </Button>
          <Button
            variant="outline"
            className="w-full py-3 text-lg font-medium border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors duration-150 ease-in-out"
            onClick={() => signIn("github", { callbackUrl: pathname })}
          >
            <Icons.gitHub className="w-6 h-6 mr-3" />
            <span className="sm:hidden">GitHub</span>
            <span className="hidden sm:inline">Sign in with GitHub</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
