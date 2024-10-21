import Profile from "@/components/profile-page/avatar";
import EventDialog from "@/components/organization-page/event-dialog";
import ProjectCard from "@/components/organization-page/project-card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/layout/Footer";
import Header from "@/layout/HomeLayout/Header";
import { Link, Mail, Pencil, Phone, Save, UserRoundPen } from "lucide-react";
import { useState } from "react";

const projectCardsData = [
    {
        projectImage: "https://example.com/image1.jpg",
        profileName: "Jane Doe",
        title: "Next.js Beginner Tutorial",
        description: "Learn how to build your first web app with Next.js and React.",
    },
];

const OrganizationPage = () => {
    const [orgProfile, setOrgProfile] = useState("https://github.com/shadcn.png");
    const [preview, setPreview] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [savedProfile, setSaveProfile] = useState(true);
    const [markdownValue, setMarkDownValue] = useState("");
    const [formData, setFormData] = useState({
        email: "Pagzone@dev.gmail.com",
        username: "Pagzone",
        phone: "+935 785 0648",
    });

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
        setSaveProfile(true);
    };


    return (
        <div className="md:mx-[75px] flex flex-col gap-y-4 max-md:px-4">
            <Header />
            <div className="flex flex-col gap-y-6 relative">
                <h1 className="text-3xl font-bold text-lime-700 text-center md:text-left">Organization</h1>

                <div className="h-52 flex flex-col items-center justify-center gap-y-2">
                    <div className="relative">
                        <Profile userAvatar={preview || orgProfile} style="size-32 sm:size-40" />
                        <span className="absolute right-2 bottom-2 bg-slate-300 rounded-full p-2 hover:bg-slate-400 transition-colors duration-150 cursor-pointer">
                            <label htmlFor="profile-upload" aria-label="Change Profile Picture">
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
                    <span className="text-2xl font-bold text-center">Organization Name</span>
                </div>

                <div className="h-auto flex flex-col gap-y-8 border px-4 py-8 rounded-lg shadow bg-white relative">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-medium">Who we are</h2>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur saepe sed, eum provident reprehenderit voluptate esse in totam sunt, accusantium deleniti dolores! Impedit quaerat voluptas obcaecati corporis esse! Placeat, facilis?
                        </p>
                    </div>

                    <div className="absolute right-3 top-3">
                        <EventDialog />
                    </div>
                </div>

                <div className="h-[26rem] flex flex-col gap-y-2 border p-4 rounded-lg shadow bg-white relative">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold max-md:text-lg">Community Projects</h1>
                        <EventDialog isEditing={true} />
                    </div>
                    <ScrollArea className="h-full overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-2.5 py-2">
                            {projectCardsData.length > 0 &&
                                projectCardsData.map((value, index) => (
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

                <div className="border h-auto sm:h-60 flex flex-col rounded-lg shadow bg-white px-6 py-4 w-full relative">
                    <h2 className="font-bold text-2xl mb-3">Contact Us</h2>

                    <div className="grid grid-rows-3 grid-flow-col space-y-2 py-2 justify-between">
                        <div className="flex items-center space-x-2">
                            <Mail className="size-6 text-gray-600" />
                            {isEditing ? (
                                <Input
                                    className="text-sm text-slate-800 border-none h-8"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <div className="text-sm text-slate-800 h-8 p-2">{formData.email}</div>
                            )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <Link className="size-6 text-gray-600" />
                            {isEditing ? (
                                <Input
                                    className="text-sm text-slate-800 border-none h-8"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <div className="text-sm text-slate-800 h-8 p-2">{formData.username}</div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Phone className="size-6 text-gray-600" />
                            {isEditing ? (
                                <Input
                                    className="text-sm text-slate-800 border-none h-8"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <div className="text-sm text-slate-800 h-8 p-2">{formData.phone}</div>
                            )}
                        </div>
                    </div>

                    <div
                        className="absolute right-3 top-3 bg-lime-700 text-white font-medium flex items-center gap-x-1.5 px-4 py-2 rounded-lg cursor-pointer"
                        onClick={handleEditToggle}
                    >
                        <UserRoundPen size={20} />
                        <span className="text-sm md:text-base">{isEditing ? "Cancel" : "Edit"}</span>
                    </div>
                </div>

                {!savedProfile && (
                    <div
                        className="absolute right-3 top-0 bg-lime-700 text-white font-medium flex items-center gap-x-1.5 px-4 py-2 rounded-lg cursor-pointer"
                        onClick={handleSaveChanges}
                    >
                        <Save size={20} />
                        <span className="text-sm md:text-base max-md:hidden">Save Changes</span>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default OrganizationPage;
