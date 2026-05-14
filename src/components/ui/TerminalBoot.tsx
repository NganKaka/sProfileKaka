import { useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '../../data/profile';

type TerminalRow = {
  prompt: string;
  output: string;
};

type RenderRow = {
  prompt: string;
  output: string;
  isPromptDone: boolean;
  isOutputDone: boolean;
};

const PROMPT_SPEED = 475;
const OUTPUT_SPEED = 350;
const PROMPT_TO_OUTPUT_PAUSE = 1400;
const PAUSE_BETWEEN = 3500;

function createRows(): TerminalRow[] {
  return [
    { prompt: '$ whoami', output: profile.name },
    { prompt: '$ cat role.txt', output: profile.title },
    { prompt: '$ cat location.txt', output: profile.location },
    { prompt: '$ cat stack.txt', output: 'Python · React · TypeScript · PostgreSQL · Docker' },
  ];
}

export default function TerminalBoot() {
  const rows = useMemo(createRows, []);
  const [displayed, setDisplayed] = useState<RenderRow[]>(
    rows.map(() => ({ prompt: '', output: '', isPromptDone: false, isOutputDone: false })),
  );
  const [done, setDone] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const indexRef = useRef(0);
  const phaseRef = useRef<'prompt' | 'output'>('prompt');

  const skipAnimation = () => {
    setDisplayed(rows.map((row) => ({ ...row, isPromptDone: true, isOutputDone: true })));
    setDone(true);
    setSkipped(true);
  };

  useEffect(() => {
    if (done) return;

    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const i = indexRef.current;
      if (i >= rows.length) {
        setDone(true);
        return;
      }

      const row = rows[i];

      if (phaseRef.current === 'prompt') {
        setDisplayed((prev) => {
          const next = [...prev];
          const cur = next[i];

          if (cur.prompt.length >= row.prompt.length) {
            next[i] = { ...cur, isPromptDone: true };
            phaseRef.current = 'output';
            timer = setTimeout(tick, PROMPT_TO_OUTPUT_PAUSE);
            return next;
          }

          next[i] = { ...cur, prompt: row.prompt.substring(0, cur.prompt.length + 1) };
          timer = setTimeout(tick, PROMPT_SPEED);
          return next;
        });
        return;
      }

      setDisplayed((prev) => {
        const next = [...prev];
        const cur = next[i];

        if (cur.output.length >= row.output.length) {
          next[i] = { ...cur, isOutputDone: true };
          if (i + 1 < rows.length) {
            indexRef.current = i + 1;
            phaseRef.current = 'prompt';
            timer = setTimeout(tick, PAUSE_BETWEEN);
          } else {
            setDone(true);
          }
          return next;
        }

        next[i] = { ...cur, output: row.output.substring(0, cur.output.length + 1) };
        timer = setTimeout(tick, OUTPUT_SPEED);
        return next;
      });
    }

    tick();

    return () => clearTimeout(timer);
  }, [done, rows]);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0e14] font-tech text-sm shadow-xl">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>
          <span className="text-[10px] text-white/40 ml-2">terminal — portfolio.exe</span>
        </div>

        {!done && (
          <button
            type="button"
            onClick={skipAnimation}
            className="rounded-md border border-cyan-300/30 bg-cyan-950/25 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-cyan-100/85 hover:border-cyan-300/55 hover:text-cyan-100 transition-colors"
          >
            Skip
          </button>
        )}
      </div>

      <div className="p-4 md:p-5 space-y-1.5 min-h-[240px]" aria-label="Terminal boot sequence">
        {displayed.map((row, i) => (
          <div key={i} className="flex flex-wrap gap-x-2 leading-relaxed">
            <span className="text-cyan-400 shrink-0">{row.prompt || ' '}</span>
            {row.isPromptDone && (
              <span className="text-green-400 transition-opacity duration-150">
                {row.output}
                {!row.isOutputDone && <span className="animate-pulse ml-0.5">▊</span>}
              </span>
            )}
            {!row.isPromptDone && <span className="animate-pulse text-cyan-400">▊</span>}
          </div>
        ))}

        {done && (
          <div className="flex flex-wrap gap-x-2 leading-relaxed">
            <span className="text-cyan-400 shrink-0">$</span>
            <span className="text-cyan-300">{skipped ? 'Animation skipped.' : 'Ready.'}</span>
            <span className="animate-pulse text-cyan-400 ml-1">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}
