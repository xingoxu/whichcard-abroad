export function asyncOnce<
  T extends (...args: any) => Promise<any>
>(
  func: (
    ...args: Parameters<T>
  ) => ReturnType<T>
) {
  let running: ReturnType<
    typeof func
  > | null = null;
  return (
    ...args: Parameters<typeof func>
  ) => {
    if (running === null) {
      running = func(...args);
      running.finally(() => {
        running = null;
      });
    }
    return running;
  };
}
