"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { CompanyApi } from "@/lib/api/companyApi";
import { CompanyApi } from "@/lib/api/companyApi";
import toast, { Toaster } from "react-hot-toast";
import { Plus, Edit, Trash2, Building, Search } from "lucide-react";

// Skeleton Loader Component
const TableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="p-4"><div className="h-4 bg-slate-200 rounded"></div></td>
    <td className="p-4"><div className="h-4 bg-slate-200 rounded"></div></td>
    <td className="p-4"><div className="h-4 bg-slate-200 rounded"></div></td>
    <td className="p-4"><div className="h-8 bg-slate-200 rounded"></div></td>
  </tr>
);

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchCompanies = async () => {
    setIsLoading(true);
    const response = await CompanyApi.getAllCompanies();
    if (response.success) {
      setCompanies(response.data);
      setFilteredCompanies(response.data);
    } else {
      toast.error(response.error || "Failed to fetch companies.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    const results = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.contact_email && company.contact_email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCompanies(results);
  }, [searchTerm, companies]);


  const handleDelete = async (id) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold">Are you sure you want to delete this company?</p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              performDelete(id);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-200 rounded-md hover:bg-slate-300"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: 6000 });
  };

  const performDelete = async (id) => {
    const toastId = toast.loading("Deleting company...");
    const response = await CompanyApi.deleteCompany(id);
    if (response.success) {
      toast.success("Company deleted successfully!", { id: toastId });
      fetchCompanies(); // Refresh the list
    } else {
      toast.error(response.error || "Failed to delete company.", { id: toastId });
    }
  };


  return (
    <>
      <Toaster position="top-center" />
      <div className="p-4 sm:p-6 md:p-8 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-slate-800">Manage Companies</h1>
            </div>
            <Link href="/companies/add">
              <span className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 cursor-pointer">
                <Plus size={20} />
                Add Company
              </span>
            </Link>
          </div>

          {/* Search Bar */}
           <div className="mb-6 relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
             <input
               type="text"
               placeholder="Search by company name or email..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 text-md border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
             />
           </div>

          {/* Companies Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-slate-600">Company Name</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">Description</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">Contact Email</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)
                  ) : filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                      <tr key={company.id} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="p-4 font-semibold text-slate-800">{company.name}</td>
                        <td className="p-4 text-slate-600">{company.description || 'N/A'}</td>
                        <td className="p-4 text-slate-600">{company.contact_email || 'N/A'}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => router.push(`/companies/${company.id}/edit`)} className="p-2 text-sky-600 bg-sky-100 rounded-md hover:bg-sky-200 transition">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(company.id)} className="p-2 text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                     <tr>
                        <td colSpan="4" className="text-center py-16 text-slate-500">
                            <p className="font-semibold text-lg">No companies found</p>
                            <p>Click "Add Company" to get started.</p>
                        </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

