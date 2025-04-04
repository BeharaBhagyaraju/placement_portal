import React, { useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Please enter your email");

    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/forgot-password", {
        email,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        const resetUrl = res.data.resetLink;
        //console.log(resetUrl);
        if (resetUrl) {
          const token = resetUrl.split("/").pop(); // extract token from URL
          navigate(`/reset-password/${token}`);
          
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="border rounded-md shadow-md p-6 w-full max-w-md space-y-4"
        >
          <h2 className="text-xl font-bold text-center">Forgot Password</h2>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Enter your email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
