"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { EditStatus } from "@/app/actions/editStatus";

export default function StatusToggle({ consultation, userType }) {
  const [status, setStatus] = useState(consultation.status);
  const [isPending, startTransition] = useTransition();

  async function toggleStatus() {
    if (userType !== "DOCTOR") return;

    const newStatus = status === "COMPLETED" ? "PENDING" : "COMPLETED";
    setStatus(newStatus);

    startTransition(async () => {
      const result = await EditStatus(consultation.id, newStatus);
      if (!result.success) {
        alert("Failed to update status");
        setStatus(status); // Revert if error occurs
      }
    });
  }

  return (
    <Button
      variant={status === "COMPLETED" ? "success" : "destructive"}
      onClick={toggleStatus}
      disabled={isPending || userType !== "DOCTOR"}
    >
      {isPending ? "Updating..." : status}
    </Button>
  );
}
