import { useSelector } from "react-redux";
import MenuSamping from "../../components/MenuSamping";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import Certificate from "@/components/Certificate";
import MyModul from "@/components/Modul/MyModul";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
      duration: 0.5,
    },
  },
};

const Profile = () => {
  const apiURL = process.env.REACT_PUBLIC_API_KEY;
  const user = useSelector((state: any) => state.data);

  const formatDate = (dateString: any) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options); // Gunakan 'en-GB' untuk format DD/MM/YYYY
  };

  console.log(user);
  return (
    <>
      <header className="flex justify-between">
        <div className="flex space-x-5">
          <h1 className="md:text-xl font-bold">Profile</h1>
        </div>
        <MenuSamping />
      </header>

      <main>
        <motion.div
          className="md:flex items-center justify-center md:justify-start text-center gap-5 mt-5 md:ml-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Avatar className="cursor-pointer  w-[180px] h-[180px] mx-auto md:mx-0 mt-8">
              <AvatarImage
                src={`${apiURL}/storage/profiles/${user.photo_profile}`}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/80">
                <p className="text-4xl font-bold uppercase text-white">
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((name: string) => name.slice(0, 1))
                        .join("")
                    : "AB"}
                </p>
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <motion.div
            className="flex flex-col my-5 items-center md:items-start"
            variants={itemVariants}
          >
            <h1 className="md:text-2xl text-xl uppercase font-bold">
              {user.name}
            </h1>
            <div className="mt-2 grid md:grid-cols-2 gap-5 md:justify-between justify-center items-center text-lg">
              <p>Bergabung Sejak {new Date(user.created_at).getFullYear()}</p>
              {user.roles === "user" && (
                <div className="flex items-center justify-center">
                  <img
                    src="/icons/point.png"
                    width={30}
                    height={30}
                    alt="point"
                    className="pt-1"
                  />
                  {user.point ? <p>{user.point} Points</p> : <p>0 Points</p>}
                </div>
              )}
            </div>
            {user.biografi && (
              <p className="bg-[#D9D9D9] mt-3 px-2 italic">{user.biografi}</p>
            )}
          </motion.div>
        </motion.div>

        <section className="grid md:grid-cols-2 mt-8">
          <div>
            {user.roles === "teacher" && <MyModul id={user.id} />}
            {user.roles === "user" && (
              <>
                <h1 className="md:text-xl mb-5">Completed Course </h1>
                <Certificate />
              </>
            )}
          </div>
          <motion.div variants={containerVariants}>
            <h1 className="md:text-xl mb-5">Biodata </h1>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-5 space-y-3"
            >
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
                  <a
                    target="_blank"
                    href={`https://facebook.com/${user.facebook}`}
                  >
                    <img
                      src="/icons/facebook.svg"
                      width={30}
                      height={30}
                      alt="facebook"
                    />
                  </a>
                )}
                {user.instagram && (
                  <a
                    target="_blank"
                    href={`https://instagram.com/${user.instagram}`}
                  >
                    <img
                      src="/icons/instagram.svg"
                      width={30}
                      height={30}
                      alt="instagram"
                    />
                  </a>
                )}
                {user.youtube && (
                  <a target="_blank" href={`${user.youtube}`}>
                    <img
                      src="/icons/youtube.svg"
                      width={30}
                      height={30}
                      alt="youtube"
                    />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default Profile;
