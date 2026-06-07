import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* light mode: dark wordmark */}
      <Image
        src="/operixa-logo-light.png"
        alt="Operixa"
        width={310}
        height={96}
        priority
        className="block h-7 w-auto dark:hidden"
      />
      {/* dark mode: light wordmark */}
      <Image
        src="/operixa-logo-dark.png"
        alt="Operixa"
        width={321}
        height={96}
        priority
        className="hidden h-7 w-auto dark:block"
      />
    </span>
  );
}
