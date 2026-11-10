"use client";

import ResearchError from "./_components/research-error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ResearchError error={error} reset={reset} />;
}