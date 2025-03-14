"use client";

import Button from "@/components/Button";
import { regenerateToken } from "./actions";
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const RegenerateTokenButton = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await regenerateToken(userId);
    setLoading(false);
  };

  return (
    <Button className="px-2" disabled={loading} onClick={handleClick}>
      <ArrowPathIcon className="h-6 w-6" />
    </Button>
  );
};

export default RegenerateTokenButton;
