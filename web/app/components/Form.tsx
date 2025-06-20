"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { formSchema } from "@/app/schemas/formSchema";
import axios from "axios";

type AlertState = {
  type: "success" | "error";
  message: string;
} | null;

type ValidationErrors = {
  [key: string]: string;
};

function Alert({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  const isSuccess = type === "success";

  return (
    <div
      className={`w-full rounded-md border px-4 py-3 text-sm font-medium ${
        isSuccess
          ? "bg-green-100 border-green-300 text-green-700"
          : "bg-red-100 border-red-300 text-red-700"
      }`}
    >
      {message}
    </div>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;

  return <p className="text-sm text-red-600 mt-1">{error}</p>;
}

export default function Form() {
  const [selected, setSelected] = useState<"company" | "personal">("company");
  const [teamSize, setTeamSize] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [globalAlert, setGlobalAlert] = useState<AlertState>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalAlert(null);
    setErrors({});
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      formType: selected,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      ...(selected === "company" && {
        companyName: formData.get("companyName") as string,
        teamSize: teamSize,
      }),
      ...(selected === "personal" && {
        occupancy: occupancy,
      }),
    };

    const result = formSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: ValidationErrors = {};
      result.error.errors.forEach((error) => {
        const fieldName = error.path.join(".");
        fieldErrors[fieldName] = error.message;
      });

      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/waitlist`,
        result.data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setGlobalAlert({
        type: "success",
        message: "Successfully joined the waitlist!",
      });

      form.reset();
      setTeamSize("");
      setOccupancy("");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error || "Failed to connect to the server.";
      setGlobalAlert({ type: "error", message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTypeChange = (type: "company" | "personal") => {
    setSelected(type);
    const newErrors = { ...errors };
    if (type === "company") {
      delete newErrors.occupancy;
    } else {
      delete newErrors.companyName;
      delete newErrors.teamSize;
    }
    setErrors(newErrors);

    setTeamSize("");
    setOccupancy("");
  };

  return (
    <div className="max-w-md">
      <div className="mb-4">
        {globalAlert && (
          <Alert type={globalAlert.type} message={globalAlert.message} />
        )}
      </div>

      <div className="inline-flex rounded-md bg-gray-100 p-1 mb-6">
        <button
          onClick={() => handleTypeChange("company")}
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-md transition cursor-pointer ${
            selected === "company" ? "bg-green-700 text-white" : "text-gray-700"
          }`}
        >
          COMPANY
        </button>
        <button
          onClick={() => handleTypeChange("personal")}
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-md transition cursor-pointer ${
            selected === "personal"
              ? "bg-green-700 text-white"
              : "text-gray-700"
          }`}
        >
          PERSONAL
        </button>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            className={`py-5 ${errors.name ? "border-red-300" : ""}`}
            id="name"
            name="name"
            placeholder="Enter your name"
          />
          <FieldError error={errors.name} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            className={`py-5 ${errors.email ? "border-red-300" : ""}`}
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
          <FieldError error={errors.email} />
        </div>

        {selected === "company" && (
          <>
            <div className="space-y-1">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                className={`py-5 ${errors.companyName ? "border-red-300" : ""}`}
                id="companyName"
                name="companyName"
                placeholder="Your company name"
              />
              <FieldError error={errors.companyName} />
            </div>

            <div className="space-y-1">
              <Label>Team Size</Label>
              <Select onValueChange={setTeamSize} value={teamSize}>
                <SelectTrigger
                  className={`w-full py-5 ${
                    errors.teamSize ? "border-red-300" : ""
                  }`}
                >
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1–5</SelectItem>
                  <SelectItem value="6-10">6–10</SelectItem>
                  <SelectItem value="11-20">11–20</SelectItem>
                  <SelectItem value="21-50">21–50</SelectItem>
                  <SelectItem value="50+">50+</SelectItem>
                </SelectContent>
              </Select>
              <FieldError error={errors.teamSize} />
            </div>
          </>
        )}

        {selected === "personal" && (
          <div className="space-y-1">
            <Label>Occupancy</Label>
            <Select onValueChange={setOccupancy} value={occupancy}>
              <SelectTrigger
                className={`w-full py-5 ${
                  errors.occupancy ? "border-red-300" : ""
                }`}
              >
                <SelectValue placeholder="Select occupancy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="freelancer">Freelancer</SelectItem>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FieldError error={errors.occupancy} />
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-6 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "JOIN WAITLIST"}
        </Button>
      </form>
    </div>
  );
}
