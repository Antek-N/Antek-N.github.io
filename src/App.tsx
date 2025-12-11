import React, { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ProjectCard } from "./components/ProjectCard";
import type { Project, Profile } from "./types";
import projectsData from "./assets/data/projects.json";
import profileData from "./assets/data/profile.json";

// Define the main App functional component
const App: React.FC = () => {
    // Cast imported JSON data to defined TypeScript types
    const projects = projectsData as Project[];
    const profile = profileData as Profile;

    // Sets the document title using the username loaded from profile.json
    useEffect(() => {
        document.title = `Portfolio - ${profile.username}`;
    }, [profile.username]); // Dependency array ensures hook runs when profile data is available

    // Definition of variables for use in Helmet
    const ogTitleContent = `Portfolio - ${profile.username}`;
    const ogDescriptionContent = `A collection of web development projects and skills by ${profile.username}.`;

    // Variable for the icon path
    const faviconPath = '/icon.svg';

    return (
        // Main container with full viewport height and basic styling
        <main className="min-h-dvh bg-slate-950 text-slate-100 flex flex-col">

            {/* Helmet component for dynamic <head> tag management */}
            <Helmet>
                <meta property="og:title" content={ogTitleContent} />
                <meta property="og:description" content={ogDescriptionContent} />
                <link rel="icon" type="image/svg+xml" href={faviconPath} />
            </Helmet>

            {/* Header component, passing profile data */}
            <Header username={profile.username} profileUrl={profile.socials.github} />

            {/* Main content area, centered and responsive */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full grow">
                {/* Section title for Projects */}
                <h2 className="text-xl font-semibold mb-6 text-slate-200 border-l-4 border-indigo-500 pl-3">
                    Projects
                </h2>

                {/* Grid layout for displaying project cards */}
                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {/* Map through projects data and render a ProjectCard for each */}
                    {projects.map((p) => (
                        <ProjectCard key={p.id} project={p} />
                    ))}
                </section>
            </div>

            {/* Footer component, passing profile data */}
            <Footer profile={profile} />
        </main>
    );
};

// Export the App component for use in the application entry point
export default App;