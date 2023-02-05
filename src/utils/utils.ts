export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;


