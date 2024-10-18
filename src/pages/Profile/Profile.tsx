import MenuSamping from "../../components/MenuSamping";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { useSelector } from "react-redux";

// type User = {
//   name: string;
//   email: string;
//   dateOfBirth: string;
//   phoneNumber: string;
//   gender: string;
//   created_at: Date;
// };

const Profile = () => {
  const user = useSelector((state: any) => state.data);

  return (
    <>
      <header className="flex justify-between">
        <div className="flex space-x-5">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <MenuSamping />
      </header>

      <main>
        <div className="md:flex items-center justify-center md:justify-start text-center gap-5 mt-5 ml-8">
          <Avatar className="cursor-pointer w-28 h-28 md:w-[180px] md:h-[180px] mx-auto md:mx-0 mt-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <p className="text-4xl font-bold uppercase">PETER SHAAN</p>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col my-5 items-center md:items-start">
            <h1 className="md:text-4xl text-xl uppercase font-bold">
              {user.name}
            </h1>
            <div className="mt-2 grid md:grid-cols-2 gap-5 justify-between text-lg">
              <p>Bergabung Sejak {new Date(user.created_at).getFullYear()}</p>
              <div className="flex items-center">
                <img
                  src="/icons/point.png"
                  width={30}
                  height={30}
                  alt="point"
                />
                <p>5000 Points</p>
              </div>
            </div>
            <p className="bg-[#D9D9D9] mt-3 px-2 italic">
              “Kesehatan adalah Hal yang terutama”
            </p>
          </div>
        </div>

        <section className="grid md:grid-cols-2 mt-8">
          <div>
            <h1 className="text-xl mb-5">Completed </h1>
            <div className="flex items-center space-x-5">
              <img
                src="/icons/medali.png"
                width={100}
                height={100}
                alt="otak"
              />
              <div>
                <h1 className="text-xl font-bold">Sistem Persarafan</h1>
                <p className="">Lulus Tanggal 26 April 2024</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl mb-5">Biodata </h1>
            <div className="bg-white rounded-xl p-5 space-y-3">
              <p>
                <b>Nama:</b> {user.name}
              </p>
              <p>
                <b>Gender:</b> {user.gender}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Date of Birth:</b> {user.dateOfBirth}
              </p>
              <p>
                <b>Phone Number:</b> {user.phoneNumber}
              </p>
              <div id="socialMedia" className="flex space-x-5 mt-5">
                <a href="">
                  <img
                    src="/icons/facebook.svg"
                    width={30}
                    height={30}
                    alt="facebook"
                  />
                </a>
                <a href="">
                  <img src="/icons/x.svg" width={30} height={30} alt="x" />
                </a>
                <a href="">
                  <img
                    src="/icons/youtube.svg"
                    width={30}
                    height={30}
                    alt="youtube"
                  />
                </a>
                <a href="">
                  <img
                    src="/icons/linkedin.svg"
                    width={30}
                    height={30}
                    alt="aedin"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
