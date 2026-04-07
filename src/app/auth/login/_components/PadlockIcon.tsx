import Image from "next/image";

export function PadlockIcon() {
  return (
    <div
      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center"
      aria-hidden="true"
    >
      <Image
        src="/greenpadlock.png"
        alt=""
        className="object-cover"
        aria-hidden="true"
        width={60}
        height={60}
      />
    </div>
  );
}
