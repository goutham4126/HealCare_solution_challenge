"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CgNotes } from "react-icons/cg";
import { useRouter } from "next/navigation";
import * as actions from "@/app/actions/editConsultation";

export default function EditPrescriptionDialog({ consultation, userType }) {
  const [open, setOpen] = useState(false);
  const [prescription, setPrescription] = useState(consultation.prescription || "");
  const router = useRouter();

  async function handleSave() {
    await actions.EditConsultation({ id: consultation.id, prescription });
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <CgNotes className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-6 space-y-4 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Edit Prescription</DialogTitle>
          </DialogHeader>

          {userType === "DOCTOR" ? (
            <textarea
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter prescription..."
            />
          ) : (
            <div className="p-3 border rounded-md bg-gray-100 text-sm">
              {prescription === "" ? "No prescription available" : prescription}
            </div>
          )}

          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            {userType === "DOCTOR" && <Button onClick={handleSave}>Save</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
