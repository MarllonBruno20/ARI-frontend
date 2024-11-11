import { MainLayout } from "@/components/main-layout/MainLayout";
import MedicationList from "@/components/medication-list/MedicationList";

export function MedicationPage() {
  return (
    <MainLayout>
      <MedicationList />
    </MainLayout>
  );
}
