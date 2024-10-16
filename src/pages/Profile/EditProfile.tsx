import MenuSamping from "../../components/MenuSamping"

const EditProfile = () => {

    return (
        <>
        <header className="flex justify-between">
          <div className="flex space-x-5">
            <h1 className="text-2xl font-bold">Edit Profil</h1>
          </div>
          <MenuSamping />
        </header>
  
        <main className="grid md:grid-cols-4 grid-cols-1 gap-8 mt-8">
          <EditProfile />
        </main>
      </>
    )
}

export default EditProfile