import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SignupSchema } from "../../schema";

const SignupForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_PUBLIC_API_KEY}/api/register`,
        data
      );

      if (response.status === 200) {
        setSuccess("Signup successful!");
        navigate("/login");
        form.reset();
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred during Signup.");
      console.log(err);
    } finally {
      setIsPending(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="text-center flex flex-col items-center justify-center">
        <img src="/logo.svg" alt="logo" width={200} height={100} />
        <p>Welcome to Our EduMedSurg Website</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mt-12 w-full sm:w-[400px] mx-auto"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                      type="name"
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
                      placeholder="john.doe@example.com"
                      type="email"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*******"
                      type="password"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full text-white font-bold bg-[#002979]"
          >
            Sign In
          </Button>
        </form>
      </Form>
      <p className="text-sm mt-5">
        Already have an account?{" "}
        <Link className="text-primary " to="/login">
          Log in.
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
