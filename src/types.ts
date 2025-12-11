export interface Project {
  id: string;
  name: string;
  icon: string;
  preview?: string;
  description: string;
  technologies: string[];
  repoUrl: string;
  demoUrl?: string;
}

export interface Socials {
  github: string;
  linkedin: string;
  email: string;
}

export interface Profile {
  username: string;
  location: string;
  openToWork: boolean;
  socials: Socials;
  cvUrl: string;
  techStack: string[];
}
