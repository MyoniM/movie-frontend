export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | undefined;

  return function (...args: Parameters<T>): void {
    if (timeoutId) clearTimeout(timeoutId); // Clear the previous timeout if user is still typing

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
