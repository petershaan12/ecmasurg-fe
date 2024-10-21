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
import { LoginSchema } from "../../schema";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_PUBLIC_API_KEY}/api/login`,
        data
      );

      if (response.status === 200) {
        const token = response.data.token; // Adjust based on your API response
        localStorage.setItem("token", token);
        setSuccess("Login successful!");
        navigate("/"); // Redirect to homepage
        form.reset();
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during Login.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="text-center flex flex-col items-center justify-center">
        <img src="/logo.svg" alt="logo" width={200} height={100} />
        <p>Sign in to your account</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mt-12 w-full sm:w-[400px] mx-auto"
        >
          <div className="space-y-4">
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
        Not registered?{" "}
        <Link className="text-primary " to="/signup">
          Sign up for free.
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
