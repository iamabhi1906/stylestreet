"use client";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/'); 
    }
  };

  return (
    <Button startIcon={<ArrowBack />} onClick={()=>{handleBack()}}>
      Go to back
    </Button>
  );
}
