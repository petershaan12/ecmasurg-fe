import { PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"
import MenuSamping from "../../components/MenuSamping"
import CardModul from "../../components/Modul/CardModul"

const Modul = () => {
    return (
        <>
        <header className="flex justify-between items-center">
          <div className="flex space-x-5">
            <h1 className="md:text-2xl font-bold">Input pembelajaran</h1>
            <Link
              to="/modul/create"
              className="bg-primary text-white px-3 py-2 text-center rounded-xl md:flex hidden "
            >
              <PlusIcon />
              Tambah Sub Materi
            </Link>
          </div>
          <MenuSamping />
        </header>
  
        <main className="mt-8">
          <Link
            to="/modul/create"
            className="bg-primary text-white px-3 py-2 text-center rounded-xl md:hidden flex justify-center items-center text-sm mb-8 "
          >
            <PlusIcon />
            Tambah Sub Materi
          </Link>
          <div className="grid grid-cols-2 gap-3 md:flex">
            <CardModul />
            <CardModul />
          </div>
        </main>
      </>
    )
}

export default Modul