import { Link } from "react-router-dom"
import MenuSamping from "../../components/MenuSamping"
import InputModul from "../../components/Modul/InputModul"


const ModulCreate = () => {
    return (
        <>
        <header className="flex justify-between">
          <div className="flex space-x-5">
            <h1 className="text-2xl font-bold">Input Modul pembelajaran</h1>
          </div>
          <MenuSamping />
        </header>
  
        <main className="grid md:grid-cols-4 grid-cols-1 gap-8 mt-8">
          <section className="md:col-start-1 md:col-end-3 ">
            <InputModul />
          </section>
          <section className="md:col-end-5">
            <div className="bg-primary rounded-xl p-5 text-white text-center space-y-6 flex flex-col items-center">
              <h1>Tutorial Input Modul Pembelajaran</h1>
              <Link to="/modul/tutorial">
                <p className="bg-white px-3 py-1 text-black rounded-xl w-fit ">
                  Tonton Sekarang
                </p>
              </Link>
            </div>
          </section>
        </main>
      </>
    )
}

export default ModulCreate