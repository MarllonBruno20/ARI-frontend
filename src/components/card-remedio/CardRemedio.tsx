import { Edit, Trash2 } from "lucide-react";

interface CardRemedioProps {
  nome: string;
  funcao: string;
  dosagem: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function CardRemedio({
  nome,
  funcao,
  dosagem,
  onEdit,
  onDelete,
}: CardRemedioProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{nome}</h3>
        <p className="text-sm text-gray-600">{funcao}</p>
      </div>
      <div>
        <h4 className="text-sm font-medium">Dosagem:</h4>
        <p className="text-sm">{dosagem}</p>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onEdit}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
        >
          <Edit size={20} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
