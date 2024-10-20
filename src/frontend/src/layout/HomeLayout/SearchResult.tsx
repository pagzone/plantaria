import { useSearchParams } from "react-router-dom";


const ResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search") || "";

    return (
        <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold pl-2">Your Search for : 
                "<span
                  className="font-medium text-lg"
                 >
                {query}
                </span>"
            </h1>
        </div>
    );
};

export default ResultsPage;
