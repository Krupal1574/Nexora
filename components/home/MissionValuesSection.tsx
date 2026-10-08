"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function MissionValuesSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="mission-values-title"
      className="overflow-hidden bg-[#F5F1E8]"
    >
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid items-center lg:grid-cols-[44%_56%]">
          {/* =========================================================
              LEFT — MISSION COPY
          ========================================================= */}
          <motion.div
            initial={{
              opacity: 0,
              x: reducedMotion ? 0 : -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-20 pb-12 lg:pb-0"
          >
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F26A21]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F26A21]">
                What drives us
              </span>
            </div>

            {/* Heading */}
            <h2
              id="mission-values-title"
              className="
                max-w-[500px]
                text-[clamp(3rem,5vw,5rem)]
                font-semibold
                leading-[0.9]
                tracking-[-0.06em]
                text-[#171717]
              "
            >
              Our Mission
              <br />
              <span className="text-[#77736D]">&amp; Values</span>
            </h2>

            {/* Mission */}
            <p className="mt-7 max-w-[510px] text-[14px] leading-[1.8] text-[#55534F] sm:text-[15px]">
              Our mission is to create meaningful employment while helping job
              seekers &amp; businesses grow with the right talent and
              opportunities. We believe in building lasting relationships
              through trust, transparency, and exceptional service.
            </p>

            {/* Bottom statement */}
            <div className="mt-8 flex items-center gap-4">
              <div className="relative h-[2px] w-16 overflow-hidden rounded-full bg-[#F26A21]">
                <div className="absolute inset-y-0 left-0 w-7 bg-[#8FB8D8]" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#77736D] sm:text-[11px]">
                People first. Relationships that last.
              </span>
            </div>
          </motion.div>

          {/* =========================================================
              RIGHT — PERSON + VALUES
          ========================================================= */}
          <div className="relative h-[500px] sm:h-[570px] lg:h-[610px]">
            {/* Large blue circle */}
            <motion.div
              initial={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.9,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-1/2
                h-[320px]
                w-[320px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#8FB8D8]
                sm:h-[410px]
                sm:w-[410px]
                lg:h-[455px]
                lg:w-[455px]
              "
            />

            {/* Small orange accent */}
            <div
              aria-hidden="true"
              className="
                absolute
                bottom-[9%]
                left-[16%]
                z-[1]
                h-12
                w-12
                rotate-[-12deg]
                rounded-[14px]
                bg-[#F26A21]
                sm:h-16
                sm:w-16
              "
            />

            {/* Person */}
            <motion.div
              initial={{
                opacity: 0,
                y: reducedMotion ? 0 : 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: 0.12,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                bottom-[1%]
                left-1/2
                z-10
                w-[285px]
                -translate-x-1/2
                sm:w-[355px]
                lg:w-[405px]
              "
            >
              <Image
                src="/images/mission-person-v3.png"
                alt="Professional representing Nexora's people-first approach"
                width={735}
                height={752}
                priority={false}
                className="
                  h-auto
                  w-full
                  object-contain
                  drop-shadow-[0_22px_28px_rgba(23,23,23,0.14)]
                "
              />
            </motion.div>

            {/* Editorial visual details */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              {/* Outer orbit */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: reducedMotion ? 1 : 0.92,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[390px]
                  w-[390px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-[#171717]/10
                  sm:h-[490px]
                  sm:w-[490px]
                  lg:h-[540px]
                  lg:w-[540px]
                "
              />

              {/* Small orbit dot */}
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[440px]
                  w-[440px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  sm:h-[535px]
                  sm:w-[535px]
                "
              >
                <span
                  className="
                    absolute
                    right-[7%]
                    top-[12%]
                    h-3
                    w-3
                    rounded-full
                    bg-[#F26A21]
                    shadow-[0_0_0_6px_rgba(242,106,33,0.10)]
                  "
                />
              </motion.div>

              {/* Blue small circle */}
              <div
                className="
                  absolute
                  right-[12%]
                  top-[14%]
                  h-5
                  w-5
                  rounded-full
                  bg-[#8FB8D8]
                "
              />

              {/* Orange square */}
              <div
                className="
                  absolute
                  bottom-[9%]
                  left-[14%]
                  h-14
                  w-14
                  rotate-[-12deg]
                  rounded-[16px]
                  bg-[#F26A21]
                  shadow-[0_12px_25px_rgba(242,106,33,0.16)]
                  sm:h-16
                  sm:w-16
                "
              />

              {/* Tiny blue square */}
              <div
                className="
                  absolute
                  bottom-[18%]
                  left-[8%]
                  h-3
                  w-3
                  rotate-45
                  rounded-[3px]
                  bg-[#8FB8D8]
                "
              />

              {/* Vertical editorial label */}
              <div
                className="
                  absolute
                  right-[2%]
                  top-1/2
                  hidden
                  -translate-y-1/2
                  lg:block
                "
              >
                <span
                  className="
                    writing-mode-vertical
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.35em]
                    text-[#77736D]
                  "
                >
                  People • Trust • Growth
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
