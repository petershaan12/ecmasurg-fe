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
import dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  const [selectedWeek, setSelectedWeek] = useState<string>("all"); // Minggu terpilih
  const [availableWeeks, setAvailableWeeks] = useState<any[]>([]); // Daftar minggu yang tersedia
  const navigate = useNavigate();

  console.log(selectedWeek)

  const getAvailableWeeks = () => {
    const startWeek = dayjs("2024-10-20"); // Minggu awal
    const today = dayjs();
    const weeks = [];

    let current = startWeek;
    while (current.isBefore(today, "day") || current.isSame(today, "day")) {
      const weekStart = current.startOf("week");
      const weekEnd = current.endOf("week");
      weeks.push({
        original: `${weekStart.format("YYYY-MM-DD")} - ${weekEnd.format("YYYY-MM-DD")}`,
        formatted: `${weekStart.format("dddd, DD MMM YYYY")} - ${weekEnd.format("dddd, DD MMM YYYY")}`,
      });
      current = current.add(1, "week");
    }

    return weeks.reverse(); // Urutkan dari minggu terbaru
  };

  // Mengatur minggu default sebagai minggu ini
  useEffect(() => {
    setAvailableWeeks(getAvailableWeeks());
  }, []);

  // Fetch data berdasarkan minggu terpilih
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const params: any = {};

        if (selectedWeek !== "all") {
          const [start, end] = selectedWeek.split(" - ");
          params.startDate = start;
          params.endDate = end;
        } else {
          params.all = "all";
        }
        

        const response = await axios.get(`${process.env.REACT_PUBLIC_API_KEY}/api/users_quizzes`, {
          params,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setUsers(response.data.data); // Simpan data pengguna
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selectedWeek]); // Jalankan setiap kali `selectedWeek` berubah


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
        {/* Dropdown untuk memilih minggu */}
        <div className="mb-4">
          <label htmlFor="week-select" className="block mb-2 font-medium">
            Pilih Minggu:
          </label>

          <Select onValueChange={(value) => setSelectedWeek(value)} value={selectedWeek}>
            <SelectTrigger className="w-full border rounded bg-white p-2 text-left">
              <SelectValue
                placeholder={
                  selectedWeek === "all"
                    ? "Select All"
                    : availableWeeks.find((week) => week.original === selectedWeek)
                      ?.formatted || "Pilih minggu"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="select-all" value="all">
                Keseluruhan Trophy
              </SelectItem>
              {availableWeeks.map((week) => (
                <SelectItem key={week.original} value={week.original}>
                  {week.formatted}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
                  className={` font-medium hover:bg-primary/20 hover:text-white ${user.email === myself
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
