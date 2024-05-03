import React, { useEffect, useState} from "react";
import Pagination from "./components/pagination";
import { useQuery } from "@tanstack/react-query";
import TopBar from "./topbar";

function Index() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["pokemon", currentPage], // defining the query key with currentPage
    queryFn: async ({ queryKey }) => {
      const [_key, currentPage] = queryKey;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          (currentPage - 1) * 20
        }&limit=20`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
  });

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const pokemonData = data as
    | { count: number; results: { name: string; url: string }[] }
    | undefined; // Type assertion

  const totalPages = pokemonData ? Math.ceil(pokemonData.count / 20) : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isError) return <div>Error page</div>;

  return (
      <div className="container h-full mx-auto bg-red-900 p-6">
        <TopBar /> 
        {isLoading ? (
          <div>Loading</div>
        ) : isError ? (
          <div>Error fetching data</div>
        ) : (
          <>
          <div className="grid grid-cols-5 gap-4">
              {pokemonData?.results.map((item) => (
                <div
                  key={item.name}
                  className="max-w-sm rounded overflow-hidden shadow-xl bg-white cursor-pointer hover:bg-red-100"
                >
                  <img
                    className="w-full"
                    src="./img/img-icon.png"
                    alt="pokemon"
                  />
                  <div className="p-6 ">
                    <div className=" flex justify-center font-bold text-xl mb-2">
                      Pokemon
                    </div>
                    <div className="flex justify-center">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end my-4 rounded">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
  );
}

export default Index;
