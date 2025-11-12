'use client';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import type React from 'react';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ['start start', 'end end'],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Create breakpoints that include 0 and approach 1.0 for better distribution
    const cardsBreakpoints = content.map((_, index) =>
      index === cardLength - 1 ? 0.99 : index / (cardLength - 1),
    );

    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      animate={{
        backgroundColor: 'transparent',
      }}
      className="relative flex h-[30rem] justify-center space-x-8 md:space-x-12 overflow-y-auto rounded-2xl p-6 md:p-8 scrollbar-hide"
      ref={ref}
    >
      <div className="relative flex items-start px-4 md:px-6">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={`${item.title}-${index}`} className="my-16 md:my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-xl md:text-2xl font-bold text-foreground mb-4"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-sm md:text-base mt-6 max-w-sm text-muted-foreground leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-32 md:h-40" />
        </div>
      </div>
      <div
        className={cn(
          'sticky top-10 hidden h-64 w-80 md:w-96 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 lg:block bg-card',
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
