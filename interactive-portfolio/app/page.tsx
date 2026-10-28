"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

type LibrarySceneProps = {
  onSelect: (title: string) => void;
};

const LibraryScene = dynamic<LibrarySceneProps>(
  () => import("../components/LibraryScene"),
  {
    ssr: false,
    loading: () => (
      <div className="scene-canvas scene-loading">
        正在布置 Lucy 的小书架……
      </div>
    ),
  }
);

const titles = [
  "About Lucy",
  "My Journey",
  "Resume",
  "Little Things",
  "Event Budget Manager",
  "Data & Insights",
  "The Product Lab",
  "Marketing Stories",
  "Creative Studio",
  "Work Diaries",
  "Leadership Notes",
  "My Toolbox",
  "Beyond the Screen",
];

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="library-page">
      <header className="library-header">
        <a href="#home">❧ Lucy’s Little Library.</a>
        <span>a small corner of my world</span>
      </header>

      <section id="home" className="library-intro">
        <p className="eyebrow">STORIES, IDEAS & LITTLE THINGS</p>

        <h1>
          Hi, I&apos;m <em>Lucy!</em>
        </h1>

        <p className="subtitle">
          Business × Technology × Creativity
        </p>

        <p className="welcome">
          Welcome to my little library, where every book tells a story.
        </p>
      </section>

      <section className="library-display" aria-label="Explore the library">
        <LibraryScene onSelect={setSelected} />

        <p className="instruction">
          ✧ Pick a book to explore my world! ✧
        </p>

        <p className="scene-help">
          Drag to look around · Hover over a book to see its title
        </p>

        <div className="book-navigation" aria-label="Portfolio sections">
          {titles.map((title) => (
            <button
              key={title}
              type="button"
              onClick={() => setSelected(title)}
              aria-pressed={selected === title}
            >
              {title}
            </button>
          ))}
        </div>

        <p className="chapter-status" role="status" aria-live="polite">
          {selected
            ? `${selected} — this chapter is still being written.`
            : "Every chapter starts with a little curiosity."}
        </p>
      </section>

      <footer className="library-footer">
        Made with love & a little curiosity.
      </footer>
    </main>
  );
}