"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const current = LINES[line] ?? "";
    const finished = column >= current.length;
    const previous = current[column - 1] ?? "";
    const typoPoint = line === 1 && column === 18 && !mistake;
    const wobble = [0, 18, -10, 26, -6, 34, 8, -16, 22, -12][(line * 7 + column) % 10];
    const delay = mistake
      ? 240
      : finished
        ? (line === LINES.length - 1 ? 3200 : line === 0 ? 1100 : 620 + (line % 2) * 130)
        : typoPoint
          ? 200
          : /[({[=;:,]/.test(previous) ? 130 + wobble : /\s/.test(current[column] ?? "") ? 55 + wobble : 78 + wobble;

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
  }, [line, column, mistake]);

  return (
    <pre dir="ltr" className="cnc-live-code" aria-label="Live code example">
      {LINES.slice(0, line + 1).map((value, index) => {
        const visible = index === line ? value.slice(0, column) + (mistake ? "x" : "") : value;
        return (
          <code key={`${index}-${visible}`} className="cnc-code-line">
            <span className="cnc-code-number">{String(index + 1).padStart(2, "0")}</span>
            <span>{highlight(visible)}</span>
            {index === line && <span className="cnc-code-caret" aria-hidden="true" />}
          </code>
        );
      })}
    </pre>
  );
}
