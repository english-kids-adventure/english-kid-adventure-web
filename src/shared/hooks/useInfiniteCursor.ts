import { useEffect, useRef, useState } from 'react';

interface UseInfiniteCursorParams<T, C> {
  fetchFn: (params: { cursor: C | null }) => Promise<{
    items: T[];
    nextCursor: C | null;
  }>;
  getKey: (item: T) => string | number;
}

export function useInfiniteCursor<T, C>({
  fetchFn,
  getKey,
}: UseInfiniteCursorParams<T, C>) {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState<C | null>(null);
  const [nextCursor, setNextCursor] = useState<C | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (loading || !hasMore) return;

      try {
        setLoading(true);

        const res = await fetchFn({ cursor });

        setItems((prev) => {
          const map = new Map<string | number, T>();

          prev.forEach((item) => {
            map.set(getKey(item), item);
          });

          res.items.forEach((item) => {
            map.set(getKey(item), item);
          });

          return Array.from(map.values());
        });

        if (res.nextCursor === null) {
          setHasMore(false);
        } else {
          setNextCursor(res.nextCursor);
        }
      } catch {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cursor]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loading &&
          nextCursor !== null &&
          nextCursor !== cursor
        ) {
          setCursor(nextCursor);
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [nextCursor, loading, hasMore]);

  return {
    items,
    loading,
    error,
    hasMore,
    loadMoreRef,
  };
}
