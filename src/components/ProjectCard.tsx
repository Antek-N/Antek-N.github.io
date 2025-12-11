import React, { useState, useRef } from "react";
import type { Project } from "../types";

// Dynamically import all files from the 'icons' directory.
const icons = import.meta.glob('../assets/icons/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

// Dynamically import all files from the 'screens' directory (for previews).
const screens = import.meta.glob('../assets/screens/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

// Define the ProjectCard functional component, accepting a single project object as props
export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const iconSrc = icons[`../assets/icons/${project.icon}`];  // Construct the source path for the project icon

  const previewPath = `../assets/screens/${project.preview}`;  // Construct the path and source for the project preview image (screen)
  const previewSrc = project.preview ? screens[previewPath] : null;  // Only load the preview source if a preview filename is provided

  const [showPreview, setShowPreview] = useState(false);  // State to control visibility of the preview popup
  const [popupPosition, setPopupPosition] = useState<'top' | 'bottom'>('top');  // State to determine if the popup should appear above or below the card

  const timerRef = useRef<number | null>(null);  // Ref for managing the hover delay timeout
  const cardRef = useRef<HTMLElement>(null);  // Ref for the article element to measure its position

  // Handler for mouse entering the card
  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (timerRef.current) clearTimeout(timerRef.current);

    // If no preview image is available, stop
    if (!previewSrc) return;

    // Set a delay before showing the preview
    timerRef.current = setTimeout(() => {
      if (cardRef.current) {
        // Get the card's position on the screen
        const rect = cardRef.current.getBoundingClientRect();
        // Determine popup position: if the card is high on the screen (less than 300px from top), show popup below ('bottom')
        if (rect.top < 300) {
          setPopupPosition('bottom');
        } else {
          setPopupPosition('top');
        }
      }
      setShowPreview(true);  // Show the preview
    }, 500);  // 500ms delay
  };

  // Handler for mouse leaving the card
  const handleMouseLeave = () => {
    // Clear the timeout to prevent the popup from appearing late
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowPreview(false);  // Hide the preview
  };

  return (
      <article
          ref={cardRef} // Attach ref to the card
          // Styling for the card, including 3D hover effect and z-index bump
          className="group relative flex h-full flex-col rounded-2xl bg-slate-900 border border-white/10 transition-transform duration-300 hover:-translate-y-1 hover:z-[100]"
          onMouseEnter={handleMouseEnter} // Attach mouse enter handler
          onMouseLeave={handleMouseLeave} // Attach mouse leave handler
      >

        {/* Conditional rendering of the project preview popup */}
        {showPreview && previewSrc && (
            <div
                // Positioning the popup relative to the card, using calculated position (top/bottom)
                className={`absolute left-1/2 -translate-x-1/2 w-72 sm:w-[400px] z-50 pointer-events-auto cursor-default
              ${popupPosition === 'top' ? 'bottom-full' : 'top-full'}
            `}
            >
              <div
                  // Apply transition based on position to control animation origin
                  className={`transition-all duration-300 transform 
                ${popupPosition === 'top' ? 'origin-bottom pb-4' : 'origin-top pt-4'}
             `}>

                {/* Preview image container with styling */}
                <div className="rounded-xl overflow-hidden bg-slate-800 shadow-2xl shadow-black border border-indigo-500/50 p-1 relative bg-clip-padding">
                  <img
                      src={previewSrc}
                      alt="Preview"
                      className="w-full h-auto rounded-lg block"
                  />
                  {/* Small 'Preview' label at the bottom */}
                  <div className="px-2 py-1 bg-slate-900/95 text-center border-t border-white/5">
                    <span className="text-[10px] text-indigo-300 uppercase tracking-wider font-bold">Preview</span>
                  </div>
                </div>

                {/* Arrow pointer for the popup */}
                <div
                    className={`absolute left-1/2 -translate-x-1/2 border-8 border-transparent
                    ${popupPosition === 'top'
                        // Arrow pointing down (from popup to card)
                        ? 'top-[calc(100%-16px)] -mt-[1px] border-t-indigo-500/50'
                        // Arrow pointing up (from popup to card)
                        : 'bottom-[calc(100%-16px)] -mb-[1px] border-b-indigo-500/50'
                    }
                  `}
                />
              </div>
            </div>
        )}

        {/* Decorative background element for the hover effect (glowing border) */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 blur transition duration-500 group-hover:opacity-50" />

        {/* Main content wrapper of the card (above the glowing effect) */}
        <div className="relative flex h-full flex-col rounded-2xl bg-slate-900 p-6 overflow-hidden">

          {/* Top section: Icon, Name, and Links */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Project icon container */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 border border-white/10 p-2 backdrop-blur-sm">
                <img
                    src={iconSrc}
                    alt=""
                    className="h-full w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              {/* Project name */}
              <h3 className="font-bold text-lg text-slate-100 leading-tight group-hover:text-indigo-300 transition-colors">
                {project.name}
              </h3>
            </div>

            {/* Project links (Demo and Repo) */}
            <div className="flex gap-2 z-10 items-center">
              {/* Conditional link to project demo/live view */}
              {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" title="Live Demo" rel="noreferrer noopener" className="rounded-full bg-white/5 p-2 text-violet-400 transition-all hover:bg-violet-600 hover:text-white hover:scale-110">
                    {/* Icon for demo */}
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /><path d="M12 3a15 15 0 0 0 0 18" /></svg>

                  </a>
              )}
              {/* Link to project repository (GitHub) */}
              <a href={project.repoUrl} target="_blank" rel="noreferrer noopener" title="GitHub Repository" className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-indigo-500 hover:text-white transition-all hover:scale-110">
                {/* GitHub icon */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>

          {/* Project description */}
          <p className="text-sm text-slate-400 mb-6 leading-relaxed group-hover:text-slate-300 transition-colors">
            {project.description}
          </p>

          {/* Technologies used (at the bottom) */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {/* Map through technologies and display each as a styled tag */}
              {project.technologies.map((t) => (
                  <span key={t} className="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-indigo-400/20">
                    {t}
                  </span>
              ))}
            </div>
          </div>
        </div>
      </article>
  );
};