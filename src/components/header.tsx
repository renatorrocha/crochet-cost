import { ScissorsLineDashed } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="bg-gradient-to-br from-rose-500 to-pink-500 p-3 rounded-xl">
        <ScissorsLineDashed className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
        Calculadora de Orçamento
      </h1>
    </div>
  );
}
