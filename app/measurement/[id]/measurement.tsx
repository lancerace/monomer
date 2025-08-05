"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import type { Microplate } from "@prisma/client";
import { useAddMeasurement } from "./measurement.hooks";

interface MeasurementFormData {
  row: string;
  column: number;
  confluencyPercentage: number;
}

interface MeasurementFormProps {
  microplate: Microplate;
}

export default function MeasurementForm({ microplate }: MeasurementFormProps) {
  const { getters, actions } = useAddMeasurement(microplate.id);
  const { isSuccess, isPending, error } = getters;
  const { addMeasurement } = actions;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MeasurementFormData>();

  const onSubmit = async (data: MeasurementFormData) => {
    try {
      await addMeasurement({
        plateId: microplate.id,
        measurement: data,
      });

      reset();
    } catch (err) {
      // Error is handled by React Query and mutation state
      console.error("Failed to add measurement:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Add Measurement
            </h1>
            <h2 className="text-xl text-gray-600 mb-4">{microplate.name}</h2>
            <p className="text-gray-500">
              Record confluency percentage for a specific well
            </p>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Measurement added successfully! Redirecting...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    {error.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Measurement Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Row Selection */}
            <div>
              <label
                htmlFor="row"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Row
              </label>
              <select
                id="row"
                {...register("row", { required: "Row is required" })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select row</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
              {errors.row && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.row.message}
                </p>
              )}
            </div>

            {/* Column Selection */}
            <div>
              <label
                htmlFor="column"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Column
              </label>
              <select
                id="column"
                {...register("column", {
                  required: "Column is required",
                  valueAsNumber: true,
                })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select column</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              {errors.column && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.column.message}
                </p>
              )}
            </div>

            {/* Confluency Percentage */}
            <div>
              <label
                htmlFor="confluencyPercentage"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confluency Percentage
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="confluencyPercentage"
                  step="0.1"
                  min="0"
                  max="100"
                  {...register("confluencyPercentage", {
                    required: "Confluency percentage is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Confluency percentage must be at least 0",
                    },
                    max: {
                      value: 100,
                      message: "Confluency percentage must be at most 100",
                    },
                  })}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.0"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
              {errors.confluencyPercentage && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confluencyPercentage.message}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Enter the observed confluency percentage (0-100%)
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-between pt-6">
              <Link
                href={`/microplate/${microplate.id}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isPending || isSuccess}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Submitting..." : "Submit Measurement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
