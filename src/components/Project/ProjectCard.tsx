import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps{
    title: string;
    id: string;
    image: string;
    name: string;
    userId: string;
    avatarUrl: string;
}

const ProjectCard = ({title, id, image, name, avatarUrl, userId, }:ProjectCardProps) => {
    const numberOfLikes = 100;
    const numberOfViews = 100;
  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card ">
        <Link href={`/project/${id}`} className="flexCenter group relative w-full h-full">
            <Image height={314} width={414} src={image} alt={title} className="w-full h-full rounded-2xl object-cover"/>
            <div className="hidden group-hover:flex profile_card-title">
                <p>{title}</p>
            </div>
        </Link>
        <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
            <Link href={`/profile/${userId}`}>
                <div className="flexCenter gap-2">
                    <Image src={avatarUrl} width={24} height={24} className="rounded-full" alt="profile" />
                </div>
            </Link>
            <div className="flexCenter gap-3">
                <div className="flexCenter gap-2">
                    <Image src={'/hearth.svg'} alt="heart icon" width={13} height={12} />
                    <p className="text-sm">{numberOfLikes}</p>
                </div>
                <div className="flexCenter gap-2">
                    <Image src={'/eye.svg'} alt="heart icon" width={13} height={12} />
                    <p className="text-sm">{numberOfViews}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard