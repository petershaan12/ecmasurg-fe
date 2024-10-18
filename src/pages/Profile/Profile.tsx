import { useDispatch } from "react-redux";
import MenuSamping from "../../components/MenuSamping";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "@/redux/fetchUser";
import { Navigate } from "react-router-dom";

interface RootState {
  data: any; // Replace 'any' with the actual type of your items
  loading: boolean;
  error: Error | null;
}

const Profile = () => {
  const apiURL = process.env.REACT_PUBLIC_API_KEY;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.data);
  const loading = useSelector((state: RootState) => state.loading);
  const error = useSelector((state: RootState) => state.error);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchUsers() as any);
      console.log(data);
    };

    fetchData();
  }, [dispatch]);

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  if (loading) return <div>Loading...</div>; // Show a loading state

  if (!user) return <Navigate to="/login" />;

  const formatDate = (dateString: any) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options); // Gunakan 'en-GB' untuk format DD/MM/YYYY
  };

  return (
    <>
      <header className="flex justify-between">
        <div className="flex space-x-5">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <MenuSamping user={user} />
      </header>

      <main>
        <div className="md:flex items-center justify-center md:justify-start text-center gap-5 mt-5 ml-8">
          <Avatar className="cursor-pointer w-28 h-28 md:w-[180px] md:h-[180px] mx-auto md:mx-0 mt-8">
            <AvatarImage
              src={`${apiURL}/storage/profiles/${user.photo_profile}`}
            />
            <AvatarFallback className="bg-primary/80">
              <p className="text-4xl font-bold uppercase text-white">
                {user.name
                  .split(" ")
                  .map((name: string) => name.slice(0, 1))
                  .join("")}
              </p>
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
                  className="pt-1"
                />
                {user.point ? <p>{user.point} Points</p> : <p>0 Points</p>}
              </div>
            </div>
            {user.biografi && (
              <p className="bg-[#D9D9D9] mt-3 px-2 italic">{user.biografi}</p>
            )}
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
                <b>Gender:</b> {user.gender ? user.gender : "-"}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Date of Birth:</b>{" "}
                {user.dateof_birth ? formatDate(user.dateof_birth) : "-"}
              </p>
              <p>
                <b>Phone Number:</b>{" "}
                {user.phone_number ? user.phone_number : "-"}
              </p>
              <div id="socialMedia" className="flex space-x-5 mt-5">
                {user.facebook && (
                  <a href={`https://facebook.com/${user.facebook}`}>
                    <img
                      src="/icons/facebook.svg"
                      width={30}
                      height={30}
                      alt="facebook"
                    />
                  </a>
                )}
                {user.instagram && (
                  <a href={`https://instagram.com/${user.instagram}`}>
                    <img
                      src="/icons/instagram.svg"
                      width={30}
                      height={30}
                      alt="instagram"
                    />
                  </a>
                )}
                {user.youtube && (
                  <a href={`${user.youtube}`}>
                    <img
                      src="/icons/youtube.svg"
                      width={30}
                      height={30}
                      alt="youtube"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
