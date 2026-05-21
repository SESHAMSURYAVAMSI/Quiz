"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

const RegisterForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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

      const res = await fetch("/api/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Account created successfully");

      router.push("/login");
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
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="border-white/10 bg-white/5 text-white"
      />

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
        {loading ? "Creating..." : "Create Account"}
      </Button>
    </form>
  );
};

export default RegisterForm;