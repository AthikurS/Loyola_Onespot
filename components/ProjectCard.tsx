'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProjectDetails } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";

type Props = {
    id: string;
    image: string;
    title: string;
    name: string;
    avatarUrl: string;
    userId: string;
    description: string;
    futureEnhancement: string;
};

const ProjectCard = ({ id, image, title, name, avatarUrl, userId, description, futureEnhancement }: Props) => {
    // const [randomLikes, setRandomLikes] = useState(0);
    // const [randomViews, setRandomViews] = useState('');
    // const [expanded, setExpanded] = useState(false);

    // useEffect(() => {
    //     setRandomLikes(Math.floor(Math.random() * 10000));
    //     setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k'));
    // }, []);

    // Fetch project details here
    const [projectDetails, setProjectDetails] = useState<ProjectInterface | undefined>(undefined);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            const result = await getProjectDetails(id) as { project?: ProjectInterface };
            setProjectDetails(result?.project);
        };

        fetchProjectDetails();
    }, [id]);
    const firstHalf = description ? description.substring(0, 100) : '';
    const Enhancement = futureEnhancement ? futureEnhancement.substring(0, 100) : '';
    return (
        <div className="gap-1 text-justify space-y-1 pb-1 ">

            <div className="max-w-sm transform rounded-xl bg-white px-2 pb-1 pt-6  shadow-lg transition duration-500 hover:scale-105">
                <Link href={`/profile/${userId}`}>
                    <div className="flex flex-row mb-2">
                        <Image src={avatarUrl} width={28} height={24} className="rounded-full mr-2" alt="profile image" />
                        <h3 className=" text-xs font-bold text-slate-800">{name}</h3>
                    </div></Link>
                <Link href={`/project/${id}`} >
                    <div className="relative">
                        <img className="w-full rounded-xl" src={image} alt={title} />
                    </div>
                    <h1 className="mt-2 cursor-pointer text-l font-bold text-gray-800 line-clamp-2 ">{title}</h1>
                    <div className="my-4">
                        <div className="flex items-center space-x-1 text-slate-800">
                            {description ? (
                                <p>{firstHalf}<span className="text-sky-600 italic">..more</span></p>
                            ) : (
                                <p>No description available</p>
                            )}
                        </div>
                        <div className="bg-purple-100 rounded-lg p-2 shadow-sm  ">
                            <h4 className="mt-2 cursor-pointer text-l font-bold text-gray-800">Future Enhancement</h4>
                            <div className="flex items-center space-x-1 text-slate-800">
                                {futureEnhancement ? (
                                    <p>{Enhancement}<span className="text-sky-600 italic">..more</span></p>
                                ) : (
                                    <p>No Future Enhancement available</p>
                                )}
                            </div>
                        </div>
                    </div></Link>
            </div>


        </div>

    );
};

export default ProjectCard;
