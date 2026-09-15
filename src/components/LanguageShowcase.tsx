"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { site } from "@/data/site";

type CodeLine = { text: string; speed: number };

type Language = {
  id: string;
  name: string;
  fileName: string;
  icon: string;
  logoClass?: string;
  keywords: string[];
  types: string[];
  constants: string[];
  builtins: string[];
  lines: CodeLine[];
};

const LANGS: Language[] = [
  {
    id: "javascript",
    name: "JavaScript",
    fileName: "server.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    keywords: ["const", "let", "var", "new", "function", "class", "extends", "return", "await", "async", "if", "else", "for", "while", "switch", "case", "break", "continue", "try", "catch", "finally", "throw", "typeof", "in", "of", "export", "import", "from", "require", "module", "default"],
    types: ["Promise", "Object", "Array", "Number", "String", "Boolean", "Error", "Function"],
    constants: ["true", "false", "null", "undefined", "this"],
    builtins: ["console"],
    lines: [
      { text: 'const http = require("http");', speed: 18 },
      { text: "", speed: 10 },
      { text: "const server = http.createServer((req, res) => {", speed: 18 },
      { text: '  res.writeHead(200, { "Content-Type": "text/plain" });', speed: 15 },
      { text: '  res.end("Hello from Taklonjia CNC!\\n");', speed: 15 },
      { text: "});", speed: 10 },
      { text: "", speed: 10 },
      { text: "server.listen(3000);", speed: 18 },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    fileName: "machine.ts",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    keywords: ["interface", "type", "const", "let", "async", "await", "function", "return", "if", "else", "export", "import", "from", "new", "class", "extends", "implements", "readonly", "satisfies", "keyof", "infer"],
    types: ["string", "number", "boolean", "void", "never", "Promise", "Axis", "Position", "Object", "Array"],
    constants: ["true", "false", "null", "undefined", "this"],
    builtins: [],
    lines: [
      { text: "interface Position {", speed: 20 },
      { text: "  x: number;", speed: 14 },
      { text: "  y: number;", speed: 14 },
      { text: "  z: number;", speed: 14 },
      { text: "}", speed: 14 },
      { text: "", speed: 12 },
      { text: "async function moveTo(p: Position): Promise<void> {", speed: 18 },
      { text: "  await machine.jog(p.x, p.y, p.z);", speed: 16 },
      { text: "}", speed: 14 },
    ],
  },
  {
    id: "python",
    name: "Python",
    fileName: "spindle.py",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    keywords: ["def", "return", "if", "elif", "else", "for", "while", "in", "not", "and", "or", "import", "from", "class", "pass", "break", "continue", "lambda", "yield", "async", "await", "try", "except", "finally", "raise", "with", "as", "del", "global"],
    types: ["int", "float", "str", "bool", "list", "dict", "tuple", "set", "np", "self"],
    constants: ["None", "True", "False"],
    builtins: ["print", "len", "range", "isinstance", "enumerate", "open"],
    lines: [
      { text: "import numpy as np", speed: 18 },
      { text: "", speed: 10 },
      { text: "class Spindle:", speed: 18 },
      { text: "    def __init__(self, rpm: int = 12000) -> None:", speed: 16 },
      { text: "        self.rpm = rpm", speed: 15 },
      { text: "", speed: 10 },
      { text: "    def brake(self) -> None:", speed: 16 },
      { text: '        print(f"Braking spindle from {self.rpm} rpm")', speed: 15 },
    ],
  },
  {
    id: "ruby",
    name: "Ruby",
    fileName: "coolant.rb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg",
    keywords: ["class", "def", "end", "unless", "if", "else", "elsif", "while", "until", "for", "in", "do", "module", "require", "attr_accessor", "attr_reader", "attr_writer", "return", "break", "next", "yield", "begin", "rescue", "ensure", "case", "when", "then", "and", "or", "not"],
    types: ["Integer", "Float", "String", "Array", "Hash", "Symbol", "Proc"],
    constants: ["nil", "true", "false", "self"],
    builtins: ["puts", "print", "p"],
    lines: [
      { text: "class Coolant", speed: 18 },
      { text: "  def initialize(on: false)", speed: 16 },
      { text: "    @on = on", speed: 14 },
      { text: "  end", speed: 14 },
      { text: "", speed: 10 },
      { text: "  def toggle!", speed: 15 },
      { text: "    @on = !@on", speed: 14 },
      { text: '    puts @on ? "Coolant ON" : "Coolant OFF"', speed: 14 },
      { text: "  end", speed: 14 },
      { text: "end", speed: 14 },
    ],
  },
  {
    id: "flutter",
    name: "Flutter",
    fileName: "machine_card.dart",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    keywords: ["class", "extends", "implements", "final", "const", "var", "void", "return", "required", "if", "else", "for", "while", "switch", "case", "break", "continue", "new", "get", "set", "abstract", "override", "factory"],
    types: ["String", "Widget", "StatelessWidget", "StatefulWidget", "BuildContext", "Text", "Card", "BorderRadius", "EdgeInsets", "Padding", "Center", "Key", "int", "double", "bool", "List", "Map"],
    constants: ["this", "super", "null", "true", "false"],
    builtins: [],
    lines: [
      { text: "class MachineCard extends StatelessWidget {", speed: 18 },
      { text: "  final String ip;", speed: 15 },
      { text: "", speed: 9 },
      { text: "  const MachineCard({super.key, required this.ip});", speed: 15 },
      { text: "", speed: 9 },
      { text: "  @override", speed: 14 },
      { text: "  Widget build(BuildContext context) {", speed: 16 },
      { text: "    return Card(child: Text('CNC @ $ip'));", speed: 15 },
      { text: "  }", speed: 14 },
      { text: "}", speed: 14 },
    ],
  },
  {
    id: "rust",
    name: "Rust",
    fileName: "home_axes.rs",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
    logoClass: "brightness-0 invert",
    keywords: ["use", "fn", "let", "mut", "pub", "const", "static", "impl", "trait", "struct", "enum", "match", "if", "else", "for", "while", "loop", "return", "move", "async", "await", "dyn", "ref", "where", "mod", "in", "break", "continue", "unsafe", "type", "as", "crate"],
    types: ["Vec", "String", "Duration", "str", "u8", "u32", "i32", "i64", "f64", "usize", "bool", "Result", "Option", "std", "thread", "Box"],
    constants: ["true", "false", "self", "Self"],
    builtins: ["println", "print", "format", "sleep", "from_millis", "spawn", "main"],
    lines: [
      { text: "use std::thread;", speed: 16 },
      { text: "use std::time::Duration;", speed: 16 },
      { text: "", speed: 10 },
      { text: "fn main() {", speed: 16 },
      { text: "    for i in 0..4 {", speed: 15 },
      { text: "        thread::spawn(move || {", speed: 15 },
      { text: "            thread::sleep(Duration::from_millis(150 * i));", speed: 14 },
      { text: '            println!("Axis {} homed", i);', speed: 14 },
      { text: "        });", speed: 15 },
      { text: "    }", speed: 15 },
      { text: "}", speed: 15 },
    ],
  },
  {
    id: "go",
    name: "Go",
    fileName: "main.go",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
    keywords: ["package", "import", "func", "for", "range", "if", "else", "switch", "case", "default", "return", "defer", "go", "type", "struct", "interface", "var", "const", "break", "continue", "select", "panic", "make", "new", "len", "cap", "append"],
    types: ["string", "int", "int64", "float64", "bool", "byte", "rune", "error", "fmt"],
    constants: ["nil", "true", "false"],
    builtins: ["Printf", "Println"],
    lines: [
      { text: "package main", speed: 16 },
      { text: "", speed: 10 },
      { text: 'import "fmt"', speed: 16 },
      { text: "", speed: 10 },
      { text: "func main() {", speed: 16 },
      { text: '    axes := []string{"X", "Y", "Z", "A"}', speed: 15 },
      { text: "    for _, axis := range axes {", speed: 15 },
      { text: '        fmt.Printf("Homing %s axis...\\n", axis)', speed: 14 },
      { text: "    }", speed: 14 },
      { text: "}", speed: 14 },
    ],
  },
  {
    id: "swift",
    name: "Swift",
    fileName: "cnc.swift",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
    keywords: ["import", "func", "let", "var", "for", "in", "if", "else", "switch", "case", "default", "return", "guard", "while", "do", "try", "catch", "throw", "as", "is", "struct", "class", "enum", "protocol", "extension", "init", "deinit", "override", "public", "private", "internal", "static", "mutating"],
    types: ["String", "Double", "Int", "Float", "Bool", "Character", "Array", "Dictionary", "Set", "Optional", "Foundation"],
    constants: ["true", "false", "nil", "self"],
    builtins: ["print"],
    lines: [
      { text: "import Foundation", speed: 16 },
      { text: "", speed: 10 },
      { text: 'let feeds: [String: Double] = ["X": 2400, "Y": 2400, "Z": 1200]', speed: 15 },
      { text: "", speed: 10 },
      { text: "for (axis, feed) in feeds {", speed: 15 },
      { text: '    print("\\(axis) at \\(feed) mm/min")', speed: 14 },
      { text: "}", speed: 14 },
    ],
  },
  {
    id: "kotlin",
    name: "Kotlin",
    fileName: "park.kt",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    keywords: ["data", "class", "suspend", "fun", "val", "var", "import", "if", "else", "when", "for", "while", "return", "try", "catch", "finally", "throw", "constructor", "init", "object", "override", "open", "sealed", "abstract", "private", "public", "internal", "lateinit", "package"],
    types: ["Double", "Position", "Machine", "Int", "Long", "Float", "Boolean", "String", "Array", "List", "Map", "Set", "Unit", "Any"],
    constants: ["null", "true", "false", "this", "super"],
    builtins: ["println", "print"],
    lines: [
      { text: "data class Position(val x: Double, val y: Double, val z: Double)", speed: 18 },
      { text: "", speed: 10 },
      { text: "suspend fun park(machine: Machine) {", speed: 17 },
      { text: "    machine.jog(Position(0.0, 0.0, 120.0))", speed: 15 },
      { text: '    println("Machine parked safely")', speed: 15 },
      { text: "}", speed: 15 },
    ],
  },
  {
    id: "csharp",
    name: "C#",
    fileName: "GCodeGenerator.cs",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    keywords: ["public", "sealed", "class", "return", "this", "private", "readonly", "static", "void", "new", "if", "else", "for", "foreach", "while", "switch", "case", "break", "continue", "try", "catch", "finally", "throw", "using", "partial", "const", "internal", "protected", "namespace", "interface", "record", "struct", "enum", "async", "await", "get", "set", "var", "override", "virtual", "abstract", "base"],
    types: ["string", "int", "double", "bool", "object", "decimal", "long", "char", "List", "Task", "Exception", "GCodeGenerator"],
    constants: ["true", "false", "null", "this", "base"],
    builtins: ["Console", "WriteLine", "Write"],
    lines: [
      { text: "public sealed class GCodeGenerator", speed: 18 },
      { text: "{", speed: 14 },
      { text: "    public string Linear(double x, double y, double feed)", speed: 16 },
      { text: "    {", speed: 14 },
      { text: '        return $"G1 X{x:F3} Y{y:F3} F{feed}";', speed: 15 },
      { text: "    }", speed: 14 },
      { text: "}", speed: 14 },
    ],
  },
];

const SWITCH_MS = 320;
const HOLD_MS = 3500;

const RAIN_GLYPHS = "アイタチトナニヌネノ0123456789$#*+=<>|ﾊﾋﾌﾍﾎ:.";
const RAIN_COLS = Array.from({ length: 36 }, (_, i) => ({
  color: i % 9 === 4 ? "#ff3131" : i % 9 === 7 ? "#ffb000" : i % 12 === 10 ? "#00e5ff" : "#00ff41",
  len: 12 + ((i * 37) % 8),
  dur: 6 + ((i * 53) % 8),
  delay: -((i * 29) % 14),
}));

function glyphAt(col: number, row: number) {
  const x = (col * 131 + row * 57 + 7) % RAIN_GLYPHS.length;
  return RAIN_GLYPHS[(x + RAIN_GLYPHS.length) % RAIN_GLYPHS.length];
}

function HackerRain() {
  const cells = useRef<Array<Array<HTMLSpanElement | null>>>([]);

  useEffect(() => {
    const id = setInterval(() => {
      const c = (Math.random() * RAIN_COLS.length) | 0;
      const col = cells.current[c];
      if (!col) return;
      for (let k = 0; k < 2; k++) {
        const r = (Math.random() * col.length) | 0;
        const el = col[r];
        if (el) el.textContent = RAIN_GLYPHS[(Math.random() * RAIN_GLYPHS.length) | 0];
      }
    }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-40 overflow-hidden sm:h-48" aria-hidden="true">
      <div className="absolute inset-0 flex justify-center">
        {RAIN_COLS.map((col, i) => (
          <div key={i} className="relative h-full flex-1 overflow-hidden">
            <div
              className="animate-rain-fall absolute inset-x-0 top-0 flex flex-col items-center font-mono text-sm leading-[22px]"
              style={{ animationDuration: `${col.dur}s`, animationDelay: `${col.delay}s` }}
            >
              {Array.from({ length: col.len * 2 }, (_, j) => {
                const row = j % col.len;
                const head = row === 0;
                return (
                  <span
                    key={j}
                    ref={(el) => {
                      if (!cells.current[i]) cells.current[i] = [];
                      cells.current[i][j] = el;
                    }}
                    className="block"
                    style={{
                      color: col.color,
                      opacity: head ? 1 : Math.max(0.15, 0.9 - row * 0.08),
                      textShadow: head ? `0 0 10px ${col.color}, 0 0 22px ${col.color}` : undefined,
                    }}
                  >
                    {glyphAt(i, j)}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0d0d0f] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0d0d0f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0d0d0f] to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0d0d0f] to-transparent sm:w-20" />
    </div>
  );
}

const TITLES = [
  {
    lang: "en",
    dir: "ltr",
    label: "English",
    text: "Contact Us",
    sub: "Websites, SaaS, apps & tech — invest in digital assets that grow your business.",
  },
  {
    lang: "fr",
    dir: "ltr",
    label: "Français",
    text: "Contactez-Nous",
    sub: "Sites web, SaaS, applis et tech — investissez dans des actifs numériques rentables.",
  },
  {
    lang: "ja",
    dir: "ltr",
    label: "日本語",
    text: "お問い合わせ",
    sub: "Web・SaaS・アプリ・技術への投資で、ビジネスを成長させよう。",
  },
  {
    lang: "ko",
    dir: "ltr",
    label: "한국어",
    text: "문의하기",
    sub: "웹사이트·SaaS·앱·기술 투자로 비즈니스를 성장시키세요.",
  },
  {
    lang: "zh-CN",
    dir: "ltr",
    label: "中文",
    text: "联系我们",
    sub: "投资网站、SaaS、应用与科技，助您的业务持续增长。",
  },
];

function RotatingTitle() {
  const [ti, setTi] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;
    const cycle = () => {
      timer = setTimeout(() => {
        if (!alive) return;
        setShown(false);
        timer = setTimeout(() => {
          if (!alive) return;
          setTi((v) => (v + 1) % TITLES.length);
          setShown(true);
          cycle();
        }, 450);
      }, 4000);
    };
    cycle();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  const t = TITLES[ti];
  return (
    <>
      <p
        lang={t.lang}
        dir={t.dir}
        className={`relative bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text font-extrabold tracking-tight whitespace-nowrap text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] transition-all duration-500 text-[clamp(1.1rem,4vw,2.25rem)] ${
          shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {t.text}
      </p>
      <p
        lang={t.lang}
        dir={t.dir}
        className={`relative mt-2 text-xs leading-5 text-slate-600 transition-all delay-75 duration-500 sm:text-sm ${
          shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {t.sub}
      </p>
      <span className="sr-only">{t.label}</span>
    </>
  );
}

function HighlightCode({ code, lang }: { code: string; lang: Language }) {
  const nodes: ReactNode[] = [];
  const keywordRe = `\\b(?:${lang.keywords.join("|")})\\b`;
  const typeRe = `\\b(?:${lang.types.join("|")})\\b`;
  const constRe = `\\b(?:${lang.constants.join("|")})\\b`;
  const builtinRe = lang.builtins.length ? `\\b(?:${lang.builtins.join("|")})\\b` : "(?!)";
  const re = new RegExp(
    "(?:\"\"\"[\\s\\S]*?\"\"\"|'''[\\s\\S]*?''')" + // triple strings
      "|(\"(?:[^\"\\\\\\n]|\\\\.)*\"|'(?:[^'\\\\\\n]|\\\\.)*'|`(?:[^`\\\\\\n]|\\\\.)*`)" + // strings
      "|(\\/\\/[^\\n]*|#[^\\n]*|--[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)" + // comments
      "|(@[A-Za-z_][\\w]*(?=\\b))" + // decorators / annotations
      "|(\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b)" + // numbers
      `|(${keywordRe})` + // keywords
      `|(${typeRe})` + // types
      `|(${constRe})` + // constants
      `|(${builtinRe})` + // builtin functions
      "|([A-Za-z_$][\\w$]*(?=\\())" + // function calls
      "|(\\.\\s*[A-Za-z_$][\\w$]*)" + // property access
      "|([A-Za-z_$][\\w$]*(?=\\s*:))",
    "g"
  );

  let last = 0;
  for (const m of code.matchAll(re)) {
    const idx = m.index ?? 0;
    if (idx > last) {
      nodes.push(
        <span key={`p${last}`} className="text-[#d4d4d4]">
          {code.slice(last, idx)}
        </span>
      );
    }
    const [, s, str, comment, decorator, num, kw, type, constv, builtin, call, prop] = m;
    const key = `m${idx}`;
    if (s) nodes.push(<span key={key} className="text-[#ce9178]">{s}</span>);
    else if (str) nodes.push(<span key={key} className="text-[#ce9178]">{str}</span>);
    else if (comment) nodes.push(<span key={key} className="italic text-[#6a9955]">{comment}</span>);
    else if (decorator) nodes.push(<span key={key} className="text-[#dcdcaa]">{decorator}</span>);
    else if (num) nodes.push(<span key={key} className="text-[#b5cea8]">{num}</span>);
    else if (kw) nodes.push(<span key={key} className="text-[#569cd6]">{kw}</span>);
    else if (type) nodes.push(<span key={key} className="text-[#4ec9b0]">{type}</span>);
    else if (constv) nodes.push(<span key={key} className="text-[#569cd6]">{constv}</span>);
    else if (builtin) nodes.push(<span key={key} className="text-[#dcdcaa]">{builtin}</span>);
    else if (call) nodes.push(<span key={key} className="text-[#dcdcaa]">{call}</span>);
    else if (prop) nodes.push(<span key={key} className="text-[#9cdcfe]">{prop}</span>);
    else nodes.push(<span key={key} className="text-[#d4d4d4]">{m[0]}</span>);
    last = idx + m[0].length;
  }
  if (last < code.length) {
    nodes.push(
      <span key={`e${last}`} className="text-[#d4d4d4]">
        {code.slice(last)}
      </span>
    );
  }
  return <>{nodes}</>;
}

function Caret() {
  return (
    <span
      className="caret-blink mx-[1px] inline-block h-[1.15em] w-[0.55em] translate-y-[0.18em] rounded-[1px] bg-sky-400"
      aria-hidden="true"
    />
  );
}

export default function LanguageShowcase() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [typed, setTyped] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const lang = LANGS[index];

  const changeLang = (next: number) => {
    if (busy.current || next === index) return;
    busy.current = true;
    setVisible(false);
    setTimeout(() => {
      setIndex(next);
      setTyped([]);
      setDone(false);
      setVisible(true);
      busy.current = false;
    }, SWITCH_MS);
  };

  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => {
      if (busy.current) return;
      changeLang((index + 1) % LANGS.length);
    }, HOLD_MS);
    return () => clearTimeout(id);
  }, [done, index]);

  useEffect(() => {
    const lines = LANGS[index].lines;
    let line = 0;
    let char = 0;
    let planned = -1;
    let mistakeAt = -1;
    let mistakeDone = false;
    let timer: ReturnType<typeof setTimeout>;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    // Pick one human-like typo spot per line: a doubled letter that gets deleted.
    const planMistake = (text: string) => {
      mistakeAt = -1;
      mistakeDone = false;
      if (text.length < 10 || Math.random() > 0.3) return;
      const cands: number[] = [];
      for (let i = 2; i < text.length - 2; i++) {
        const prev = text[i - 1];
        if (/[A-Za-z]/.test(prev) && prev !== text[i] && /[A-Za-z]/.test(text[i])) cands.push(i);
      }
      if (cands.length) mistakeAt = cands[Math.floor(Math.random() * cands.length)];
    };

    const isBlockStarter = (t: string) =>
      /^(def |class |func |fn |function |public |private |suspend |data |import |use |package |for |if |while |return |export |const |let |val |var |final )/.test(t);

    const show = (text: string) => {
      setTyped(
        lines
          .slice(0, line)
          .map((l) => l.text)
          .concat([text])
      );
    };

    const tick = () => {
      if (line >= lines.length) {
        setTyped(lines.map((l) => l.text));
        setDone(true);
        return;
      }
      const current = lines[line];
      if (current.text === "") {
        line += 1;
        char = 0;
        timer = setTimeout(tick, 140);
        return;
      }
      if (char === 0 && planned !== line) {
        planned = line;
        planMistake(current.text);
      }
      // Typo beat: show a doubled letter, hesitate, delete it.
      if (!mistakeDone && mistakeAt > 0 && char === mistakeAt) {
        const wrong = current.text[mistakeAt - 1];
        show(current.text.slice(0, char) + wrong);
        mistakeDone = true;
        timer = setTimeout(() => {
          show(current.text.slice(0, char));
          timer = setTimeout(tick, 140);
        }, rand(280, 480));
        return;
      }
      // Burst typing: 1-3 chars per beat, landing exactly on the typo spot.
      const r = Math.random();
      let step = r < 0.5 ? 1 : r < 0.8 ? 2 : 3;
      if (!mistakeDone && mistakeAt > 0 && char < mistakeAt && char + step >= mistakeAt) {
        step = mistakeAt - char;
      }
      char = Math.min(char + step, current.text.length);
      show(current.text.slice(0, char));
      if (char >= current.text.length) {
        const t = current.text.trim();
        let pause = 170;
        if (/[{(:]\s*$/.test(t)) pause = 420; // opened a block — think about the body
        if (/^[}\])]/.test(t)) pause = 260;
        line += 1;
        char = 0;
        const next = (lines[line]?.text ?? "").trim();
        if (next !== "" && isBlockStarter(next)) pause += rand(250, 500); // hesitate before declarations
        timer = setTimeout(tick, pause);
      } else {
        const upcoming = current.text[char] ?? "";
        let d = current.speed * rand(0.55, 1.5);
        if (/[({[=;:]/.test(upcoming)) d += 110; // slower on symbols
        if (char - step === 0) d += rand(150, 350); // line-start rhythm
        timer = setTimeout(tick, d);
      }
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [typed, done]);

  const activeLine = done ? -1 : typed.length - 1;
  const activeLength = done ? 0 : typed[activeLine]?.length ?? 0;

  return (
    <section className="overflow-x-clip pt-7 pb-14 sm:pt-10 sm:pb-20">
      <div className="shell-container" dir="ltr">
{/* Hacker rain strip with overlay title */}
        <div className="relative">
          <HackerRain />
          <div className="absolute inset-0 z-10 flex items-center justify-between gap-6 px-6 sm:px-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,13,15,0.92)_0%,rgba(13,13,15,0.65)_45%,transparent_75%)]"
            />
            <div className="relative min-w-0 flex-1 text-left">
              <RotatingTitle />
            </div>
            <div className="relative min-w-0 flex-1 text-right">
              <h1
                lang="ar"
                dir="rtl"
                className="relative bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-4xl"
              >
                <a href={`mailto:${site.email}`}>اتصل بنا</a>
              </h1>
              <p lang="ar" dir="rtl" className="relative mt-2 text-xs leading-5 text-slate-300 sm:text-sm">
                استثمر في المواقع وتطبيقات SaaS والحلول التقنية — أصول رقمية حقيقية تنمّي أعمالك.
              </p>
            </div>
          </div>
        </div>

        {/* Hairline divider with moving glow (full-bleed, synced with navbar) */}
        <div className="relative left-1/2 mt-8 h-px w-screen -translate-x-1/2 bg-white/10 sm:mt-10" aria-hidden="true">
          <div className="animate-glow-line animate-glow-line-reverse" />
        </div>

        {/* Code */}
        <div
          className={`mt-6 transition-opacity duration-300 ease-out ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <div
            ref={containerRef}
            className="px-4 py-3 font-mono text-xs leading-6 sm:text-sm"
          >
            {typed.map((line, i) => (
              <div key={i} className="flex whitespace-pre">
                <span className="w-8 shrink-0 select-none pr-4 text-right tabular-nums text-slate-600">{i + 1}</span>
                <span className="whitespace-pre">
                  <HighlightCode code={line} lang={lang} />
                  {i === activeLine && <Caret />}
                </span>
              </div>
            ))}
            {done && (
              <div className="flex whitespace-pre">
                <span className="w-8 shrink-0 select-none pr-4 text-right tabular-nums text-slate-600">{typed.length + 1}</span>
                <span className="whitespace-pre">
                  <Caret />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Slim status bar */}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 px-4 text-[10px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <img src={lang.icon} alt="" className={`h-3 w-3 ${lang.logoClass ?? ""}`} loading="lazy" />
            <span className="text-slate-300">{lang.fileName}</span>
          </span>
          <span className="tabular-nums">
            Ln {Math.min(activeLine + 1, typed.length + 1)}, Col {Math.max(activeLength, 1)}
          </span>
          <span className="ml-auto">{lang.name}</span>
        </div>
      </div>
    </section>
  );
}