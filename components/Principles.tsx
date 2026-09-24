"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    num: "01",
    title: "Lorem ipsum principle title",
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
  },
  {
    num: "02",
    title: "Lorem ipsum principle title",
    body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
  },
  {
    num: "03",
    title: "Lorem ipsum principle title",
    body: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea.",
  },
  {
    num: "04",
    title: "Lorem ipsum principle title",
    body: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  },
];

export default function Principles() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowRefs.current.forEach((row) => {
      if (!row) return;
      gsap.fromTo(
        row,
        { opacity: 0.2, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            end: "top 60%",
            scrub: 0.5,
          },
        }
      );
    });
  }, []);
}