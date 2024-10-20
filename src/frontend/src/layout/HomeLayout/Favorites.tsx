import TutorialCard from "@/components/tutorial-card"
// import { tutorials } from "./Home"
import { useState } from "react";
import PageSelector from "@/components/pagination";

const Favorites = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 9;
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const currenTutorials = tutorials.slice(startIndex, endIndex);

    return (
        <div className="flex flex-col gap-y-4 h-full">
            <h1 className="text-2xl font-bold md:text-3xl ">Tutorials</h1>
{/* 
            <div className="flex flex-col items-center gap-y-4 h-full ">
                <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6 flex-1 ">
                    {currenTutorials.map((value) => (
                        <TutorialCard
                            key={value.id}
                            tutorialImage={value.tutorialImage}
                            profileImage={value.profileImage}
                            profileName={value.profileName}
                            title={value.title}
                            description={value.description}
                        />
                    ))}
                </div>
                <PageSelector
                    tutorials={tutorials}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                />
            </div> */}
        </div>
    )
}

export default Favorites