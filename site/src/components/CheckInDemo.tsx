"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { demo } from "@/lib/content";
import { ease, useStill } from "@/lib/motion";
import { TypingDots } from "@/components/bits";

// The hero's working check-in: a payday text conversation floating on the
// hero. It plays itself, and the visitor can take over at any question by
// tapping 1 or 2.

const Q = demo.questions;
// older messages fade as they climb. This is per bubble, not a mask on the list:
// a mask would switch off the blur behind the bubbles.
const FADE = [1, 1, 1, 1, 0.75, 0.4, 0.12];

type Msg = { id: number; from: "bot" | "me"; text: string };

export default function CheckInDemo({ square = false, compact = false }: { square?: boolean; compact?: boolean }) {
  const still = useStill();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { once: true, margin: "-60px" });

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState<"bot" | "me" | null>(null);
  const [ask, setAsk] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [run, setRun] = useState(0);

  const timers = useRef<number[]>([]);
  const auto = useRef<number | undefined>(undefined);
  const asking = useRef<number | null>(null);
  const ids = useRef(0);
  const hands = useRef(false); // true once the visitor has answered for Maria

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const say = (from: Msg["from"], text: string) => setMsgs((m) => [...m, { id: ++ids.current, from, text }]);

  const question = (i: number) => {
    setTyping("bot");
    later(() => {
      setTyping(null);
      say("bot", Q[i].text);
      asking.current = i;
      setAsk(i);
      // leave more room once a person is driving
      auto.current = window.setTimeout(() => answer(i, Q[i].auto), hands.current ? 12000 : 2600);
    }, 950);
  };

  const after = (i: number) => {
    if (i < Q.length - 1) return question(i + 1);
    setTyping("bot");
    later(() => {
      setTyping(null);
      say("bot", demo.outro);
      setDone(true);
    }, 950);
  };

  const answer = (i: number, v: number) => {
    if (asking.current !== i) return;
    asking.current = null;
    window.clearTimeout(auto.current);
    setAsk(null);
    say("me", String(v));
    if (v !== Q[i].flagOn) return later(() => after(i), 650);
    later(() => setTyping("bot"), 450);
    later(() => {
      say("bot", Q[i].followUp);
      setTyping("me");
    }, 1400);
    later(() => {
      setTyping(null);
      say("me", Q[i].detail);
    }, 3000);
    later(() => after(i), 3900);
  };

  // start (and restart) the conversation
  useEffect(() => {
    if (!inView) return;
    if (still) {
      // no motion: show the finished loop
      setMsgs([
        { id: 1, from: "bot", text: demo.intro },
        { id: 2, from: "bot", text: Q[0].text },
        { id: 3, from: "me", text: "2" },
        { id: 4, from: "bot", text: Q[0].followUp },
        { id: 5, from: "me", text: Q[0].detail },
      ]);
      setDone(true);
      return;
    }
    setMsgs([]);
    setDone(false);
    setAsk(null);
    asking.current = null;
    hands.current = false;
    later(() => setTyping("bot"), 400);
    later(() => {
      setTyping(null);
      say("bot", demo.intro);
    }, 1400);
    later(() => question(0), 1900);
    const pending = timers.current;
    return () => {
      pending.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(auto.current);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, still, run]);

  // hold on the finished conversation for a moment, then start over
  useEffect(() => {
    if (!done || still) return;
    const t = window.setTimeout(() => setRun((r) => r + 1), hands.current ? 12000 : 7000);
    return () => window.clearTimeout(t);
  }, [done, still]);

  const tap = (v: number) => {
    if (ask === null) return;
    hands.current = true;
    answer(ask, v);
  };

  return (
    <div ref={root} className={`flex w-full ${compact ? "justify-end" : "justify-center"}`}>
      <div className="relative w-[17.5rem]">
        {/* no phone around it: the messages float on the hero and fade out at the top */}
        <div className={`flex flex-col ${compact ? "h-[27rem]" : "h-[33rem]"}`}>
          <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden pb-4" aria-live="polite">
            <AnimatePresence initial={false}>
              {msgs.map((m, k) => (
                <motion.p
                  key={`${run}-${m.id}`}
                  layout
                  initial={{ opacity: 0, y: 14, scale: 0.92 }}
                  animate={{ opacity: FADE[msgs.length - 1 - k] ?? 0, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease }}
                  className={`max-w-[86%] rounded-[1.15rem] px-3.5 py-2.5 text-[0.88rem] font-medium leading-[1.36] ${m.from === "me" ? "self-end rounded-br-md bg-blue text-white" : "self-start rounded-bl-md bg-paper/[0.13] text-paper backdrop-blur-xl"}`}
                  style={{ originX: m.from === "me" ? 1 : 0, originY: 1 }}
                >
                  {m.text}
                </motion.p>
              ))}
              {typing && (
                <motion.span
                  key="typing"
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className={`rounded-[1.15rem] px-3.5 py-3 ${typing === "me" ? "self-end bg-blue text-white" : "self-start bg-paper/[0.13] text-paper/70 backdrop-blur-xl"}`}
                >
                  <TypingDots />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2].map((v) => (
              <button
                key={v}
                type="button"
                disabled={ask === null}
                onClick={() => tap(v)}
                className={`flex h-11 items-center justify-center gap-2 ${square ? "rounded-lg" : "rounded-full"} bg-paper text-[0.86rem] font-medium text-ink transition-[opacity,transform,background-color,color] hover:bg-blue hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-25`}
              >
                <span className="num grid h-5 w-5 place-items-center rounded-full bg-ink/10 text-[0.72rem]">{v}</span>
                {v === 1 ? demo.yes : demo.no}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
