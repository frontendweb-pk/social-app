"use client";
export default function Error({ error }: { error: Error }) {
  return <div>Global Error Page {error.message}</div>;
}
