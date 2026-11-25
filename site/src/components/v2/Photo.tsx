// A stock photograph by Unsplash id, sized by the browser.
// Set NEXT_PUBLIC_PHOTO_BASE (for example "photos/") to load local copies named <id>.jpg instead.
const local = process.env.NEXT_PUBLIC_PHOTO_BASE;
const base = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=72`;

export default function Photo({ id, alt, className = "", sizes = "100vw", eager = false, position }: { id: string; alt: string; className?: string; sizes?: string; eager?: boolean; position?: string }) {
  const widths = [640, 960, 1400, 2000];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={local ? `${local}${id}.jpg` : `${base(id)}&w=1400`}
      srcSet={local ? undefined : widths.map((w) => `${base(id)}&w=${w} ${w}w`).join(", ")}
      sizes={local ? undefined : sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`bw h-full w-full object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
