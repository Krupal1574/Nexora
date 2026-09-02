export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    role: "Senior Full Stack Engineer",
    company: "FinTech Innovations",
    content: "Nexora completely transformed my job search. Their Launch Plan helped me rebrand my profile, and I landed a Senior role with a 40% salary bump within 6 weeks.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: "t2",
    name: "David Chen",
    role: "Cloud Architect",
    company: "CloudScale Systems",
    content: "The Accelerate Plan was exactly what I needed. The mock interviews were rigorous and prepared me perfectly for the technical rounds. Worth every penny.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    id: "t3",
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "TechFlow",
    content: "I was struggling to get past the ATS systems. Nexora's resume optimization service changed everything. My interview rate went from 5% to 45% immediately.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=emily"
  },
  {
    id: "t4",
    name: "Michael Barnes",
    role: "DevOps Engineer",
    company: "DataCorp",
    content: "Their career counseling is top-tier. They didn't just help me find a job; they helped me figure out the trajectory of my entire career in tech.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    id: "t5",
    name: "Aisha Patel",
    role: "Data Scientist",
    company: "Analytics Group",
    content: "The Summit Plan is the ultimate white-glove service. From the technical training to the final salary negotiation, the Nexora team was with me every step of the way.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=aisha"
  },
  {
    id: "t6",
    name: "James Wilson",
    role: "Frontend Developer",
    company: "Creative Web",
    content: "Great support and fantastic resources. I felt much more confident going into interviews after using their prep bundle.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=james"
  }
];
