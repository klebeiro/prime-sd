import React from "react";

interface UserAccessLayoutProps {
  title: string;
  children: React.ReactNode;
}
  
export function UserAccessLayout({ title, children }: UserAccessLayoutProps) {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h1 className="text-xl font-semibold text-center mb-6 text-[#29638A]">{title}</h1>
        {children}
      </form>
    </main>
  );
}
