"use client";

import { useState } from "react";
import CostForm from "@/components/cost-form";
import Header from "@/components/header";

export default function crochetCost() {
  const [result, setResult] = useState<number | null>(null);

  return (
    <div className="max-w-5xl w-full mx-auto flex flex-col gap-6 justify-between py-6 relative flex-1">
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
            <Header />

            <CostForm setResult={setResult} />

            {result !== null && (
              <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <p className="text-sm font-medium text-center text-gray-600 mb-2">
                  Valor Total do Projeto
                </p>
                <p className="text-4xl font-bold text-green-700 text-center">
                  R$ {result.toFixed(2).replace(".", ",")}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
