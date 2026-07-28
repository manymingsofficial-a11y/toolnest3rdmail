'use client';

import * as React from 'react';
import { Play, Pause, RotateCcw, Trash2, Plus, Check, Clock, Calendar, MapPin} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export type ProductivityToolConfig = {
  slug: string;
  label: string;
  description: string;
  isNotes: boolean;
  isTodoList: boolean;
  isPomodoro: boolean;
  isCountdown: boolean;
  isStopwatch: boolean;
  isCalendar: boolean;
  isAgeTimeline: boolean;
  isMeetingPlanner: boolean;
  isTimezoneConverter: boolean;
  isBusinessDayCalculator: boolean;
};

function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function ProductivityTool({ config }: { config: ProductivityToolConfig }) {
  // Notes
  const [notes, setNotes] = React.useState('');
  // Todo
  const [todos, setTodos] = React.useState<{ id: number; text: string; done: boolean }[]>([]);
  const [todoInput, setTodoInput] = React.useState('');
  // Pomodoro
  const [pomoMode, setPomoMode] = React.useState<'work' | 'break'>('work');
  const [pomoSeconds, setPomoSeconds] = React.useState(25 * 60);
  const [pomoRunning, setPomoRunning] = React.useState(false);
  const [pomoCycles, setPomoCycles] = React.useState(0);
  // Countdown
  const [countdownTarget, setCountdownTarget] = React.useState('');
  const [countdownDisplay, setCountdownDisplay] = React.useState('');
  // Stopwatch
  const [swSeconds, setSwSeconds] = React.useState(0);
  const [swRunning, setSwRunning] = React.useState(false);
  const [swLaps, setSwLaps] = React.useState<number[]>([]);
  // Calendar
  const [calDate, setCalDate] = React.useState(new Date());
  // Age timeline
  const [birthDate, setBirthDate] = React.useState('');
  // Meeting planner
  const [meetingDate, setMeetingDate] = React.useState('');
  const [timezones, setTimezones] = React.useState<string[]>([]);
  // Timezone converter
  const [tzTime, setTzTime] = React.useState('12:00');
  const [tzFrom, setTzFrom] = React.useState('UTC');
  const [tzTo, setTzTo] = React.useState('America/New_York');
  // Business day calc
  const [bizStart, setBizStart] = React.useState('');
  const [bizEnd, setBizEnd] = React.useState('');
  const [bizResult, setBizResult] = React.useState<number | null>(null);

  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  // Pomodoro timer
  React.useEffect(() => {
    if (pomoRunning) {
      intervalRef.current = setInterval(() => {
        setPomoSeconds((s) => {
          if (s <= 1) {
            setPomoRunning(false);
            if (pomoMode === 'work') {
              setPomoCycles((c) => c + 1);
              setPomoMode('break');
              toast.success('Work session complete! Take a break.');
              return 5 * 60;
            } else {
              setPomoMode('work');
              toast.success('Break over! Back to work.');
              return 25 * 60;
            }
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [pomoRunning, pomoMode]);

  // Countdown
  React.useEffect(() => {
    if (!countdownTarget) return;
    const target = new Date(countdownTarget).getTime();
    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setCountdownDisplay('Time reached!');
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setCountdownDisplay(`${days}d ${hours}h ${mins}m ${secs}s`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [countdownTarget]);

  // Stopwatch
  React.useEffect(() => {
    if (swRunning) {
      intervalRef.current = setInterval(() => setSwSeconds((s) => s + 10), 10);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [swRunning]);

  function formatTime(secs: number): string {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function formatSwTime(ms: number): string {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const cents = Math.floor((ms % 1000) / 10);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(cents).padStart(2, '0')}`;
  }

  function addTodo() {
    if (!todoInput.trim()) return;
    setTodos([...todos, { id: Date.now(), text: todoInput, done: false }]);
    setTodoInput('');
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  }

  function removeTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function calculateBusinessDays() {
    if (!bizStart || !bizEnd) return;
    const start = new Date(bizStart);
    const end = new Date(bizEnd);
    let count = 0;
    const cur = new Date(start);
    while (cur <= end) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) count++;
      cur.setDate(cur.getDate() + 1);
    }
    setBizResult(count);
    toast.success(`${count} business days found.`);
  }

  // Notes
  if (config.isNotes) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl glass-card p-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Your Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Start typing your notes here..." className="min-h-[300px] rounded-xl" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{notes.length} characters · {notes.split(/\s+/).filter(Boolean).length} words</span>
              <div className="flex gap-2">
                <Button onClick={() => downloadText(notes, 'notes.txt')} variant="outline" size="sm" className="rounded-xl">Download</Button>
                <Button onClick={() => { setNotes(''); toast.success('Notes cleared.'); }} variant="outline" size="sm" className="rounded-xl"><Trash2 className="mr-1.5 h-4 w-4" />Clear</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Todo List
  if (config.isTodoList) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl glass-card p-6">
          <div className="flex gap-2">
            <Input value={todoInput} onChange={(e) => setTodoInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTodo()} placeholder="Add a new task..." className="rounded-xl" />
            <Button onClick={addTodo} className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white"><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="mt-4 space-y-2">
            {todos.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">No tasks yet. Add one above!</p>}
            {todos.map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
                <button onClick={() => toggleTodo(t.id)} className={cn('grid h-6 w-6 place-items-center rounded-md border transition-all', t.done ? 'bg-green-500 border-green-500' : 'border-border/60')}>
                  {t.done && <Check className="h-4 w-4 text-white" />}
                </button>
                <span className={cn('flex-1 text-sm', t.done && 'line-through text-muted-foreground')}>{t.text}</span>
                <Button variant="ghost" size="sm" onClick={() => removeTodo(t.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
          {todos.length > 0 && (
            <div className="mt-4 text-xs text-muted-foreground">
              {todos.filter((t) => t.done).length} of {todos.length} tasks complete
            </div>
          )}
        </div>
      </div>
    );
  }

  // Pomodoro
  if (config.isPomodoro) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl glass-card p-6">
          <div className="flex flex-col items-center py-8">
            <div className={cn('text-sm font-medium uppercase tracking-wide', pomoMode === 'work' ? 'text-orange-500' : 'text-green-500')}>
              {pomoMode === 'work' ? 'Focus Time' : 'Break Time'}
            </div>
            <div className="mt-4 text-7xl font-bold tabular-nums">{formatTime(pomoSeconds)}</div>
            <div className="mt-2 text-sm text-muted-foreground">Cycles completed: {pomoCycles}</div>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => setPomoRunning(!pomoRunning)} className="rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white">
                {pomoRunning ? <><Pause className="mr-1.5 h-4 w-4" />Pause</> : <><Play className="mr-1.5 h-4 w-4" />Start</>}
              </Button>
              <Button onClick={() => { setPomoRunning(false); setPomoSeconds(pomoMode === 'work' ? 25 * 60 : 5 * 60); }} variant="outline" className="rounded-xl">
                <RotateCcw className="mr-1.5 h-4 w-4" />Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Countdown
  if (config.isCountdown) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl glass-card p-6">
          <div className="space-y-4">
            <div><Label className="text-sm font-medium">Target Date & Time</Label><Input type="datetime-local" value={countdownTarget} onChange={(e) => setCountdownTarget(e.target.value)} className="mt-2 rounded-xl" /></div>
            {countdownDisplay && (
              <div className="flex flex-col items-center py-8">
                <Clock className="h-12 w-12 text-amber-500" />
                <div className="mt-4 text-4xl font-bold tabular-nums">{countdownDisplay}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Stopwatch
  if (config.isStopwatch) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl glass-card p-6">
          <div className="flex flex-col items-center py-8">
            <div className="text-7xl font-bold tabular-nums">{formatSwTime(swSeconds)}</div>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => setSwRunning(!swRunning)} className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white">
                {swRunning ? <><Pause className="mr-1.5 h-4 w-4" />Pause</> : <><Play className="mr-1.5 h-4 w-4" />Start</>}
              </Button>
              <Button onClick={() => setSwLaps([...swLaps, swSeconds])} variant="outline" className="rounded-xl">Lap</Button>
              <Button onClick={() => { setSwRunning(false); setSwSeconds(0); setSwLaps([]); }} variant="outline" className="rounded-xl"><RotateCcw className="mr-1.5 h-4 w-4" />Reset</Button>
            </div>
            {swLaps.length > 0 && (
              <div className="mt-6 w-full space-y-1">
                {swLaps.map((lap, i) => (
                  <div key={i} className="flex justify-between rounded-lg bg-muted/30 px-4 py-2 text-sm">
                    <span>Lap {i + 1}</span><span className="tabular-nums">{formatSwTime(lap)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Calendar
  if (config.isCalendar) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const year = calDate.getFullYear();
    const month = calDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl glass-card p-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setCalDate(new Date(year, month - 1, 1))}>Previous</Button>
            <h3 className="text-lg font-semibold">{monthNames[month]} {year}</h3>
            <Button variant="outline" size="sm" onClick={() => setCalDate(new Date(year, month + 1, 1))}>Next</Button>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1">
            {days.map((d) => <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>)}
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              return (
                <div key={day} className={cn('grid h-12 place-items-center rounded-lg text-sm transition-colors', isToday ? 'bg-gradient-to-br from-amber-400 to-orange-600 text-white font-bold' : 'hover:bg-muted/50')}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Age Timeline
  if (config.isAgeTimeline) {
    const weeksLived = birthDate ? Math.floor((Date.now() - new Date(birthDate).getTime()) / (7 * 86400000)) : 0;
    const totalWeeks = 90 * 52;
    const yearsLived = birthDate ? Math.floor(weeksLived / 52) : 0;

    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl glass-card p-6">
          <div className="space-y-4">
            <div><Label className="text-sm font-medium">Your Birth Date</Label><Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mt-2 rounded-xl" /></div>
            {birthDate && (
              <div>
                <p className="text-sm text-muted-foreground">You have lived <span className="font-bold text-foreground">{weeksLived.toLocaleString()}</span> weeks ({yearsLived} years). Each dot represents one week.</p>
                <div className="mt-4 grid grid-cols-52 gap-0.5" style={{ gridTemplateColumns: 'repeat(52, 1fr)' }}>
                  {Array.from({ length: totalWeeks }).map((_, i) => (
                    <div key={i} className={cn('aspect-square rounded-sm', i < weeksLived ? 'bg-orange-400' : 'bg-muted/40')} style={{ width: '8px', height: '8px' }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Meeting Planner
  if (config.isMeetingPlanner) {
    const commonTimezones = ['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney'];
    const baseTime = meetingDate ? new Date(meetingDate) : new Date();

    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl glass-card p-6">
          <div className="space-y-4">
            <div><Label className="text-sm font-medium">Meeting Date & Time (your local time)</Label><Input type="datetime-local" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} className="mt-2 rounded-xl" /></div>
            <div className="space-y-2">
              {commonTimezones.map((tz) => {
                const time = new Intl.DateTimeFormat('en-US', { timeZone: tz, dateStyle: 'medium', timeStyle: 'short' }).format(baseTime);
                return (
                  <div key={tz} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">{tz}</span></div>
                    <span className="text-sm tabular-nums">{time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Timezone Converter
  if (config.isTimezoneConverter) {
    const commonTimezones = ['UTC', 'America/New_York', 'America/Los_Angeles', 'America/Chicago', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Australia/Sydney', 'Pacific/Auckland'];

    const convert = (): string => {
      try {
        const [h, m] = tzTime.split(':').map(Number);
        const date = new Date();
        date.setUTCHours(h, m, 0, 0);
        const fromOffset = new Intl.DateTimeFormat('en-US', { timeZone: tzFrom, timeZoneName: 'shortOffset' }).formatToParts(date).find((p) => p.type === 'timeZoneName')?.value || '';
        const toTime = new Intl.DateTimeFormat('en-US', { timeZone: tzTo, hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
        return `${tzTime} ${tzFrom} = ${toTime} ${tzTo}`;
      } catch {
        return 'Invalid input';
      }
    };

    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl glass-card p-6">
          <div className="space-y-4">
            <div><Label className="text-sm font-medium">Time</Label><Input type="time" value={tzTime} onChange={(e) => setTzTime(e.target.value)} className="mt-2 rounded-xl" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-sm font-medium">From Timezone</Label>
                <select value={tzFrom} onChange={(e) => setTzFrom(e.target.value)} className="mt-2 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm">
                  {commonTimezones.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
                </select>
              </div>
              <div><Label className="text-sm font-medium">To Timezone</Label>
                <select value={tzTo} onChange={(e) => setTzTo(e.target.value)} className="mt-2 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm">
                  {commonTimezones.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
                </select>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-center text-lg font-semibold">{convert()}</div>
          </div>
        </div>
      </div>
    );
  }

  // Business Day Calculator
  if (config.isBusinessDayCalculator) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl glass-card p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-sm font-medium">Start Date</Label><Input type="date" value={bizStart} onChange={(e) => setBizStart(e.target.value)} className="mt-2 rounded-xl" /></div>
              <div><Label className="text-sm font-medium">End Date</Label><Input type="date" value={bizEnd} onChange={(e) => setBizEnd(e.target.value)} className="mt-2 rounded-xl" /></div>
            </div>
            <Button onClick={calculateBusinessDays} className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white">Calculate</Button>
            {bizResult !== null && (
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-center">
                <div className="text-3xl font-bold">{bizResult}</div>
                <div className="text-sm text-muted-foreground">business days (excluding weekends)</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
