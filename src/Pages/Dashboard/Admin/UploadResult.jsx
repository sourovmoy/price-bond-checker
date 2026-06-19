import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiUpload, FiFileText } from "react-icons/fi";
import { AiOutlineLoading } from "react-icons/ai";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UploadResult = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post("/admin/upload-result", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setFile(null);
      setFileName("");

      // ✅ dashboard stats আবার fetch করবে যাতে won count update হয়
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "আপলোড ব্যর্থ হয়েছে!");
    },
  });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return toast.error("একটি PDF ফাইল সিলেক্ট করুন!");
    const formData = new FormData();
    formData.append("resultPdf", file);
    mutate(formData);
  };

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          ফলাফল আপলোড করুন
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          বিজয়ী বন্ড নম্বরের PDF আপলোড করুন
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="resultPdf"
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-10 cursor-pointer hover:border-[#244B43] hover:bg-gray-50 transition-all"
          >
            {fileName ? (
              <>
                <FiFileText className="text-3xl text-[#244B43]" />
                <p className="text-sm font-medium text-gray-700">{fileName}</p>
                <p className="text-xs text-gray-400">
                  পরিবর্তন করতে ক্লিক করুন
                </p>
              </>
            ) : (
              <>
                <FiUpload className="text-3xl text-gray-300" />
                <p className="text-sm text-gray-500">PDF ফাইল সিলেক্ট করুন</p>
                <p className="text-xs text-gray-400">শুধুমাত্র .pdf ফরম্যাট</p>
              </>
            )}
            <input
              id="resultPdf"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <button
            type="submit"
            disabled={isPending || !file}
            className="w-full font-semibold text-white py-2.5 rounded-xl transition-all shadow-md bg-gradient-to-br from-[#244B43] to-[#446E65] hover:brightness-110 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                প্রসেস হচ্ছে...
                <AiOutlineLoading className="animate-spin text-base" />
              </>
            ) : (
              "আপলোড করুন"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadResult;
