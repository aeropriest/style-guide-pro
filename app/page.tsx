"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGenerateStyleGuide = () => {
    router.push("/style-guide");
  };

  const handleGenerateStyledText = () => {
    // Navigate to the styled-text page
    router.push("/styled-text");
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen p-24">
      <div className="flex justify-center space-x-4">
        <Button onClick={handleGenerateStyleGuide}>Generate Style Guide</Button>
        <Button onClick={handleGenerateStyledText}>Generate Styled Text</Button>
      </div>
    </main>
  );
}
