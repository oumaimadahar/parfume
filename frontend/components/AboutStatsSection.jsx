"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const stats = [
  { label: "RETAIL OUTLETS", value: 1500, display: "K" },
  { label: "PRODUCTS", value: 5000, display: "K" },
  { label: "CUSTOMERS", value: 1300000, display: "MILLION" },
  { label: "PHARMACISTS", value: 2500, display: "K" },
];

function formatNumber(num, display) {
  if (display === "K") return [(num / 1000).toFixed(1), "K"];
  if (display === "MILLION") return [(num / 1000000).toFixed(1), "MILLION"];
  return [num.toLocaleString(), ""];
}

export default function AboutStatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!inView) return;

    const intervals = stats.map((stat, i) => {
      const increment = Math.ceil(stat.value / 100);
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[i] < stat.value) {
            newCounts[i] = Math.min(newCounts[i] + increment, stat.value);
          }
          return newCounts;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, [inView]);

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, i) => {
          const [number, suffix] = formatNumber(counts[i], stat.display);
          return (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-[#e3ac28]">
                {number}
                <span className="text-[35px] md:text-[45px] ml-1">{suffix}</span>
              </span>
              <span className="text-gray-700 mt-2 font-medium">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
