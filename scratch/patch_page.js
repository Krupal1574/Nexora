const fs = require('fs');
const path = require('path');

const file = path.join('app', 'page.tsx');
let content = fs.readFileSync(file, 'utf8');

// Update services array
content = content.replace(
  /const services = \[\s+([\s\S]+?)\s+\];/,
  `const services = [
  { title: "Career Counseling", desc: "1-on-1 career mapping with domain advisors.", tag: "Strategy", img: "/images/modern_tech_team.jpg" },
  { title: "Resume Optimization", desc: "ATS-tailored resumes built to U.S. market standards.", tag: "Branding", img: "/images/software_developer.jpg" },
  { title: "Interview Preparation", desc: "Mock interviews and behavioral coaching with veterans.", tag: "Coaching", img: "/images/tech_interview.jpg" },
  { title: "Technical Training", desc: "Weekly webinars, skill upgrades and mock assessments.", tag: "Training", img: "/images/nexora-robot.png" },
];`
);

// We need to add the ServicesSection component above HomePage, and replace the services block inside HomePage.
const servicesSectionComponent = `
function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });
  
  function handleMouseMove(e: React.MouseEvent) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }
  
  return (
    <section className="section-spacing relative" onMouseMove={handleMouseMove}>
      <div className="container-wide relative z-10">
        <motion.span {...fadeUp()} className="eyebrow mb-8">What we actually do</motion.span>
        <MaskLines as="h2" className="display display-md mb-6" lines={["Engineering", <><span key="y" className="thin">your</span> next role.</>]} />
        <motion.p {...fadeUp(0.2)} className="text-[#94A3B8] max-w-xl mb-14">The parts of the job search most people get wrong, handled by people who do this every day.</motion.p>
        <div className="relative">
          {services.map((s, i) => (
            <MotionLink href="/services" key={s.title} className="row-link group"
              onMouseEnter={() => setHoveredService(i)}
              onMouseLeave={() => setHoveredService(null)}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, ease, delay: i * 0.08 }}>
              <span className="font-display text-sm">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-tight">{s.title}</h3>
                <p className="muted text-sm text-[#94A3B8] mt-2 max-w-lg">{s.desc}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="row-tag text-xs uppercase tracking-widest border border-current/30 rounded-full px-3 py-1">{s.tag}</span>
                <ArrowUpRight className="w-7 h-7 transition-transform duration-500 group-hover:rotate-45" />
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
      
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 w-[22rem] h-[16rem] rounded-2xl overflow-hidden border border-white/20 shadow-2xl hidden md:block"
        style={{
          x: springX,
          y: springY,
          opacity: hoveredService !== null ? 1 : 0,
          scale: hoveredService !== null ? 1 : 0.8,
          translateX: "-50%",
          translateY: "-50%"
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        {services.map((s, i) => (
          <img
            key={s.title}
            src={s.img}
            alt={s.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: hoveredService === i ? 1 : 0 }}
          />
        ))}
      </motion.div>
    </section>
  );
}
`;

// Insert the new component before HomePage
content = content.replace('/* ─── Page ─────────────────────────────────────────────────────────────── */', servicesSectionComponent + '\n/* ─── Page ─────────────────────────────────────────────────────────────── */');

// Replace the services block inside HomePage
const servicesBlockRegex = /\{\/\* SERVICES \*\/\}([\s\S]*?)(?=\{\/\* PROCESS)/;
content = content.replace(servicesBlockRegex, '{/* SERVICES */}\n      <ServicesSection />\n\n      ');

// For testimonials drag-to-scroll, add useMotionValue and useSpring to framer-motion import
content = content.replace(/import \{ motion, useInView, useScroll, useTransform \} from "framer-motion";/, 'import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";');

// Update Testimonials component
const dragTestimonialHook = `
  const railRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add('cursor-grabbing');
      el.style.scrollSnapType = 'none';
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
      el.style.scrollSnapType = 'x mandatory';
    };
    const onMouseUp = () => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
      el.style.scrollSnapType = 'x mandatory';
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', onMouseDown as any);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove as any);

    return () => {
      el.removeEventListener('mousedown', onMouseDown as any);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove as any);
    };
  }, []);
`;

content = content.replace(/function Testimonials\(\) \{([\s\S]+?)return \(/, (match, p1) => {
  return 'function Testimonials() {' + p1 + dragTestimonialHook + '\n  return (';
});

// Update the rail div in Testimonials
content = content.replace(/<div className="rail">/, '<div className="rail cursor-grab" ref={railRef}>');

fs.writeFileSync(file, content);
console.log("Done patching page.tsx");
