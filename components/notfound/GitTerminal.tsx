// components/notfound/GitTerminal.tsx
// CLIENT-ONLY. Loaded via next/dynamic({ ssr: false }) from pages/404.tsx, so this
// chunk only downloads when a real 404 is hit and never enters the homepage bundle.
//
// A faux git terminal: it boots, auto-types `git checkout <the-path-you-wanted>`,
// answers with `fatal: pathspec ... did not match`, prints an ASCII "404" + a broken
// commit graph, then drops you at a live, interactive prompt (help / ls / git status /
// git log / history with ↑↓ / Tab-complete). The same command handler powers the
// `cd ~` / `help` recovery chips, so typing and clicking share one path; the Marketplace
// chip is a plain external link.
//
// Zero new dependencies: pure React + DOM + setTimeout. Reuses framer-motion's
// useReducedMotion (already bundled), Zed Mono (font-mono) and .cursor-blink.
import { Fragment, KeyboardEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { MARKETPLACE_URL } from '@/lib/seo';

const HOME_PATH = '/';

// ---- colored line fragments ---------------------------------------------------
const A = ({ children }: { children: ReactNode }) => <span className="text-brand">{children}</span>;
const D = ({ children }: { children: ReactNode }) => <span className="text-gray-500">{children}</span>;
const G = ({ children }: { children: ReactNode }) => <span className="text-green-400">{children}</span>;
const R = ({ children }: { children: ReactNode }) => <span className="text-red-400">{children}</span>;
const B = ({ children }: { children: ReactNode }) => <span className="text-sky-400">{children}</span>;
const W = ({ children }: { children: ReactNode }) => <span className="text-gray-100">{children}</span>;

const Prompt = () => (
  <>
    <span className="font-semibold text-green-400">you</span>
    <D>@</D>
    <B>aicommit</B>
    <D>:</D>
    <A>~</A>
    <D>$ </D>
  </>
);

type Line = { id: number; node: ReactNode };
let _id = 0;
const mk = (node: ReactNode): Line => ({ id: _id++, node });

// Trim absurd 404 paths so a long pasted URL can't blow out the layout.
// Rendered only as a text node (never HTML), so this is XSS-safe; we just guard length.
function sanitizePath(raw: string): string {
  let p = raw && raw !== '/' ? raw : '/the-page-you-wanted';
  try {
    p = decodeURIComponent(p);
  } catch {
    /* keep raw if it isn't valid percent-encoding */
  }
  if (p.length > 40) p = p.slice(0, 37) + '…';
  return p;
}

// ---- boot script (a function of the bad path, so the joke is personalized) -----
type Step = { kind: 'type'; cmd: string } | { kind: 'print'; node: ReactNode; delay: number };

const ART = [
  '█  █   ████   █  █',
  '█  █   █  █   █  █',
  '████   █  █   ████   commit not found',
  '   █   █  █      █',
  '   █   ████      █',
];

function bootScript(path: string): Step[] {
  return [
    { kind: 'print', node: <D>AICommit recovery shell · git 2.404.0 · <A>HTTP 404</A></D>, delay: 60 },
    { kind: 'print', node: <D>— the commit you wanted is not in this tree —</D>, delay: 80 },
    { kind: 'print', node: <>&nbsp;</>, delay: 40 },
    { kind: 'type', cmd: `git checkout ${path}` },
    { kind: 'print', node: <><R>fatal:</R> pathspec <A>{`'${path}'`}</A> did not match any file(s) known to git</>, delay: 120 },
    { kind: 'print', node: <D>hint: the commit you were looking for was never staged, committed, or pushed.</D>, delay: 90 },
    { kind: 'print', node: <>&nbsp;</>, delay: 50 },
    ...ART.map((row): Step => ({ kind: 'print', node: <span className="text-brand [text-shadow:0_0_24px_rgba(222,209,79,0.25)]">{row}</span>, delay: 30 })),
    { kind: 'print', node: <>&nbsp;</>, delay: 40 },
    ...gitLogLines().map((node): Step => ({ kind: 'print', node, delay: 70 })),
    { kind: 'print', node: <>&nbsp;</>, delay: 40 },
    { kind: 'print', node: <D>Recover with one of these — click, or type it yourself:</D>, delay: 80 },
    { kind: 'print', node: <RecoveryChips />, delay: 60 },
    { kind: 'print', node: <>&nbsp;</>, delay: 20 },
  ];
}

function gitLogLines(): ReactNode[] {
  return [
    <Fragment key="g0"><D>$ </D><W>git log --oneline --graph --all</W></Fragment>,
    <Fragment key="g1"><D>* </D><A>a1c0de7</A> <D>(</D><B>HEAD -&gt; main</B><D>)</D> chore: serve a page that exists</Fragment>,
    <Fragment key="g2"><D>* </D><A>5e3f0ed</A> feat: 200 OK everywhere it matters</Fragment>,
    <Fragment key="g3"><D>| </D></Fragment>,
    <Fragment key="g4"><R>x </R><span className="text-gray-500 line-through opacity-70"><A>404f00d</A> the-page-you-wanted</span> <R>&lt;-- not found</R></Fragment>,
    <Fragment key="g5"><D>* </D><A>0000000</A> initial commit <D>(the void)</D></Fragment>,
    <Fragment key="g6">&nbsp;</Fragment>,
    <Fragment key="g7"><D>Reflog: that commit isn&apos;t in any branch, tag, or stash. It probably never was.</D></Fragment>,
  ];
}

// RecoveryChips is rendered inline in the scrollback; clicks route through the shared runner.
let chipRun: ((cmd: string) => void) | null = null;
function RecoveryChips() {
  const chip = 'inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[13px] transition hover:-translate-y-px';
  return (
    <div className="my-2 flex flex-wrap gap-2.5">
      <button type="button" className={`${chip} border-brand/40 bg-brand/8 text-gray-100 hover:border-brand hover:bg-brand/16`} onClick={() => chipRun?.('cd ~')}>
        <A>cd ~</A><D>→</D><D>go home</D>
      </button>
      <a href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer" className={`${chip} border-brand/40 bg-brand/8 text-gray-100 hover:border-brand hover:bg-brand/16`}>
        <A>git remote -v</A><D>→</D><D>open Marketplace</D>
      </a>
      <button type="button" className={`${chip} border-white/15 bg-white/3 text-gray-100 hover:border-white/30 hover:bg-white/6`} onClick={() => chipRun?.('help')}>
        <A>help</A><D>→</D><D>what can I type?</D>
      </button>
    </div>
  );
}

const TAB_OPTIONS = ['help', 'ls', 'whoami', 'clear', 'git log', 'git status', 'git remote -v', 'cd ~'];

export default function GitTerminal() {
  const shouldReduceMotion = useReducedMotion();
  const [history, setHistory] = useState<Line[]>([]);
  const [typed, setTyped] = useState('');
  const [booted, setBooted] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const gen = useRef(0); // invalidates in-flight timers across unmount / StrictMode re-run
  const cmdHist = useRef<string[]>([]);
  const histIdx = useRef(-1);

  const push = useCallback((...nodes: ReactNode[]) => setHistory((h) => [...h, ...nodes.map(mk)]), []);

  // ---- command table — shared by typed input AND the recovery chips -----------
  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      push(
        <>
          <Prompt />
          <W>{cmd}</W>
        </>,
      );
      if (cmd === '') return;
      const lower = cmd.toLowerCase();
      const parts = cmd.split(/\s+/);

      if (lower === 'cd ~' || lower === 'cd' || lower === 'cd /' || lower === 'cd home') {
        push(<><G>Heading home…</G> <D>resolving {HOME_PATH}</D></>);
        window.setTimeout(() => { window.location.href = HOME_PATH; }, 600);
        return;
      }
      if (lower === 'git remote -v' || lower === 'git remote' || lower === 'remote') {
        push(
          <><A>origin</A>  {MARKETPLACE_URL} <D>(fetch)</D></>,
          <><A>origin</A>  {MARKETPLACE_URL} <D>(push)</D></>,
          <D>Opening JetBrains Marketplace…</D>,
        );
        // Open synchronously, inside the keydown/click gesture, or popup blockers eat it.
        window.open(MARKETPLACE_URL, '_blank', 'noopener,noreferrer');
        return;
      }

      switch (lower) {
        case 'help':
        case '?':
        case '--help':
          push(
            <><span className="font-bold text-brand">AICommit recovery shell</span> <D>— available commands:</D></>,
            <>  <A>cd ~</A>{'           '}<D>return to the homepage (this one exists)</D></>,
            <>  <A>git remote -v</A>{'  '}<D>open the JetBrains Marketplace listing</D></>,
            <>  <A>git log</A>{'        '}<D>show the commit graph (and the missing one)</D></>,
            <>  <A>git status</A>{'     '}<D>where are we, exactly?</D></>,
            <>  <A>ls</A>{'             '}<D>list what is actually here</D></>,
            <>  <A>whoami</A>{'         '}<D>existential lookup</D></>,
            <>  <A>clear</A>{'          '}<D>wipe the screen</D></>,
            <D>Tip: ↑/↓ for history, Tab to complete. Everything you type is fake. The plugin is real.</D>,
            <>&nbsp;</>,
          );
          return;
        case 'ls':
        case 'ls -a':
        case 'ls -la':
        case 'dir':
          push(
            <><B>README.md</B>   <B>LICENSE</B>   <A>aicommit/</A>   <A>.git/</A>   <D>good-vibes.txt</D></>,
            <D># note: &apos;404&apos;, &apos;the-page-you-wanted&apos; and &apos;lost-hopes&apos; are not tracked.</D>,
            <>&nbsp;</>,
          );
          return;
        case 'whoami':
          push(
            <><G>you</G> <D>— a developer who deserves better commit messages.</D></>,
            <D>uid=200(ok) gid=404(lost) groups=jetbrains,git,staged</D>,
            <>&nbsp;</>,
          );
          return;
        case 'pwd':
          push(<><A>/var/www/aicommit/the-page-you-wanted</A> <R>(does not exist)</R></>, <>&nbsp;</>);
          return;
        case 'git status':
        case 'status':
          push(
            <>On branch <B>main</B></>,
            <>Your branch is <R>404 commits behind</R> a working URL.</>,
            <>&nbsp;</>,
            <span className="font-bold">Untracked files:</span>,
            <>  <D>(use &quot;cd ~&quot; to go somewhere that exists)</D></>,
            <>{'        '}<R>the-page-you-wanted</R></>,
            <>&nbsp;</>,
            <>nothing added to commit but a 404 present <D>(use &quot;git remote -v&quot; to recover)</D></>,
            <>&nbsp;</>,
          );
          return;
        case 'git log':
        case 'git log --oneline':
        case 'log':
          push(...gitLogLines(), <>&nbsp;</>);
          return;
        case 'git commit':
        case 'commit':
          push(
            <><R>error:</R> nothing to commit on a page that doesn&apos;t exist.</>,
            <D>hint: in your IDE, AICommit writes this message for you from the staged diff.</D>,
            <>&nbsp;</>,
          );
          return;
        case 'clear':
        case 'cls':
          setHistory([]);
          return;
        case 'sudo':
        case 'sudo su':
        case 'sudo rm -rf /':
          push(<><R>you</R> is not in the sudoers file. <D>This incident will be committed.</D></>, <>&nbsp;</>);
          return;
        case 'rm -rf /':
        case 'rm -rf':
        case 'rm -rf *':
          push(<><G>Nice try.</G> <D>We don&apos;t delete the universe on a 404 page.</D></>, <>&nbsp;</>);
          return;
        case 'exit':
        case 'quit':
        case ':q':
          push(<D>There is no escape from a 404 — but there is a homepage. Type <A>cd ~</A> to leave.</D>, <>&nbsp;</>);
          return;
      }

      if (parts[0] === 'git' && (parts[1] === 'checkout' || parts[1] === 'switch')) {
        const target = parts.slice(2).join(' ') || '404';
        push(
          <><R>fatal:</R> pathspec <A>{`'${target}'`}</A> did not match any file(s) known to git</>,
          <D>hint: try a branch that exists — <A>cd ~</A></D>,
          <>&nbsp;</>,
        );
        return;
      }
      if (parts[0] === 'git') {
        push(<><R>fatal:</R> not a valid object name on this 404. <D>try </D><A>git remote -v</A></>, <>&nbsp;</>);
        return;
      }

      push(
        <><R>command not found:</R> {parts[0]}</>,
        <D>type <A>help</A> for things that work here.</D>,
        <>&nbsp;</>,
      );
    },
    [push],
  );

  // Expose the runner to the inline chips (rendered inside the scrollback).
  useEffect(() => {
    chipRun = run;
    return () => { if (chipRun === run) chipRun = null; };
  }, [run]);

  // ---- boot animation: type the command, reveal the rest line-by-line ---------
  useEffect(() => {
    const path = sanitizePath(window.location.pathname);
    const steps = bootScript(path);
    const myGen = ++gen.current;
    const cancelled = () => gen.current !== myGen;

    if (shouldReduceMotion) {
      const final: Line[] = [];
      for (const s of steps) {
        if (s.kind === 'type') final.push(mk(<><Prompt /><W>{s.cmd}</W></>));
        else final.push(mk(s.node));
      }
      setHistory(final);
      setBooted(true);
      return () => { gen.current++; };
    }

    let si = 0;
    const Caret = () => <span className="ml-px inline-block h-[1.05em] w-[0.5em] translate-y-[2px] bg-brand shadow-[0_0_8px_rgba(222,209,79,0.6)]" />;

    const typeCmd = (cmd: string, done: () => void) => {
      const id = _id++;
      const render = (n: number, caret: boolean) =>
        ({ id, node: (<><Prompt /><W>{cmd.slice(0, n)}</W>{caret && <Caret />}</>) });
      setHistory((h) => [...h, render(0, true)]);
      let i = 0;
      const step = () => {
        if (cancelled()) return;
        i++;
        setHistory((h) => h.map((l) => (l.id === id ? render(i, true) : l)));
        if (i >= cmd.length) {
          window.setTimeout(() => {
            if (cancelled()) return;
            setHistory((h) => h.map((l) => (l.id === id ? render(cmd.length, false) : l)));
            done();
          }, 260);
          return;
        }
        const last = cmd[i - 1] || '';
        let d = 34 + Math.random() * 46;
        if (last === ' ') d += 50;
        if ('/-'.includes(last)) d += 20;
        window.setTimeout(step, d);
      };
      window.setTimeout(step, 60);
    };

    const next = () => {
      if (cancelled()) return;
      if (si >= steps.length) { setBooted(true); return; }
      const s = steps[si++];
      if (s.kind === 'type') {
        typeCmd(s.cmd, () => window.setTimeout(next, 220));
      } else {
        setHistory((h) => [...h, mk(s.node)]);
        window.setTimeout(next, s.delay);
      }
    };
    window.setTimeout(next, 300);

    // gen.current is a generation counter (not a DOM ref); bumping it in cleanup is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => { gen.current++; };
  }, [shouldReduceMotion]);

  // Keep the newest line in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, typed, booted]);

  // Focus the hidden input when the prompt appears — only on fine pointers, so we
  // never pop the soft keyboard or scroll-jump on touch devices.
  useEffect(() => {
    if (!booted || typeof window === 'undefined' || !window.matchMedia) return;
    if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus({ preventScroll: true });
  }, [booted]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = typed;
      const t = cmd.trim();
      if (t) { cmdHist.current.push(t); }
      histIdx.current = -1;
      setTyped('');
      run(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const h = cmdHist.current;
      if (!h.length) return;
      histIdx.current = histIdx.current === -1 ? h.length - 1 : Math.max(0, histIdx.current - 1);
      setTyped(h[histIdx.current]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const h = cmdHist.current;
      if (histIdx.current === -1) return;
      histIdx.current += 1;
      if (histIdx.current >= h.length) { histIdx.current = -1; setTyped(''); } else setTyped(h[histIdx.current]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const m = TAB_OPTIONS.find((o) => o.startsWith(typed) && o !== typed);
      if (m) setTyped(m);
    }
  };

  return (
    <div
      className="mx-auto flex h-[min(600px,72vh)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0e1016]/90 shadow-2xl backdrop-blur-xs"
      onMouseDown={(e) => { if (!(e.target as HTMLElement).closest('a,button')) inputRef.current?.focus({ preventScroll: true }); }}
    >
      {/* Title bar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-500/80" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" aria-hidden="true" />
        <span className="ml-2 select-none truncate font-mono text-xs text-gray-500">
          <span className="text-gray-300">aicommit</span> — git · <span className="text-brand">~/the-page-you-wanted</span>
        </span>
        <span className="ml-auto select-none rounded-full bg-brand px-2 py-0.5 font-sans text-[10.5px] font-bold tracking-wider text-[#0e1016]">
          404
        </span>
      </div>

      {/* Scrollback */}
      <div ref={scrollRef} aria-live="polite" className="flex-1 overflow-y-auto px-4 py-4 font-mono text-[13.5px] leading-relaxed">
        {history.map((l) => (
          <div key={l.id} className="whitespace-pre-wrap wrap-break-word">
            {l.node}
          </div>
        ))}

        {/* Live prompt — only after the boot script finishes */}
        {booted && (
          <div className="relative flex items-center">
            <Prompt />
            <span className="whitespace-pre-wrap break-all text-gray-100">{typed}</span>
            <span
              aria-hidden="true"
              className={`ml-px inline-block h-[1.05em] w-[0.5em] translate-y-[2px] bg-brand shadow-[0_0_8px_rgba(222,209,79,0.6)] ${shouldReduceMotion ? '' : 'cursor-blink'}`}
            />
            <input
              ref={inputRef}
              aria-label="terminal input — type a command and press Enter"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              className="absolute left-0 top-0 h-full w-full cursor-text opacity-0"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>
        )}
      </div>
    </div>
  );
}
