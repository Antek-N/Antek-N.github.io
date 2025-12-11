import React from "react";
import type { Profile } from "../types";

type FooterProps = {
    profile: Profile;
};

// Define the Footer functional component, accepting profile data as props
export const Footer: React.FC<FooterProps> = ({ profile }) => {
    // Destructure necessary fields from the profile object
    const { techStack, location, openToWork, socials, cvUrl } = profile;

    return (
        // Main footer element with top border and background styling
        <footer className="mt-20 border-t border-white/10 bg-black/20 pt-12 pb-8 w-full">
            {/* Inner container for content, centered and max-width */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Grid layout for footer sections (1 column on mobile, 3 on medium screens) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* Core Stack section */}
                    <div className="space-y-4 text-left">
                        <div>
                            <h3 className="text-white font-semibold">Core Stack</h3>

                            {/* Container for technology tags */}
                            <div className="mt-3 flex flex-wrap gap-2 max-w-sm">
                                {/* Map through techStack array and display each technology as a tag */}
                                {techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:border-indigo-500/30 transition-colors cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact section */}
                    <div className="space-y-3 flex flex-col md:items-center">
                        <h3 className="text-white font-semibold">Contact</h3>
                        {/* List of contact details */}
                        <ul className="space-y-2 text-sm text-slate-400 flex flex-col md:items-center">
                            {/* Email link */}
                            <li>
                                <a href={`mailto:${socials.email}`} className="hover:text-indigo-400 transition flex items-center gap-2 w-fit">
                                    {/* Email icon SVG */}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    {socials.email}
                                </a>
                            </li>
                            {/* Location display */}
                            <li className="flex items-center gap-2">
                                {/* Location icon SVG */}
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {location}
                            </li>
                        </ul>

                        {/* Conditional rendering for 'Open to work' badge */}
                        {openToWork && (
                            <div className="mt-4">
                                {/* Badge styling with animated 'ping' indicator */}
                                <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                    Open to work
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Connect section (Socials and CV) */}
                    <div className="space-y-3 flex flex-col md:items-end md:text-right">
                        <h3 className="text-white font-semibold">Connect</h3>
                        <div className="flex flex-col gap-2 text-sm text-slate-400 md:items-end">
                            {/* Conditional link to LinkedIn */}
                            {socials.linkedin && (
                                <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition w-fit">
                                    LinkedIn
                                </a>
                            )}
                            {/* Conditional link to GitHub */}
                            {socials.github && (
                                <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition w-fit">
                                    GitHub
                                </a>
                            )}
                            {/* Conditional link to download CV */}
                            {cvUrl && (
                                <a href={cvUrl} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition w-fit">
                                    Download CV (PDF)
                                </a>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};