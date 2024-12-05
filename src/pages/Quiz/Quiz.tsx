import MenuSamping from "@/components/MenuSamping";
import "./Quiz.css";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { PlusIcon } from "lucide-react";

const Quiz = () => {
  // const user = useSelector((state: any) => state.data);
  return (
    <>
      <header className="flex justify-between items-center">
        <div className="flex space-x-5 items-center">
          <h1 className="md:text-xl font-bold">Quiz</h1>
          {/* {user.roles === "teacher" && (
            <Link
              to="create"
              className="bg-primary text-white px-3 py-2 text-center rounded-xl md:flex hidden "
            >
              <PlusIcon />
              Tambah Quiz
            </Link>
          )} */}
        </div>
        <MenuSamping />
      </header>

      <main className="mt-8">
        <div className="w-full md:w-[300px] relative drop-shadow-lg flex flex-col items-center">
          <div className="h-[50px] w-full object-cover rounded-t-xl bg-[#faaf91]"></div>
          <div className="w-full bg-white rounded-b-xl p-5 flex flex-col items-start">
            <h1 className="text-lg font-bold mb-2">Sistem Persarafan</h1>
            <div className="flex items-center space-x-2 mb-3">
              <FaClipboardList />
              <p className="text-sm md:text-base">15 questions</p>
            </div>
            <div className="flex justify-between w-full text-xs md:text-base">
              <p className="text-sm"></p>
              <Link
                to="persarafan"
                className="flex items-center space-x-2 hover:underline text-xs md:text-base hover:cursor-pointer"
              >
                Let's Start
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Quiz;
