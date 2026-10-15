import { useState, useEffect, useCallback } from 'react';

export interface SavedVocabularyItem {
  id: string;
  word: string;
  definition: string;
  vietnameseMeaning?: string;
  contextSentence?: string;
  unitNumber: number;
  unitTitle: string;
  savedAt: string;
}

const STORAGE_KEY = 'rc_smart_notebook';

export function useSmartNotebook() {
  const [savedWords, setSavedWords] = useState<SavedVocabularyItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load saved vocabulary from localStorage', e);
      return [];
    }
  });

  // Listen for storage changes across windows/tabs or inside same tab
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setSavedWords(JSON.parse(e.newValue));
        } catch (err) {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const saveWord = useCallback((item: Omit<SavedVocabularyItem, 'id' | 'savedAt'>) => {
    setSavedWords((prev) => {
      const cleanWord = item.word.trim().toLowerCase();
      // Check if already exists in same unit
      const existingIdx = prev.findIndex(
        (w) => w.word.trim().toLowerCase() === cleanWord && w.unitNumber === item.unitNumber
      );

      let updated: SavedVocabularyItem[];
      if (existingIdx !== -1) {
        // Update existing item
        updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          ...item,
          savedAt: new Date().toISOString(),
        };
      } else {
        const newItem: SavedVocabularyItem = {
          ...item,
          id: `vocab_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          savedAt: new Date().toISOString(),
        };
        updated = [newItem, ...prev];
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save word to localStorage', e);
      }
      return updated;
    });
  }, []);

  const removeWord = useCallback((wordOrId: string) => {
    setSavedWords((prev) => {
      const clean = wordOrId.trim().toLowerCase();
      const updated = prev.filter(
        (item) => item.id !== wordOrId && item.word.trim().toLowerCase() !== clean
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to remove word from localStorage', e);
      }
      return updated;
    });
  }, []);

  const isWordSaved = useCallback(
    (word: string, unitNumber?: number) => {
      const clean = word.trim().toLowerCase();
      return savedWords.some(
        (w) => w.word.trim().toLowerCase() === clean && (unitNumber === undefined || w.unitNumber === unitNumber)
      );
    },
    [savedWords]
  );

  return {
    savedWords,
    saveWord,
    removeWord,
    isWordSaved,
    totalSaved: savedWords.length,
  };
}
