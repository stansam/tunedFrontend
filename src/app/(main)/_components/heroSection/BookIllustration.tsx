import Image from "next/image";

export function BookIllustration() {
  return (
    <div className="relative -top-20 left-[-5%] sm:left-0 h-[180px] w-[290px]">
      <Image
        src="/book_sketch.svg"
        alt="Book illustration"
        className="h-80"
        width={290}
        height={180}
      />
    </div>
  );
}
