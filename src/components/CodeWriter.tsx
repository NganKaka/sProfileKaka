import { useEffect, useRef, useState } from 'react';

type Snippet = {
  language: 'tsx' | 'py' | 'go';
  filename: string;
  lines: string[]; // tokenized below by simple regex highlighter
};

const snippets: Snippet[] = [
  {
    language: 'tsx',
    filename: 'use-debounce.tsx',
    lines: [
      "import { useEffect, useState } from 'react';",
      '',
      'export function useDebounce<T>(value: T, delay = 200) {',
      '  const [debounced, setDebounced] = useState(value);',
      '  useEffect(() => {',
      '    const id = setTimeout(() => setDebounced(value), delay);',
      '    return () => clearTimeout(id);',
      '  }, [value, delay]);',
      '  return debounced;',
      '}',
    ],
  },
  {
    language: 'py',
    filename: 'pipeline.py',
    lines: [
      'from dataclasses import dataclass',
      'from typing import Iterable',
      '',
      '@dataclass',
      'class Trade:',
      '    symbol: str',
      '    qty: int',
      '    price: float',
      '',
      'def vwap(trades: Iterable[Trade]) -> float:',
      '    notional = sum(t.qty * t.price for t in trades)',
      '    volume = sum(t.qty for t in trades)',
      '    return notional / volume if volume else 0.0',
    ],
  },
  {
    language: 'go',
    filename: 'rate-limit.go',
    lines: [
      'package limiter',
      '',
      'import "time"',
      '',
      'type Bucket struct {',
      '    rate    float64',
      '    tokens  float64',
      '    updated time.Time',
      '}',
      '',
      'func (b *Bucket) Allow() bool {',
      '    now := time.Now()',
      '    b.tokens += b.rate * now.Sub(b.updated).Seconds()',
      '    b.updated = now',
      '    if b.tokens < 1 { return false }',
      '    b.tokens -= 1',
      '    return true',
      '}',
    ],
  },
];

// Light syntax highlighting via simple word lookups.
const KEYWORDS: Record<Snippet['language'], string[]> = {
  tsx: ['import', 'from', 'export', 'function', 'const', 'let', 'return', 'if', 'else'],
  py: ['from', 'import', 'class', 'def', 'return', 'if', 'else'],
  go: ['package', 'import', 'type', 'struct', 'func', 'return', 'if', 'else'],
};

function highlight(line: string, lang: Snippet['language']): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  // Match string literals first, then comments, then keywords, otherwise plain
  const regex = /(\".*?\"|'.*?')|(\/\/[^\n]*|#[^\n]*)|(\w+)|(\s+)|([^\w\s])/g;
  let m: RegExpExecArray | null;
  let key = 0;
  const kws = new Set(KEYWORDS[lang]);
  while ((m = regex.exec(line)) !== null) {
    const [, str, comment, word, ws, sym] = m;
    if (str) tokens.push(<span key={key++} className="text-amber-300/85">{str}</span>);
    else if (comment) tokens.push(<span key={key++} className="text-secondary/45 italic">{comment}</span>);
    else if (word && kws.has(word)) tokens.push(<span key={key++} className="text-fuchsia-300/90">{word}</span>);
    else if (word) tokens.push(<span key={key++} className="text-cyan-200/85">{word}</span>);
    else if (ws) tokens.push(ws);
    else if (sym) tokens.push(<span key={key++} className="text-on-surface/70">{sym}</span>);
  }
  return tokens;
}

const TYPE_INTERVAL = 18; // ms per char
const PAUSE_END = 1600; // ms hold full snippet
const PAUSE_AFTER_DELETE = 500;

export default function CodeWriter() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [text, setText] = useState('');
  const phaseRef = useRef<'typing' | 'holding' | 'deleting'>('typing');
  const charRef = useRef(0);

  const snippet = snippets[snippetIndex];
  const fullText = snippet.lines.join('\n');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (phaseRef.current === 'typing') {
        const next = charRef.current + 2; // type 2 chars per tick for speed
        if (next >= fullText.length) {
          charRef.current = fullText.length;
          setText(fullText);
          phaseRef.current = 'holding';
          timer = setTimeout(tick, PAUSE_END);
        } else {
          charRef.current = next;
          setText(fullText.slice(0, next));
          timer = setTimeout(tick, TYPE_INTERVAL);
        }
      } else if (phaseRef.current === 'holding') {
        phaseRef.current = 'deleting';
        timer = setTimeout(tick, TYPE_INTERVAL);
      } else {
        const next = Math.max(0, charRef.current - 4); // delete 4 chars per tick (faster)
        charRef.current = next;
        setText(fullText.slice(0, next));
        if (next === 0) {
          phaseRef.current = 'typing';
          timer = setTimeout(() => {
            setSnippetIndex((s) => (s + 1) % snippets.length);
          }, PAUSE_AFTER_DELETE);
        } else {
          timer = setTimeout(tick, 8);
        }
      }
    }

    tick();
    return () => clearTimeout(timer);
  }, [fullText]);

  // Render with highlighting; carry partial last line
  const linesShown = text.split('\n');

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0e14] font-tech text-[12px] leading-relaxed shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>
          <span className="text-[10px] text-white/45 ml-2 truncate">{snippet.filename}</span>
        </div>
        <span className="font-tech text-[9px] uppercase tracking-[0.18em] text-cyan-300/70 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
          assistant typing
        </span>
      </div>
      <div className="p-4 md:p-5 min-h-[260px] max-h-[260px] overflow-hidden">
        <pre className="whitespace-pre-wrap break-words">
          {linesShown.map((line, i) => (
            <div key={i}>
              <span className="text-secondary/30 select-none mr-3 inline-block w-6 text-right">{i + 1}</span>
              {highlight(line, snippet.language)}
              {i === linesShown.length - 1 && (
                <span className="inline-block w-[7px] h-[14px] -mb-[2px] ml-[1px] bg-cyan-300/80 align-middle animate-pulse" />
              )}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}