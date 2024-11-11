import { cn } from "../../utils/cn";

interface ErrorsMessageProps {
  message: string;
  className?: string;
}

export default function ErrorsMessage({
  message: msg,
  className,
}: ErrorsMessageProps) {
  return (
    <div className={cn("text-red-500 font-medium text-[0.7rem]", className)}>
      {msg}
    </div>
  );
}
