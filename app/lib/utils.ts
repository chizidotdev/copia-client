import { cx, type CxOptions as ClassArgs } from 'class-variance-authority';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({});

export function cn(...args: ClassArgs) {
  return customTwMerge(cx(args));
}
