import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "./ui/card"

interface ProjectCardProps {
    projectImage: string;
    profileName: string;
    title: string;
    description: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ ...params }) => {
    return (
        <Card className="h-80 cursor-pointer">
            <CardHeader className="h-1/2">
                <img
                    className="h-full bg-slate-800 rounded-t-lg object-cover"
                    src={params.projectImage}
                    alt="tutorial-image"
                />
            </CardHeader>
            <CardContent className="flex flex-col space-y-2 px-4 py-3 rounded-b-lg">
                <CardTitle className="font-semibold text-lg text-gray-800">
                    {params.profileName}
                </CardTitle>
                <div className="flex flex-col">
                    <span className="font-semibold text-md text-gray-900 truncate">
                        {params.title}
                    </span>
                    <CardDescription className="text-sm text-gray-600 overflow-hidden h-[3rem] leading-tight line-clamp-3">
                        {params.description}
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProjectCard