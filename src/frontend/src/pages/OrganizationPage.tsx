import Profile from "@/components/avatar";
import PostDialog from "@/components/post-content";
import PostEvent from "@/components/post-event";
import Footer from "@/layout/Footer"
import Header from "@/layout/HomeLayout/Header"
import { Pencil } from "lucide-react";
import { useState } from "react";

const OrganizationPage = () => {
    const [orgProfile, setOrgProfile] = useState(
        "https://github.com/shadcn.png",
    );
    const [preview, setPreview] = useState<string | null>(null);
    const [savedProfile, setSaveProfile] = useState(true);

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
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl font-medium">Who we are</h2>
                        <p className="text-md">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic aliquam eum, quisquam impedit dicta eius quidem architecto et, magni eligendi dolorum corporis amet ipsa provident, dolor exercitationem reiciendis fuga tempora?
                        </p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl font-medium">Our mission</h2>
                        <p className="text-md">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic aliquam eum, quisquam impedit dicta eius quidem architecto et, magni eligendi dolorum corporis amet ipsa provident, dolor exercitationem reiciendis fuga tempora?
                        </p>
                    </div>
                    <div className="absolute right-3 md:top-3 top-6">
                        <PostEvent/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrganizationPage