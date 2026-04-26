"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/atoms/Button";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="primary" className="w-full mt-4" isLoading={pending}>
      Continue
    </Button>
  );
}
