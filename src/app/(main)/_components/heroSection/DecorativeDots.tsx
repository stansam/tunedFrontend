export function DecorativeDots() {
  const dots = [1, 2, 3];
  return (
    <div
      className="absolute bottom-0 left-24 flex gap-2 opacity-30 pointer-events-none"
      aria-hidden="true"
    >
      {dots.map((i) => (
        <div
          key={i}
          className="rounded-full bg-slate-400"
          style={{ width: 6 + i * 2, height: 6 + i * 2 }}
        />
      ))}
    </div>
  );
}
