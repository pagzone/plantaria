import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const [tutorials, setTutorials] = useState([]);
    const [users, setUsers] = useState([]);
    const [organizations, setOrganizations] = useState([]);

    return (
        <div className="h-full flex flex-col gap-y-4 p-4">
            <h1 className="text-2xl font-bold">
                Your Search for:
                <span className="font-medium text-lg"> "{query}" </span>
            </h1>

            {tutorials.length > 0 && (
                <div className="flex flex-col border p-2 gap-y-4 rounded-xl shadow">
                    <h2 className="text-xl font-semibold">Tutorials</h2>
                    {tutorials.map((tutorial, index) => (
                        <Link 
                          to={`/tutorial/${1}`} // tutorial.id
                          className={`shadow p-4 rounded-xl cursor-pointer
                          ${index % 2 === 0 ? "bg-slate-100" : "bg-white"}
                        `}>
                            {/* {tutorial.title} */}
                        </Link>
                    ))}
                </div>
            )}

            {users.length > 0 && (
                <div className="flex flex-col border p-2 gap-y-4 rounded-xl shadow">
                    <h2 className="text-xl font-semibold">Users</h2>
                    {users.map((user, index) => (
                        <div className={`shadow p-4 rounded-xl cursor-pointer
                      ${index % 2 === 0 ? "bg-slate-100" : "bg-white"}
                    `}>
                            {/* {user.title} */}
                        </div>
                    ))}
                </div>
            )}

            {organizations.length > 0 && (
                <div className="flex flex-col border p-2 gap-y-4 rounded-xl shadow">
                    <h2 className="text-xl font-semibold">Organization</h2>
                    {organizations.map((organization, index) => (
                        <div className={`shadow p-4 rounded-xl cursor-pointer
                      ${index % 2 === 0? "bg-slate-100" : "bg-white"}
                    `}>
                            {/* {organization.title} */}
                        </div>
                    ))}
                </div>
            )}

            {tutorials.length === 0 && users.length === 0 && organizations.length === 0 && (
                <div className="h-24 flex items-center justify-center">
                  <p className="text-gray-500">No results found for: "{query}"</p>
                </div>
            )}
        </div>
    );
};

export default ResultsPage;
