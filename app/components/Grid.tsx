import React from "react";

const Grid = ({ children }: { children: React.ReactNode }) => (
  <section className="flex w-full justify-center py-10 md:py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 xl:gap-10">
        {children}
      </div>
    </div>
  </section>
);

export default Grid;
