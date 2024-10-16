import { CategoriesCB } from "@/components/catergories-cb";
import FeaturedCard from "@/components/featured-card";
import PageSelector from "@/components/pagination";
import TutorialCard from "@/components/tutorial-card";
import { useState } from "react";

const HomeContent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const featured = {
        image: 'plants-being-planted-greenhouse.png', title: "lorem Ipsum ", description: "lLorem ipsum dolor sit, amet consectetur adipisicing elit. Iure repellendus modi deleniti dolores? Explicabo quisquam nihil tempore dolor vel facere odit voluptates. Deserunt modi atque reprehenderit non ratione. Corporis, molestiae"
    }

    const tutorials = [
        {
            id: 1,
            tutorialImage: "https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
            profileName: "Alice Brown",
            title: "Intro to Urban Farming",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint."
        },
        {
            id: 2,
            tutorialImage: "https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
            profileName: "Michael Johnson",
            title: "Advanced Techniques in Urban Farming",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint."
        },
        {
            id: 3,
            tutorialImage: "https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
            profileName: "Sarah Williams",
            title: "Sustainable Urban Farming Practices",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint."
        },
        {
            id: 4,
            tutorialImage: "https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
            profileName: "David Lee",
            title: "Urban Farming for Beginners",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint."
        },
        {
            id: 5,
            tutorialImage: "https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
            profileName: "Emily Martinez",
            title: "The Future of Urban Farming",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint."
        },
        {
            id: 6,
            tutorialImage: "https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
            profileName: "Sarah Williams",
            title: "Sustainable Urban Farming Practices",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint."
        },
        {
            id: 7,
            tutorialImage: "https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
            profileName: "David Lee",
            title: "Urban Farming for Beginners",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint."
        },
        {
            id: 8,
            tutorialImage: "https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
            profileName: "Emily Martinez",
            title: "The Future of Urban Farming",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint."
        },

    ];

    const currenTutorials = tutorials.slice(startIndex, endIndex);

    return (
        <div className="flex flex-col gap-y-6 h-full">
            <div className="h-60 md:h-72 ">
                <FeaturedCard
                    title={featured.title}
                    description={featured.description}
                    image={featured.image}
                />
            </div>

            <div className="flex flex-col h-full gap-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold md:text-3xl">Tutorials</h1>
                    <div className="hidden max-md:block">
                        <CategoriesCB />
                    </div>
                </div>

                <div className="flex flex-col justify-between items-center gap-y-4 h-full">
                    <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6 flex-1">
                        {
                            currenTutorials.map(value => (
                                <TutorialCard
                                    key={value.id}
                                    tutorialImage={value.tutorialImage}
                                    profileImage={value.profileImage}
                                    profileName={value.profileName}
                                    title={value.title}
                                    description={value.description}
                                />
                            ))
                        }
                    </div>
                    <PageSelector
                        tutorials={tutorials}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                    />
                </div>

            </div>
        </div>
    )
}

export default HomeContent