import {
  ICreateNewMedication,
  IDataMedication,
  IUpdateMedication,
  useCreateMedication,
  useDeleteMedication,
  useGetMedication,
  useUpdateMedication, // Hook para atualizar medicamento
} from "@/api/medication/hooks";
import { CardRemedio } from "../card-remedio/CardRemedio";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function MedicationList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<IUpdateMedication | null>(null);
  const [newMedication, setNewMedication] = useState<ICreateNewMedication>({
    nome: "",
    funcao: "",
    dosagem: "",
  });

  // Controle do modal de confirmação de exclusão
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [medicationToDelete, setMedicationToDelete] = useState<number | null>(
    null
  );

  // Hooks para criar, atualizar e obter medicamentos
  const {
    createMedication,
    loading: creating,
    error: createError,
  } = useCreateMedication();
  const { updateMedication } = useUpdateMedication();
  const {
    deleteMedication,
    loading: deleting,
    error: deleteError,
  } = useDeleteMedication();
  const { medications, refetch } = useGetMedication();

  // Lida com o botão de edição, abrindo o modal com os dados do medicamento
  const handleEdit = (medication: IDataMedication) => {
    setIsEditing(true);
    setSelectedMedication(medication);
    setNewMedication({
      nome: medication.nome,
      funcao: medication.funcao,
      dosagem: medication.dosagem,
    });
    setIsDialogOpen(true);
  };

  const openConfirmDelete = (id: number) => {
    setMedicationToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (medicationToDelete !== null) {
      await deleteMedication(medicationToDelete);
      refetch(); // Atualiza a lista de medicamentos após a exclusão
      setIsConfirmDeleteOpen(false); // Fecha o modal de confirmação
      setMedicationToDelete(null);
    }
  };

  const handleAddOrEditMedication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && selectedMedication) {
        // Atualiza o medicamento existente
        const updatedMedication: IUpdateMedication = {
          id: selectedMedication.id,
          nome: newMedication.nome,
          funcao: newMedication.funcao,
          dosagem: newMedication.dosagem,
        };
        await updateMedication(selectedMedication.id, updatedMedication);
      } else {
        // Cria um novo medicamento
        await createMedication(newMedication);
      }
      setIsDialogOpen(false);
      setNewMedication({ nome: "", funcao: "", dosagem: "" });
      refetch(); // Atualiza a lista de medicamentos
      setIsEditing(false);
    } catch (err) {
      console.error("Erro ao salvar medicamento:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Lista de Medicamentos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medications && Array.isArray(medications) && medications.length > 0 ? (
          medications.map((medication) => (
            <CardRemedio
              key={medication.id}
              nome={medication.nome}
              funcao={medication.funcao}
              dosagem={medication.dosagem}
              onEdit={() => handleEdit(medication)}
              onDelete={() => openConfirmDelete(medication.id)}
            />
          ))
        ) : (
          <p>Carregando medicamentos...</p>
        )}
      </div>

      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Tem certeza que deseja excluir este remédio?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              onClick={() => handleDelete()}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Deletar
            </Button>
            <Button
              onClick={() => setIsConfirmDeleteOpen(false)}
              variant="secondary"
            >
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Botão suspenso para adicionar novo medicamento */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            onClick={() => {
              setIsEditing(false);
              setNewMedication({ nome: "", funcao: "", dosagem: "" });
              setIsDialogOpen(true);
            }}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center group"
          >
            <Plus
              size={24}
              className="group-hover:mr-2 transition-all duration-300 ease-in-out"
            />
            <span className="w-0 overflow-hidden group-hover:w-auto transition-all duration-300 ease-in-out whitespace-nowrap">
              Adicionar novo medicamento
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Medicamento" : "Adicionar Novo Medicamento"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddOrEditMedication} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do Medicamento</Label>
              <Input
                id="name"
                value={newMedication.nome}
                onChange={(e) =>
                  setNewMedication({ ...newMedication, nome: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="function">Função</Label>
              <Input
                id="function"
                value={newMedication.funcao}
                onChange={(e) =>
                  setNewMedication({ ...newMedication, funcao: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="dosage">Dosagem</Label>
              <Input
                id="dosage"
                value={newMedication.dosagem}
                onChange={(e) =>
                  setNewMedication({
                    ...newMedication,
                    dosagem: e.target.value,
                  })
                }
                required
              />
            </div>
            {(createError || deleteError) && (
              <p className="text-red-500">{createError || deleteError}</p>
            )}
            <Button type="submit" disabled={creating}>
              {creating
                ? "Carregando..."
                : isEditing
                ? "Salvar Alterações"
                : "Adicionar Medicamento"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
