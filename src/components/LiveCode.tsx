"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "export async function createWorkspace(input: CreateWorkspaceInput) {",
  "  const result = await database.transaction(async (tx) => {",
  "    const account = await tx.account.create(input.account);",
  "    const workspace = await tx.workspace.create({ accountId: account.id });",
  "",
  "    await events.publish({ type: \"workspace.created\", workspace });",
  "    return workspace;",
  "  });",
  "",
  "  return WorkspaceSchema.parse(result);",
  "}",
];

function highlight(value: string) {
  return value.split(/(\b(?:export|async|function|const|await|return)\b|\b(?:string|number|boolean)\b|\"[^\"]*\"|\b\d+\b)/g).map((part, index) => {
    if (/^(export|async|function|const|await|return)$/.test(part)) {
      return <span key={index} className="text-sky-300">{part}</span>;
    }
    if (/^\"[^\"]*\"$/.test(part)) {
      return <span key={index} className="text-emerald-300">{part}</span>;
    }
    if (/^\d+$/.test(part)) {
      return <span key={index} className="text-amber-200">{part}</span>;
    }
    return <span key={index}>{part}</span>;
  });
}

export default function LiveCode() {
  const [line, setLine] = useState(0);
  const [column, setColumn] = useState(0);
  const [mistake, setMistake] = useState(false);
  const [inView, setInView] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const rootRef = useRef<HTMLPreElement>(null);

  // Only animate while the code panel is actually visible on screen.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      setInView(entries.some((entry) => entry.isIntersecting));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Freeze the typing loop while the user is scrolling (class toggled by
  // CncTeamHome). Repainting text per-keystroke on top of a scroll gesture
  // is exactly what makes low-end phones stutter.
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setScrolling(root.classList.contains("cnc-scrolling"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || scrolling) return;
    const current = LINES[line] ?? "";
    const finished = column >= current.length;
    const previous = current[column - 1] ?? "";
    const typoPoint = line === 1 && column === 18 && !mistake;
    const wobble = [0, 18, -10, 26, -6, 34, 8, -16, 22, -12][(line * 7 + column) % 10];
    const delay = mistake
      ? 320
      : finished
        ? (line === LINES.length - 1 ? 3200 : line === 0 ? 1100 : 620 + (line % 2) * 130)
        : typoPoint
          ? 280
          : /[({[=;:,]/.test(previous) ? 170 + wobble : /\s/.test(current[column] ?? "") ? 110 + wobble : 140 + wobble;

    const timer = window.setTimeout(() => {
      if (mistake) {
        setMistake(false);
        setColumn((value) => value + 1);
      } else if (typoPoint) {
        setMistake(true);
      } else if (finished) {
        if (line === LINES.length - 1) {
          setLine(0);
          setColumn(0);
        } else {
          setLine((value) => value + 1);
          setColumn(0);
        }
      } else {
        setColumn((value) => Math.min(current.length, value + 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [line, column, mistake, inView, scrolling]);

  return (
    <pre ref={rootRef} dir="ltr" className="cnc-live-code" aria-label="Live code example">
      {LINES.slice(0, line + 1).map((value, index) => {
        const visible = index === line ? value.slice(0, column) + (mistake ? "x" : "") : value;
        return (
          <code key={index} className="cnc-code-line">
            <span className="cnc-code-number">{String(index + 1).padStart(2, "0")}</span>
            <span>{highlight(visible)}</span>
            {index === line && <span className="cnc-code-caret" aria-hidden="true" />}
          </code>
        );
      })}
    </pre>
  );
}
