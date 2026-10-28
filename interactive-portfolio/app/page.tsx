"use client";

import { motion, MotionConfig } from "motion/react";
import { useState, type CSSProperties } from "react";

const shelves = [
  [
    { title: "About Lucy", color: "#A8BFA3" },
    { title: "My Journey", color: "#E8C4C4" },
    { title: "Resume", color: "#F3E5AB" },
    { title: "Little Things", color: "#D9D0E8" },
  ],
  [
    { title: "Event Budget Manager", color: "#E8C4C4" },
    { title: "Data & Insights", color: "#A8BFA3" },
    { title: "The Product Lab", color: "#F3E5AB" },
    { title: "Marketing Stories", color: "#D9D0E8" },
    { title: "Creative Studio", color: "#B0C4C8" },
  ],
  [
    { title: "Work Diaries", color: "#F3E5AB" },
    { title: "Leadership Notes", color: "#B0C4C8" },
    { title: "My Toolbox", color: "#E8C4C4" },
    { title: "Beyond the Screen", color: "#A8BFA3" },
  ],
];

type BookData = (typeof shelves)[number][number];

function Book({
  book,
  index,
  onSelect,
}: {
  book: BookData;
  index: number;
  onSelect: (title: string) => void;
}) {
  return (
    <motion.button
      type="button"
      className="library-book"
      style={
        {
          "--book-color": book.color,
          "--book-height": `${148 + ((index * 13) % 35)}px`,
        } as CSSProperties
      }
      initial={false}
      whileHover={{ y: -12, rotate: index % 2 ? 4 : -4 }}
      whileFocus={{ y: -12 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      onClick={() => onSelect(book.title)}
      aria-label={`${book.title} — coming soon`}
    >
      <span className="book-line" />
      <span className="book-title">{book.title}</span>
      <span className="book-ornament" aria-hidden="true">
        {index % 2 ? "✧" : "❧"}
      </span>
    </motion.button>
  );
}

function Plant({ flowers = false }: { flowers?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 145"
      className="library-plant"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="#7B906D"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M50 113Q54 65 32 26M50 112Q43 68 76 38" />
        <path
          d="M43 65Q16 65 22 43Q42 43 43 65"
          fill="#A8BFA3"
        />
        <path
          d="M51 84Q80 83 77 61Q56 62 51 84"
          fill="#A8BFA3"
        />
      </g>

      {flowers && (
        <g fill="#DCAFA9">
          <circle cx="31" cy="25" r="12" />
          <circle cx="76" cy="36" r="11" />
          <circle cx="31" cy="25" r="4" fill="#F3E5AB" />
          <circle cx="76" cy="36" r="4" fill="#F3E5AB" />
        </g>
      )}

      <path
        d="M24 108L31 138Q50 147 70 138L77 108Z"
        fill="#C7A58D"
      />
      <ellipse cx="50" cy="108" rx="27" ry="6" fill="#AE8B71" />
    </svg>
  );
}

function Coffee() {
  return (
    <svg viewBox="0 0 100 100" className="library-coffee" aria-hidden="true">
      <g fill="none" stroke="#AD967D" strokeWidth="2">
        <path d="M40 30Q28 19 41 8M55 30Q67 20 55 9" />
        <path d="M73 45Q98 38 87 64Q82 70 72 64" strokeWidth="5" />
      </g>
      <ellipse cx="47" cy="84" rx="40" ry="5" fill="#D3C2AD" />
      <path
        d="M19 43L25 75Q48 89 70 75L75 43"
        fill="#EFE6CF"
        stroke="#AF977C"
        strokeWidth="2"
      />
      <ellipse cx="47" cy="43" rx="28" ry="6" fill="#8E6A51" />
      <path
        d="M35 58Q40 50 48 59Q56 50 62 58Q66 65 48 74Q31 65 35 58"
        fill="#A8BFA3"
      />
    </svg>
  );
}

function LucyIllustration() {
  return (
    <svg
      viewBox="0 0 240 510"
      className="lucy-illustration"
      role="img"
      aria-label="An illustration of Lucy standing beside her bookshelf"
    >
      <defs>
        <pattern
          id="lucy-shirt"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <rect width="12" height="12" fill="#F0E7D6" />
          <path d="M0 9H12" stroke="#A8B4A0" strokeWidth="3" />
        </pattern>
      </defs>

      <g stroke="#685343" strokeWidth="2" strokeLinejoin="round">
        <path
          d="M78 160Q53 107 68 51Q79 12 120 20Q171 13 177 65L172 165Z"
          fill="#594334"
        />
        <path d="M109 130L108 167L143 167L139 126" fill="#E7BAA0" />
        <path
          d="M91 67Q91 122 124 139Q157 138 163 79Q130 79 112 49Z"
          fill="#EDC6A9"
        />
        <path
          d="M114 94h1m28-2h1"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M128 101l-3 10h6m-12 10q9 6 16-2"
          fill="none"
          strokeWidth="1.5"
        />
        <path
          d="M108 161Q125 179 144 161L170 178L177 250L202 231L216 249Q181 291 162 274L151 249L159 322L77 322L84 232L64 292L46 285L68 186Z"
          fill="url(#lucy-shirt)"
        />
        <path
          d="M202 232L216 214Q224 206 226 215L223 235L216 249"
          fill="#EDC6A9"
        />
        <path
          d="M46 285L42 308Q45 323 54 314L64 292"
          fill="#EDC6A9"
        />
        <path
          d="M78 314Q121 326 159 314L149 395L138 473L111 473L109 394L93 468L67 465L73 389Z"
          fill="#8D9D8A"
        />
        <path d="M113 337L109 394" fill="none" />
        <path
          d="M67 464L93 467L93 487Q69 499 43 490Q39 480 67 477Z"
          fill="#EEE4D1"
        />
        <path
          d="M111 470L138 470L146 491Q131 501 106 493Z"
          fill="#EEE4D1"
        />
      </g>

      <g fill="#DBA091" opacity=".4">
        <ellipse cx="106" cy="109" rx="7" ry="4" />
        <ellipse cx="148" cy="107" rx="7" ry="4" />
      </g>
    </svg>
  );
}

function Bookshelf({ onSelect }: { onSelect: (title: string) => void }) {
  return (
    <div className="bookshelf">
      <div className="bookshelf-crown" />

      {shelves.map((books, shelfIndex) => (
        <div className="bookshelf-row" key={shelfIndex}>
          <span className="shelf-number">0{shelfIndex + 1}</span>

          <div className="shelf-books">
            {books.map((book, index) => (
              <Book
                key={book.title}
                book={book}
                index={index}
                onSelect={onSelect}
              />
            ))}
          </div>

          <div className="shelf-decoration">
            {shelfIndex === 1 ? (
              <>
                <span className="handwritten-note">
                  stay curious
                  <br />♡
                </span>
                <Coffee />
              </>
            ) : (
              <Plant flowers={shelfIndex === 0} />
            )}
          </div>

          <div className="shelf-board" />
        </div>
      ))}

      <span className="bookshelf-leg leg-left" />
      <span className="bookshelf-leg leg-right" />
    </div>
  );
}

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <main className="library-page min-h-screen flex flex-col">
        <header className="library-header flex items-center justify-between">
          <a href="#home" className="library-brand">
            <span aria-hidden="true">❧</span> Lucy’s Little Library.
          </a>

          <span className="header-caption">a small corner of my world ↗</span>
        </header>

        <section id="home" className="library-hero flex flex-col items-center">
          <div className="library-intro">
            <p className="library-eyebrow">
              A COLLECTION OF STORIES & LITTLE THINGS
            </p>

            <h1>
              Hi, I&apos;m <em>Lucy!</em>
              <span aria-hidden="true">✧</span>
            </h1>

            <p className="library-subtitle">
              Business <span>×</span> Technology <span>×</span> Creativity
            </p>

            <p className="library-welcome">
              Welcome to my little library, where every book tells a story.
            </p>
          </div>

          <div className="scene-container">
            <div className="library-scene">
              <div className="watercolor-glow" />

              <div className="lucy-character">
                <p className="character-note">
                  make yourself
                  <br />
                  at home ♡
                </p>
                <LucyIllustration />
              </div>

              <Bookshelf onSelect={setSelectedBook} />
              <div className="floor-shadow" />
            </div>
          </div>

          <p className="library-instruction">
            <span aria-hidden="true">✧</span> Pick a book to explore my world!{" "}
            <span aria-hidden="true">✧</span>
          </p>

          <div className="library-status" role="status" aria-live="polite">
            {selectedBook ? (
              <>
                <strong>{selectedBook}</strong> — this chapter is still being
                written.
                <button
                  type="button"
                  onClick={() => setSelectedBook(null)}
                  aria-label="Dismiss message"
                >
                  ×
                </button>
              </>
            ) : (
              "Every chapter starts with a little curiosity."
            )}
          </div>
        </section>

        <footer className="library-footer flex items-center justify-between">
          <span>Made with love & a little curiosity.</span>
          <span>Always a work in progress ✧</span>
        </footer>
      </main>
    </MotionConfig>
  );
}