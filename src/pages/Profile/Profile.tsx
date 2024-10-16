// import React, { useEffect, useState } from "react";
import MenuSamping from "../../components/MenuSamping";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";

const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const apiURL = process.env.NEXT_PUBLIC_API_URL;

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem("token"); // Get the token from localStorage

//       const res = await fetch(`${apiURL}/api/profile/me`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) {
//         // Handle unauthorized access
//         window.location.href = "/login";
//         return;
//       }

//       const data = await res.json();
//       setUser(data);
//       setLoading(false);
//     };

//     fetchUserProfile();
//   }, [apiURL]);

//   if (loading) return <div>Loading...</div>; // Show a loading state

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
              PETER SHAAN
            </h1>
            <div className="mt-2 grid md:grid-cols-2 gap-5 justify-between text-lg">
              <p>Bergabung Sejak 2024</p>
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
                <b>Nama:</b> Jonathan Hidson Simbolon
              </p>
              <p>
                <b>Gender:</b> Male
              </p>
              <p>
                <b>Email:</b> peterhiku12@gmail.com
              </p>
              <p>
                <b>Date of Birth:</b> 3 Mei 2003
              </p>
              <p>
                <b>Phone Number:</b> 089529882952
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
                  <img
                    src="/icons/x.svg"
                    width={30}
                    height={30}
                    alt="x"
                  />
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
