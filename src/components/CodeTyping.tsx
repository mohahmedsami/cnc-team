"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type CodeLine = {
  text: string;
  speed: number;
};

const CODE_LINES: CodeLine[] = [
  { text: 'import { MachineController } from "taklonjia/machine";', speed: 22 },
  { text: 'import type { Axis, Job } from "taklonjia/types";', speed: 22 },
  { text: "", speed: 18 },
  { text: "const machine = new MachineController({", speed: 20 },
  { text: '  host: "192.168.1.10",', speed: 15 },
  { text: "  port: 8080,", speed: 15 },
  { text: "  velocity: 2400,", speed: 15 },
  { text: "});", speed: 15 },
  { text: "", speed: 20 },
  { text: "async function runJob(path: string): Promise<void> {", speed: 20 },
  { text: "  await machine.connect();", speed: 18 },
  { text: "  await machine.home();", speed: 18 },
  { text: "  const axes: Axis[] = await machine.axes();", speed: 18 },
  { text: "  const job: Job = machine.load(path);", speed: 18 },
  { text: "  job.feedRate = 1200;", speed: 16 },
  { text: "  await machine.simulate(job);", speed: 18 },
  { text: "  await machine.run(job);", speed: 18 },
  { text: '  console.log("Job finished in", machine.elapsed);', speed: 18 },
  { text: "}", speed: 20 },
  { text: "", speed: 20 },
  { text: 'runJob("./parts/cam-shaft.step");', speed: 20 },
];

const RUNNER_LINES: CodeLine[] = [
  { text: 'import { readdir } from "node:fs/promises";', speed: 22 },
  { text: 'import { MachineController } from "taklonjia/machine";', speed: 22 },
  { text: 'import type { Job } from "taklonjia/types";', speed: 22 },
  { text: "", speed: 18 },
  { text: "const jobs: Job[] = [];", speed: 18 },
  { text: "", speed: 20 },
  { text: "export async function loadQueue(dir: string): Promise<void> {", speed: 20 },
  { text: "  const files = await readdir(dir);", speed: 18 },
  { text: "  for (const file of files) {", speed: 18 },
  { text: '    if (!file.endsWith(".step")) continue;', speed: 17 },
  { text: "    jobs.push(await MachineController.load(`./parts/${file}`));", speed: 17 },
  { text: "  }", speed: 18 },
  { text: "}", speed: 20 },
  { text: "", speed: 20 },
  { text: "export async function dispatch(): Promise<void> {", speed: 20 },
  { text: "  for (const job of jobs) {", speed: 18 },
  { text: "    await job.prepare();", speed: 18 },
  { text: "    await MachineController.simulate(job);", speed: 18 },
  { text: '    console.log("Running", job.name);', speed: 18 },
  { text: "    await job.run();", speed: 18 },
  { text: "  }", speed: 18 },
  { text: "}", speed: 20 },
];

type TabId = "main" | "runner";

const FILES: Record<TabId, { name: string; lines: CodeLine[] }> = {
  main: { name: "main.ts", lines: CODE_LINES },
  runner: { name: "runner.ts", lines: RUNNER_LINES },
};

const KEYWORD_RE =
  /(?:"[^"]*"|'[^']*'|`[^`]*`|\b\d+(?:\.\d+)?\b|\b(?:import|from|type|const|new|async|await|function|return|class|extends|throws|if|else|for|of|continue|console|void|Promise|string|number|boolean)\b)/g;

function highlight(code: string): ReactNode {
  const parts = code.split(KEYWORD_RE);
  const matches = code.match(KEYWORD_RE) ?? [];
  const nodes: ReactNode[] = [];

  parts.forEach((part, index) => {
    if (part) {
      nodes.push(
        <span key={`p${index}`} className="text-slate-700">
          {part}
        </span>
      );
    }
    const match = matches[index];
    if (match !== undefined) {
      let className = "text-slate-700";
      if (match.startsWith('"') || match.startsWith("'") || match.startsWith("`")) className = "text-emerald-700";
      else if (/^\d/.test(match)) className = "text-orange-600";
      else if (/^(import|from|const|new|await|function|return|extends|if|else)$/.test(match))
        className = "text-sky-600";
      else if (
        /^(async|type|class|void|Promise|string|number|boolean|throws)$/.test(match) &&
        match !== "class"
      )
        className = "text-violet-600";
      else if (/^console$/.test(match)) className = "text-violet-600";
      nodes.push(
        <span key={`m${index}`} className={className} style={{ fontWeight: match === "console" ? 400 : 700 }}>
          {match}
        </span>
      );
    }
  });

  return nodes;
}

function CodeCaret() {
  return (
    <span
      className="mx-[1px] inline-block h-[1.15em] w-[0.58em] translate-y-[0.18em] animate-pulse rounded-[1px] bg-sky-500"
      aria-hidden="true"
    />
  );
}

export default function CodeTyping() {
  const [activeId, setActiveId] = useState<TabId>("main");
  const [typed, setTyped] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = FILES[activeId].lines;
    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (line >= lines.length) {
        setTyped(lines.map((l) => l.text));
        setDone(true);
        return;
      }

      const current = lines[line];

      if (current.text === "") {
        line += 1;
        timer = setTimeout(tick, 130);
        return;
      }

      char += 1;
      setTyped(
        lines
          .slice(0, line)
          .map((l) => l.text)
          .concat([current.text.slice(0, char)])
      );

      if (char >= current.text.length) {
        line += 1;
        char = 0;
        timer = setTimeout(tick, 210);
      } else {
        timer = setTimeout(tick, current.speed);
      }
    };

    timer = setTimeout(tick, 800);

    return () => clearTimeout(timer);
  }, [activeId]);

  const switchFile = (id: TabId) => {
    if (id === activeId) return;
    setActiveId(id);
    setTyped([]);
    setDone(false);
  };

  const activeFile = FILES[activeId];

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [typed, done]);

  const activeLine = done ? -1 : typed.length - 1;
  const activeLength = done ? 0 : typed[activeLine]?.length ?? 0;

  return (
    <div className="border-b border-slate-200 bg-slate-50/60">
      <div className="overflow-hidden border-x-0 bg-white" dir="ltr">
        {/* Tabs */}
        <div className="flex items-center overflow-x-auto border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center">
            {(Object.keys(FILES) as TabId[]).map((id) => {
              const active = id === activeId;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => switchFile(id)}
                  aria-pressed={active}
                  className={`flex items-center border-b-2 px-4 py-2.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-sky-500 bg-white text-slate-800"
                      : "border-transparent bg-transparent text-slate-400 hover:bg-white/60 hover:text-slate-600"
                  }`}
                >
                  <span dir="ltr">{FILES[id].name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code pane */}
        <div ref={containerRef} className="relative max-h-72 overflow-y-auto px-4 py-3">
          {typed.map((line, index) => (
            <div key={index} className="relative">
              <span className="relative whitespace-pre pr-4 font-mono text-xs leading-6 sm:text-[13px]">
                {highlight(line)}
                {index === activeLine && <CodeCaret />}
              </span>
            </div>
          ))}

          {done && (
            <div key="empty-last" className="relative">
              <span className="pr-4">
                <CodeCaret />
              </span>
            </div>
          )}

          {/* Compile toast */}
          {done && (
            <div className="absolute right-3 top-3 animate-[fadeSlideIn_0.5s_ease] rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 shadow-sm">
              <span className="mr-1 font-bold">✓</span> Compiled successfully in 1.2s
            </div>
          )}
        </div>
      </div>
    </div>
  );
}