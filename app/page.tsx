"use client"
import Hearder from "./_components/Hearder";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div className="md:px-16 lg:px-24 xl:px-36">
      {/** Header Section */}
        <Hearder />
      {/*** Hero Section */}
      <Hero />
    </div>
  );
}
