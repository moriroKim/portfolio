import Image from "next/image";

/**
 * Plain profile photo — no chrome, no overlays.
 * Slight zoom + object-position offset crop any baked-in screenshot
 * banding (status bars etc.) that the source image may contain.
 */
export function ProfileCard() {
  return (
    <div className="mx-auto h-[380px] w-[240px] max-w-full sm:h-[500px] sm:w-[320px]">
      <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-paper-soft shadow-[0_20px_50px_-16px_rgba(0,0,0,0.35)] ring-1 ring-line">
        <Image
          src="/profile.jpg"
          alt="Jin-mo Kim"
          fill
          priority
          quality={95}
          sizes="(min-width: 768px) 360px, 320px"
          className="object-cover [object-position:50%_55%] scale-[1.08]"
        />
      </div>
    </div>
  );
}
