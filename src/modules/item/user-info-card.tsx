import Image from "next/image";
import Link from "next/link";

interface IProps {
  title: string;
  image: string;
  name: string;
  profileLink: string | number;
}

export default function UserInfoCard({
  image,
  name,
  profileLink,
  title,
}: IProps) {
  return (
    <div className="flex gap-4 bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl p-3 not-dark:shadow-sm">
      <Image
        src={image}
        width={48}
        height={48}
        unoptimized
        alt={`${name} image`}
        className="rounded-xl object-cover"
      />
      <div>
        <p className="text-sm font-light">{title}</p>
        <Link className="font-bold" href={`profile/${profileLink}`}>
          {name}
        </Link>
      </div>
    </div>
  );
}
