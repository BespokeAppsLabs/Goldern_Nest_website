"use client";

import React, { useState, useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Image from "next/image";
import { AnimatedTestimonials } from "./animated-testimonials";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onClick,
    isActive,
  }: {
    card: Card;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onClick: () => void;
    isActive: boolean;
  }) => (
    <motion.div
      layoutId={`card-${card.title}-${index}`}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={onClick}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer",
        hovered !== null && hovered !== index && !isActive && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end py-8 px-6 transition-opacity duration-300",
          hovered === index || isActive ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-full">
          <div className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-200 mb-2">
            {card.title}
          </div>
          {card.categoryDescription && (
            <div className="text-sm md:text-base text-white/90 leading-relaxed max-w-full overflow-hidden"
                 style={{
                   display: '-webkit-box',
                   WebkitLineClamp: 3,
                   WebkitBoxOrient: 'vertical' as const,
                   lineHeight: '1.4',
                   maxHeight: '4.2em'
                 }}>
              {card.categoryDescription}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  description?: string;
  categoryDescription?: string;
  images?: Array<{
    id: string;
    src: string;
    alt: string;
    title: string;
  }>;
  content?: React.ReactNode;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            
            <motion.div
              layoutId={`card-${active.title}-${cards.findIndex(c => c.title === active.title)}`}
              ref={ref}
              className="w-full max-w-[800px] h-auto max-h-[90vh] md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden rounded-2xl"
            >
              {/* <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  src={active.src}
                  alt={active.title}
                  width={500}
                  height={320}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div> */}

              <div className="rounded-2xl">
                {/* <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.button
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                    onClick={() => setActive(null)}
                  >
                    Close
                  </motion.button>
                </div> */}
                <div className="pt-2 relative px-4">
                  <motion.button
                    key={`button-${active.title}-${id}`}
                    layout
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: 0.05,
                      },
                    }}
                    className="flex absolute top-0 right-2 lg:hidden items-center justify-center rounded-full h-10 w-10  z-50 touch-manipulation"
                    onClick={() => setActive(null)}
                >
                 <CloseIcon />
                </motion.button>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-auto md:h-fit pb-10 flex flex-col items-start gap-4 overflow-hidden dark:text-neutral-400"
                  >
                    {active.categoryDescription && active.images ? (
                      <div className="w-full">
                        <AnimatedTestimonials
                          testimonials={active.images.map((image) => ({
                            quote: image.alt,
                            name: image.title,
                            designation: active.description || "",
                            src: image.src
                          }))}
                        />
                      </div>
                    ) : active?.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full ">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            onClick={() => setActive(card)}
            isActive={active === card}
          />
        ))}
      </div>
    </>
  );
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-black"
      aria-label="Close modal"
    >
      <title>Close modal</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
