import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva('scroll-m-20 tracking-tight', {
  variants: {
    variant: {
      p: 'leading-7', // [&:not(:first-child)]:mt-6',
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
    },
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

export function Text({ variant, className, children, ...props }: TextProps) {
  const Component = variant || 'p';
  return (
    <Component className={cn(textVariants({ variant, className }))} {...props}>
      {children}
    </Component>
  );
}
