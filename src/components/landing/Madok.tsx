'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const journeyData = [
  { id: 1, year: '2024', desc: 'Guinness World Record event achieved.' },
  { id: 2, year: '2007', desc: 'Garima Vidya Vihar CBSE School launched.' },
  { id: 3, year: '2009', desc: 'Little Garimayans Preschool started.' },
  { id: 4, year: '1988', desc: 'Shree Garima Vidya Mandir founded.' },
  { id: 5, year: '2025', desc: 'Humanoid robot learning innovation introduced.' },
];

function Madok() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const sectionTrigger = { trigger: ref.current, start: 'top 80%' };

      gsap.set('.madok-heading', { y: 30, opacity: 0 });
      gsap.to('.madok-heading', {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: sectionTrigger,
      });

      gsap.set('.journey-card', {
        x: -28,
        y: 18,
        scale: 0.9,
        opacity: 0,
        filter: 'blur(8px)',
      });
      gsap.set('.progress-fill', { width: '0%' });

      const journeyTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.journey-progress',
          start: 'top 86%',
          end: 'top 30%',
          scrub: 1,
        },
      });

      journeyTl
        .to('.progress-fill', {
          width: '100%',
          ease: 'none',
          duration: 1,
        }, 0)
        .to('.journey-card', {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: {
            each: 0.16,
            from: 'start',
          },
          duration: 0.28,
          ease: 'power2.out',
        }, 0.04);

      gsap.fromTo(
        '.progress-shimmer',
        { xPercent: -150 },
        {
          xPercent: 350,
          duration: 2.2,
          repeat: -1,
          ease: 'power1.inOut',
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="w-full py-20 px-4 md:px-8 flex flex-col items-center font-sans">

      <h2 className="madok-heading text-white text-3xl md:text-4xl font-bold tracking-wide mb-14 text-center">
        Our Journey
      </h2>

      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {journeyData.map((item) => (
          <div
            key={item.id}
            className="journey-card bg-[#242d65]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg transition-transform hover:-translate-y-1 hover:bg-[#2c3678] duration-300 flex flex-col justify-start"
          >
            <h3 className="text-white text-2xl font-extrabold mb-3 tracking-wide">
              {item.year}
            </h3>
            <p className="text-white text-sm font-medium leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="journey-progress w-full max-w-7xl h-4 rounded-full border border-dashed border-blue-500/50 bg-transparent flex items-center p-[2px] relative overflow-hidden">
        <div className="progress-fill relative h-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-full shadow-[0_0_10px_rgba(0,198,255,0.6)] overflow-hidden">
          <div
            className="progress-shimmer absolute inset-y-0 w-1/3"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
            }}
          />
        </div>
      </div>

    </section>
  );
}

export default Madok;
