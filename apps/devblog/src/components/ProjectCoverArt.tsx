import Image from 'next/image';

interface ProjectCoverArtProps {
  image?: string;
  title: string;
  size?: 'card' | 'hero';
}

export function ProjectCoverArt({ image, title, size = 'card' }: ProjectCoverArtProps) {
  const aspectClass = size === 'hero' ? 'aspect-[21/9]' : 'aspect-[16/10]';

  if (image) {
    return (
      <div className={`relative w-full ${aspectClass} overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
    );
  }

  const monogram = title.charAt(0).toUpperCase();

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-lg bg-gradient-to-br from-primary-50 to-primary-200 dark:from-primary-900/40 dark:to-gray-900 flex items-center justify-center`}
    >
      <span
        className="font-black tracking-tighter text-primary-300/50 dark:text-primary-700/40 leading-none select-none"
        style={{ fontSize: size === 'hero' ? '12rem' : '8rem' }}
      >
        {monogram}
      </span>
    </div>
  );
}
