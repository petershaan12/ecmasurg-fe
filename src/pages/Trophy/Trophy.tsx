import { useState, useEffect } from "react";
import axios from "axios";
import MenuSamping from "@/components/MenuSamping";
import Cookies from "js-cookie";
import Loading from "@/components/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  point: number;
}

const Trophy = () => {
  const myself = useSelector((state: any) => state.data.email);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_PUBLIC_API_KEY}/api/trophy`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setUsers(response.data); // Store the response in state
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  if (loading) return <Loading />;

  return (
    <>
      <header className="flex justify-between items-center">
        <div className="flex space-x-5 ">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft className="hover:bg-primary/20 rounded-full" />
          </button>
          <h1 className="md:text-xl font-bold">Trophy</h1>
        </div>
        <MenuSamping />
      </header>

      <main className="mt-8">
        <div className="overflow-x-auto rounded-lg">
          <Table className="min-w-full table-auto">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={index}
                  className={` font-medium hover:bg-primary/20 hover:text-white ${
                    user.email === myself
                      ? "bg-primary text-white text-lg rounded-md p-4" // Primary background and white text for myself
                      : "text-gray-900 text-sm"
                  }`}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.point} points</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
};

export default Trophy;
