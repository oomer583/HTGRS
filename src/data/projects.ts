export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  github: string;
  link?: string;
  isExternal?: boolean;
  tags: string[];
  order: number;
}

export const initialProjects: Project[] = [
  {
    id: "project-1",
    title: "MoreSpace",
    description: "Dijital dünyada fark yaratan, kullanıcı deneyimi odaklı ve teknik mükemmeliyet hedefleyen profesyonel bir portfolyo örneği.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    github: "https://github.com/ardaanisancii",
    tags: ["React", "Tailwind", "Firebase"],
    order: 0
  }
];
