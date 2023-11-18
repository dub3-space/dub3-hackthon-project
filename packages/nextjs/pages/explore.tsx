import type { NextPage } from "next";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { Explorer } from "~~/components/explore";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Dub3.ai</span>
          </h1>
        </div>

        <div className="flex-grow bg-base-300 w-full max-w-2xl mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-2xl rounded-3xl">
              <ExclamationCircleIcon className="h-8 w-8 fill-secondary" />
              <p>Explore Speakers</p>
              <Explorer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
