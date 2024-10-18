import { useSelector } from "react-redux";
import InputEdit from "../../components/InputEdit";
import MenuSamping from "../../components/MenuSamping";

const EditProfile = () => {
  const user = useSelector((state: any) => state.data);

  return (
    <>
      <header className="flex justify-between">
        <div className="flex space-x-5">
          <h1 className="text-2xl font-bold">Edit Profil</h1>
        </div>
        <MenuSamping />
      </header>

      <main className="grid md:grid-cols-4 grid-cols-1 gap-8 mt-8">
        <InputEdit user={user} />
      </main>
    </>
  );
};

export default EditProfile;
