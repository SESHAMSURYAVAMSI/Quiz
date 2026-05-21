"use client";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await signIn("credentials", {
        ...formData,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Login successful");

      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="border-white/10 bg-white/5 text-white"
      />

      <Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="border-white/10 bg-white/5 text-white"
      />

      <Button
        disabled={loading}
        className="w-full rounded-xl bg-white py-6 text-black hover:bg-gray-200"
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;