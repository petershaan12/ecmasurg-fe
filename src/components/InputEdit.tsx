import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "../schema";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "@/redux/fetchUser";
import { useDispatch } from "react-redux";

const InputEdit = ({ user }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [errorImage, setErrorImage] = useState<string | undefined>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user.name || undefined,
      gender: user.gender || undefined,
      email: user.email,
      bio: user.biografi,
      phoneNumber: user.phone_number,
      dateOfBirth: user.dateof_birth,
      image: "",
      oldPassword: undefined,
      newPassword: undefined,
    },
  });
  const [isFileSizeValid, setIsFileSizeValid] = useState(true);
  const [facebook, setFacebook] = useState(user.facebook || "");
  const [instagram, setInstagram] = useState(user.instagram || "");
  const [youtube, setYoutube] = useState(user.youtube || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorImage("");
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (validTypes.includes(fileType)) {
        if (file.size <= 2048 * 1024) {
          setPreviewImage(URL.createObjectURL(file));
          form.setValue("image", e.target.files);
          setIsFileSizeValid(true);
        } else {
          setErrorImage("Image is more than 2MB");
          setIsFileSizeValid(false);
        }
      } else {
        setErrorImage("Only .png or .jpg files are accepted");
        setIsFileSizeValid(false);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof EditProfileSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);


    try {
      // Send a POST request to Laravel API using axios
      const apiUrl = process.env.REACT_PUBLIC_API_KEY;

      const formData = new FormData();
      if (data.name) formData.append("name", data.name);
      if (data.email) formData.append("email", data.email);
      if (data.gender) formData.append("gender", data.gender);
      if (data.bio) formData.append("biografi", data.bio);
      if (data.phoneNumber) formData.append("phone_number", data.phoneNumber);
      if (data.dateOfBirth) formData.append("dateof_birth", data.dateOfBirth);
      if (facebook) formData.append("facebook", facebook);
      if (instagram) formData.append("instagram", instagram);
      if (youtube) formData.append("youtube", youtube);

      formData.append("roles", "user");
      if (data.image) {
        formData.append("photo_profile", data.image[0]);
      }

      formData.append("_method", "PATCH");
      const response = await axios.post(
        `${apiUrl}/api/profile/update/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Profile updated successfully!");
        form.reset();
        dispatch(fetchUsers() as any);
        navigate("/profile");
      } else {
        setError(response.data.message || "Profile update failed");
      }
    } catch (err) {
      setError("An error occurred during profile update.");
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mb-12"
        >
          <div className="space-y-4 md:min-w-[500px] min-w-[250px] text-start">
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-5 ">
                      {previewImage ? (
                        <Avatar className="cursor-pointer w-28 h-28 md:w-[120px] md:h-[120px] mx-auto md:mx-0 mt-8">
                          <AvatarImage
                            src={previewImage}
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
                      ) : (
                        <Avatar className="cursor-pointer w-28 h-28 md:w-[120px] md:h-[120px] mx-auto md:mx-0 mt-8">
                          <AvatarImage
                            src={`${process.env.REACT_PUBLIC_API_KEY}/storage/profiles/${user.photo_profile}`}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-primary/80">
                            <p className="text-2xl font-bold uppercase text-white">
                              {user.name
                                ? user.name
                                    .split(" ")
                                    .map((name: string) => name.slice(0, 1))
                                    .join("")
                                : "AB"}
                            </p>
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <Input
                        disabled={isPending}
                        id="picture"
                        type="file"
                        className="bg-white w-full"
                        onChange={handleImageChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john doe"
                      type="text"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="pet**@gmail.com"
                      type="text"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isPending}
                    >
                      <SelectTrigger className=" bg-white">
                        <SelectValue placeholder="choose your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="08********"
                      type="number"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="Write something about yourself"
                      className="bg-white  rounded-md placeholder-white/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="date"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="text"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="text"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormItem>
              <FormLabel>Facebook Username</FormLabel>
              <FormControl>
                <Input
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  disabled={isPending}
                  placeholder="username"
                  type="text"
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Instagram Username</FormLabel>
              <FormControl>
                <Input
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  disabled={isPending}
                  placeholder="username"
                  type="text"
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Youtube URL</FormLabel>
              <FormControl>
                <Input
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  disabled={isPending}
                  placeholder="https://www.youtube.com/channel/UCd6h6zvzXo4vJ1ZJL1B9X8w"
                  type="text"
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormError message={errorImage} />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isPending || !isFileSizeValid}
              className="w-full text-white font-monument-regular "
            >
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default InputEdit;
