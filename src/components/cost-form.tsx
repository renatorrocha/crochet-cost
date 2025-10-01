"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator, Plus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

const CostSchema = z.object({
  hourlyRate: z.number().min(1, "Valor deve ser maior que 0"),
  yarns: z.array(
    z.object({
      usagePercent: z
        .number()
        .min(0, "Deve ser maior que 0")
        .max(100, "Deve estar entre 0 e 100"),
      price: z.number().min(1, "Preço deve ser maior que 0"),
    }),
  ),
  hoursWorked: z.number().min(1, "Horas devem ser maior que 0"),
  profitMargin: z.number().min(0).max(100, "Deve estar entre 0 e 100"),
});

type CostSchemaType = z.infer<typeof CostSchema>;

export default function CostForm({
  setResult,
}: {
  setResult: (result: number) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CostSchemaType>({
    resolver: zodResolver(CostSchema),
    defaultValues: {
      hourlyRate: 0,
      yarns: [{ usagePercent: 100, price: 0 }],
      hoursWorked: 0,
      profitMargin: 0,
    },
  });

  function onSubmit(data: CostSchemaType) {
    const totalYarnCost = data.yarns.reduce((sum, yarn) => {
      return sum + (yarn.price * yarn.usagePercent) / 100;
    }, 0);

    const laborCost = data.hoursWorked * data.hourlyRate;
    const totalCost = totalYarnCost + laborCost;
    const finalPrice = totalCost * (1 + data.profitMargin / 100);

    setResult(finalPrice);
  }

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "yarns",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="hourlyRate"
          >
            Valor Hora/Trabalho (R$)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("hourlyRate", { valueAsNumber: true })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all outline-none"
            placeholder="0.00"
          />
          {errors.hourlyRate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.hourlyRate.message}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="hoursWorked"
          >
            Horas Trabalhadas
          </label>
          <input
            type="number"
            step="0.5"
            {...register("hoursWorked", { valueAsNumber: true })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all outline-none"
            placeholder="0"
          />
          {errors.hoursWorked && (
            <p className="text-red-500 text-sm mt-1">
              {errors.hoursWorked.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label
            className="block text-sm font-semibold text-gray-700"
            htmlFor="yarns"
          >
            Linhas/Novelos Utilizados
          </label>
          <button
            type="button"
            onClick={() => append({ price: 0, usagePercent: 100 })}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar Novelo
          </button>
        </div>

        {errors.yarns && typeof errors.yarns.message === "string" && (
          <p className="text-red-500 text-sm">{errors.yarns.message}</p>
        )}

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 space-y-4"
            >
              <div className="flex items-center justify-between mb-3">
                <label
                  className="text-sm font-semibold text-gray-700"
                  htmlFor={`yarns.${index}.price`}
                >
                  Novelo {index + 1}
                </label>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                    aria-label="Remover novelo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-600 mb-2"
                    htmlFor={`yarns.${index}.price`}
                  >
                    Preço do Novelo (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(`yarns.${index}.price`, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all outline-none bg-white"
                    placeholder="0.00"
                  />
                  {errors.yarns?.[index]?.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.yarns[index]?.price?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-600 mb-2"
                    htmlFor={`yarns.${index}.usagePercent`}
                  >
                    % Utilizada
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="1"
                      {...register(`yarns.${index}.usagePercent`, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-4 py-2.5 pr-10 border-2 border-gray-200 rounded-lg focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all outline-none bg-white"
                      placeholder="100"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      %
                    </span>
                  </div>
                  {errors.yarns?.[index]?.usagePercent && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.yarns[index]?.usagePercent?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-semibold text-gray-700 mb-2"
          htmlFor="profitMargin"
        >
          Margem de Lucro (%)
        </label>
        <input
          type="number"
          step="1"
          {...register("profitMargin", { valueAsNumber: true })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all outline-none"
          placeholder="0"
        />
        {errors.profitMargin && (
          <p className="text-red-500 text-sm mt-1">
            {errors.profitMargin.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold py-4 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        <Calculator className="w-5 h-5" />
        Calcular Orçamento
      </button>
    </form>
  );
}
