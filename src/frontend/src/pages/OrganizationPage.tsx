import Profile from "@/components/avatar";
import EventDialog from "@/components/event-dialog";
import ProjectCard from "@/components/project-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/layout/Footer"
import Header from "@/layout/HomeLayout/Header"
import { Edit, Link, Mail, Pencil, Phone } from "lucide-react";
import { useState } from "react";

const projectCardsData = [
    {
        projectImage: "https://example.com/image1.jpg",
        profileName: "Jane Doe",
        title: "Next.js Beginner Tutorial",
        description: "Learn how to build your first web app with Next.js and React.",
    },
    {
        projectImage: "https://example.com/image2.jpg",
        profileName: "John Smith",
        title: "Advanced Tailwind CSS Techniques",
        description: "Master advanced styling techniques using Tailwind CSS in your projects.",
    },
    {
        projectImage: "https://example.com/image3.jpg",
        profileName: "Alice Johnson",
        title: "State Management in React",
        description: "An in-depth guide to managing state in React applications using various approaches.",
    },
    {
        projectImage: "https://example.com/image4.jpg",
        profileName: "Michael Lee",
        title: "Optimizing Performance in Next.js",
        description: "Tips and tricks to improve the performance of your Next.js applications.",

    },
    {
        projectImage: "https://example.com/image2.jpg",
        profileName: "John Smith",
        title: "Advanced Tailwind CSS Techniques",
        description: "Master advanced styling techniques using Tailwind CSS in your projects.",
    },
    {
        projectImage: "https://example.com/image3.jpg",
        profileName: "Alice Johnson",
        title: "State Management in React",
        description: "An in-depth guide to managing state in React applications using various approaches.",
    },
    {
        projectImage: "https://example.com/image4.jpg",
        profileName: "Michael Lee",
        title: "Optimizing Performance in Next.js",
        description: "Tips and tricks to improve the performance of your Next.js applications.",

    }
]

const OrganizationPage = () => {
    const [orgProfile, setOrgProfile] = useState(
        "https://github.com/shadcn.png",
    );
    const [preview, setPreview] = useState<string | null>(null);
    const [savedProfile, setSaveProfile] = useState(true);
    const [markdownValue, setMarkDownValue] = useState("");

    const handleChangeProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setOrgProfile(reader.result as string);
            };
            reader.readAsDataURL(file);
            setSaveProfile(false);
        }
    };

    return (
        <div className="md:mx-[75px] flex flex-col gap-y-4 max-md:px-4">
            <Header />
            <div className="flex flex-col gap-y-6 relative">
                <h1 className="text-3xl font-bold text-lime-700">Organization</h1>
                <div className="h-52 flex flex-col items-center justify-center gap-y-2">
                    <div className="relative">
                        <Profile
                            userProfile={preview || orgProfile}
                            style="size-40 max-md:size-32"
                        />
                        <span className="absolute right-2 bottom-2 bg-slate-300 rounded-full p-2 hover:bg-slate-400 transition-colors duration-150 cursor-pointer">
                            <label
                                htmlFor="profile-upload"
                                aria-label="Change Profile Picture"
                            >
                                <Pencil size={15} aria-hidden="true" />
                            </label>
                            <input
                                id="profile-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleChangeProfile}
                            />
                        </span>
                    </div>
                    <span className="text-2xl font-bold">Organization Name</span>
                </div>

                <div className="h-auto flex flex-col gap-y-8 border px-4 py-8 rounded-lg shadow bg-white relative">
                    <div className="flex flex-col gap-x-2">
                        <h2 className="text-lg font-medium">Who we are</h2>
                        <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur saepe sed, eum provident reprehenderit voluptate esse in totam sunt, accusantium deleniti dolores! Impedit quaerat voluptas obcaecati corporis esse! Placeat, facilis?</p>
                    </div>
                    <div className="flex flex-col gap-x-2">
                        <h2 className="text-lg font-medium">Who we are</h2>
                        <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur saepe sed, eum provident reprehenderit voluptate esse in totam sunt, accusantium deleniti dolores! Impedit quaerat voluptas obcaecati corporis esse! Placeat, facilis?</p>
                    </div>
                    <div className="absolute right-3 top-3 ">
                        <EventDialog />
                    </div>
                </div>

                <div className="h-[25rem] flex flex-col gap-y-2 border p-4 rounded-lg shadow bg-white relative">
                    <div className="flex items-center justify-between ">
                        <h1 className="text-2xl font-bold">Community Projects</h1>
                        <EventDialog isEditing={true} />
                    </div>

                    <ScrollArea className="h-full overflow-y-auto ">
                        <div className="grid grid-col-1 md:grid-cols-4 gap-4 px-2.5 py-2">
                            {projectCardsData.length > 0 && projectCardsData.map((value, index) => (
                                <ProjectCard
                                    key={index}
                                    projectImage={value.projectImage}
                                    profileName={value.profileName}
                                    title={value.title}
                                    description={value.description}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                <div className="border h-40 rounded-lg shadow bg-white p-4 w-full flex justify-between items-center">
                    <div>
                        <h2 className="font-bold text-lg mb-3">Contact Us</h2>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                                <Mail className="w-5 h-5 text-gray-600" />
                                <span className="text-sm text-gray-700">Pagzone@dev.gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Link className="w-5 h-5 text-gray-600" />
                                <span className="text-sm text-gray-700">Pagzone</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-5 h-5 text-gray-600" />
                                <span className="text-sm text-gray-700">+935 785 0648</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md">
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrganizationPage