'use client';

import * as React from 'react';

export type QrHistoryItem = {
  id: string;
  createdAt: number;
  kind: 'generated' | 'scanned';
  type: string;
  data: string;
  preview: string;
  size: number;
};

export type QrHistoryInput = Omit<QrHistoryItem, 'id' | 'createdAt'>;

const STORAGE_KEY = 'toolnest:qr-history';
const MAX_ITEMS = 100;

function load(): QrHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as QrHistoryItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function persist(items: QrHistoryItem[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
  }
}

export function useQrHistory() {
  const [items, setItems] = React.useState<QrHistoryItem[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setItems(load());
    setLoaded(true);
  }, []);

  const add = React.useCallback((input: QrHistoryInput) => {
    setItems((prev) => {
      const item: QrHistoryItem = {
        ...input,
        id:
          typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        createdAt: Date.now(),
      };
      const next = [item, ...prev].slice(0, MAX_ITEMS);
      persist(next);
      return next;
    });
  }, []);

  const remove = React.useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      persist(next);
      return next;
    });
  }, []);

  const clearAll = React.useCallback(() => {
    setItems(() => {
      persist([]);
      return [];
    });
  }, []);

  return { items, loaded, add, remove, clearAll };
}
