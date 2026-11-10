import React from "react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { CosmicItemsData } from "@/data/CosmicItemsData";




export default function CosmicOverview() {
  return (
    <section id="cosmicOverview" className= "relative w-full px-6 py-24 md:px-10 lg:px-16">

      {/* Section Heading */}
      <div className="mx-auto mb-14 max-w-3xl text-center ">
        <p className="mb-3 text-md bg- uppercase tracking-[0.35em] text-primary">
          Explore the Cosmos
        </p>

        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Discover the Universe
        </h2>

        <p className="mt-5 text-muted-foregrounmdd md:text-lg">
          From planets and stars to distant galaxies, explore the wonders
          that shape our universe.
        </p>
      </div>

      {/* Cosmic Cards */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CosmicItemsData.map((item) => (
          <Card
            key={item.title}
            className="group relative overflow-hidden border-white/10 bg-white/4 p-0 backdrop-blur-md transition-all duration-500  hover:border-white/20 hover:bg-white/[0.07] hover:shadow-2xl"
          >
            {/* Image */}
              <Link href={item.href || "#"}>
                <div className="relative aspect-4/3 overflow-hidden cursor-pointer">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover  transition-transform duration-700 group-hover:scale-110"
                    />
              

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)]" />

                  {/* Title on Image */}
                  <div className="absolute bottom-5 left-5">
                    <CardTitle className="text-2xl text-white capitalize">
                      {item.title}
                    </CardTitle>
                  </div>
                </div>
              </Link>

            {/* Content */}
            <CardHeader className="px-5 pt-5">
              <CardDescription className="text-sm leading-relaxed text-white/60">
                {item.description}
              </CardDescription>
            </CardHeader>

          {/* Button */}
            <CardFooter className="px-5 pb-5">
              <Link
          
                href={item.href || "#"}
            
          
                className="
                  group
                  capitalize
                  w-full
                  rounded-xl
                  border border-white/6
                  bg-white/3
                  px-4
                  py-5
                  text-center
                  text-sm
                  font-medium
                  text-foreground-secondary

                  transition-all
                  duration-300
                  
                  hover:-translate-y-0.5
                  hover:border-primary-light/30
                  hover:bg-primary/8
                  hover:text-primary-light
                  hover:shadow-[0_0_25px_var(--glow-purple)]
                "
              >
                <span>Explore {item.title}</span>

                <span
                  className="
                    ml-2
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}