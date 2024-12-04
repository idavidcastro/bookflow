"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CustomAlertProps {
  title?: string;
  message: string;
  onConfirm: () => void;
}

export default function CustomAlert({
  title = "Alerta",
  message,
  onConfirm,
}: CustomAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleConfirm = () => {
    setIsVisible(false);
    onConfirm();
  };

  if (!isVisible) return null;

  return (
    <Alert className="max-w-md mx-auto mt-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <div className="mt-4 flex justify-end">
        <Button onClick={handleConfirm}>Confirmar</Button>
      </div>
    </Alert>
  );
}
