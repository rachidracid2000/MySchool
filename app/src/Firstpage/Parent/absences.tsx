// Absences.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";



export default function AbsencesEntry() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/src/Firstpage/Parent/enfantsselectioné"); // redirige vers la sélection d’enfants
  }, []);

  return null;
}
