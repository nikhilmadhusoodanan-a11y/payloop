
import { cn } from "@/lib/utils";

export const LoaderTwo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "h-5 w-5 animate-spin rounded-full border-2 border-solid border-primary border-t-transparent",
        className
      )}
    />
  );
};
