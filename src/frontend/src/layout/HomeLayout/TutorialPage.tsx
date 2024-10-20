import CommentArea from "@/components/comments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageRoutes } from "@/constants/PageRoutes";
import { ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";



interface Section {
  title: string;
  content: string[];
  subSections?: SubSection[];
}

interface SubSection {
  title: string;
  content: string[];
}

const TutorialPage = () => {
  const [onFavorite, setOnFavorite] = useState(false);
  

  const verticalFarmingData: Section[] = [
    {
      title: "What is vertical farming?",
      content: [
        "Vertical farming is a unique method of growing plants or crops in vertically stacked layers. Plants stretch up vertically across walls, or different materials, rather than traditional farming methods.",
        "With this method, it’s possible to grow more than one plant simultaneously without taking up much space — the multiple layers of plants allow for more crops per square foot than other systems.",
        "There are several popular growing methods for vertical farming, including the use of soil, aeroponic, or hydroponic practices. However, the basics of vertical farming remain the same while utilizing each of these methods.",
        "The ultimate target of vertical farming systems is to maximize space — in urban areas, for example — or for home farmers looking to grow their own food fast and to utilize."
      ],
    },
    {
      title: "What you need to get started with vertical farming at home",
      content: [
        "Water or other containers of equal size",
        "A solid foundation – where necessary",
        "A timer or precise water source to be dedicated to your vertical farm",
        "Beds of soil/medium for your plants",
        "A small tank to store water – make small holes in this bottle to provide a slow but continuous supply of water",
        "Something to attach your plants to that won’t go stale"
      ],
    },
    {
      title: "Setting Up Your Vertical Farm",
      subSections: [
        {
          title: "Step 1: Choose Your Vertical Farming System",
          content: [
            "The first step in setting up your vertical farm is choosing the right system for your needs. There are several types of vertical farming structures, including:",
            "Vertical towers",
            "Wall-mounted systems"
          ]
        },
        {
          title: "Step 2: Select Your Growing Method",
          content: [
            "Next, decide on the growing method you’ll use in your vertical farm. Common techniques include hydroponics, aeroponics, and aquaponics. Each method has its own benefits and requirements. For instance, hydroponics creates a highly-efficient growing system. Aeroponics is a leading provider of aeroponic systems that can help you create a high-efficiency, compact farm."
          ]
        },
        {
          title: "Step 3: Create a Controlled Environment",
          content: [
            "To ensure your plants thrive, you’ll need to create a controlled environment for your vertical farm. This includes maintaining appropriate heat, light, and air conditions. Invest in reliable environmental controllers like the infrared ITC-308 temperature controllers and Inkbird IHC-200 humidity controller to maintain optimal conditions."
          ]
        },
        {
          title: "Step 4: Select Your Plants and Growing Medium",
          content: [
            "Proper lighting is essential for plant growth in vertical farms. LED grow lights, such as those from Philizon LED, provide energy-efficient and custom lighting solutions. Consider factors like light spectrum, intensity, and coverage when choosing the right lighting system for your plants."
          ]
        },
        {
          title: "Step 5: Monitor and Automate Your System",
          content: [
            "Make sure your system includes key components, such as practical tools, with tools like the Bluelab Combo Meter. Accessories like system timers, like the Titan Controls Apollo 9, ensure consistent nutrient and light delivery. Consider incorporating a drip irrigation system or efficient water and nutrient delivery."
          ]
        }
      ],
      content: []
    }
  ];

  return (
    <div className="flex flex-col h-full gap-y-4 px-4 md:px-8 py-4">
      <Link className="flex items-center gap-x-1" to={PageRoutes.HOME}>
        <ArrowLeft size={25} />
        <span className="text-lg md:text-xl font-bold hover:underline">Home</span>
      </Link>

      <div className="flex flex-col gap-y-4">
        <div
          className="rounded-xl h-60 md:h-72 p-6 bg-cover bg-no-repeat flex flex-col justify-between cursor-pointer"
          style={{
            backgroundPosition: "60%",
            backgroundImage: `url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b')`,
          }}
        />

        <h1 className="text-2xl md:text-4xl font-bold">A Quick Guide to Vertical Farming</h1>

        {/* Author and Date Section */}
        <div className="flex items-center justify-between gap-2 ">
          <div className="flex items-center gap-x-2">
            <img
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b"
              alt="avatar-image"
            />
            <span className="text-lg font-medium hover:underline cursor-pointer">Profile Name</span>
          </div>

          <div className="flex items-center gap-x-2 ">
            <div
              className="flex items-center gap-x-1 text-sm cursor-pointer 2"
              onClick={() => setOnFavorite(!onFavorite)}
            >
              <Heart className={`${onFavorite ? "text-red-500 fill-red-500" : "text-black"}`} size={20} />
              <span className="max-md:hidden">Add to favorites</span>
            </div>
          </div>
        </div>

      </div>

      {/* Scrollable Content */}
      <ScrollArea>
        <div className="h-96 mx-auto px-4 py-8">
          {verticalFarmingData.map((section, index) => (
            <div key={index} className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{section.title}</h1>

              {section.content && section.content.map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}

              {section.subSections && section.subSections.map((subSection, j) => (
                <div key={j} className="mt-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">{subSection.title}</h3>
                  {subSection.content.map((item, k) => (
                    <p key={k} className="mb-4">{item}</p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Comments Area */}
      <div className="h-96 p-4 ">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        {/* New Comment Input */}
        <CommentArea/>
      </div>
    </div>
  );
};

export default TutorialPage;
