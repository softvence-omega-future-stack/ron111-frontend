import React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
