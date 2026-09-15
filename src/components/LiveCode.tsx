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
    const delay = mistake
      ? 220
      : finished
        ? (line === LINES.length - 1 ? 2600 : line === 0 ? 900 : 560)
        : typoPoint
          ? 180
          : /[({[=;:,]/.test(previous) ? 110 : /\s/.test(current[column] ?? "") ? 18 : 32;

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
        const burst = current[column] === " " ? 2 : 1;
        setColumn((value) => Math.min(current.length, value + burst));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [line, column, mistake]);

  return (
    <pre className="cnc-live-code" aria-label="Live code example">
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
