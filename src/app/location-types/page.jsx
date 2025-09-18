"use client";

import { useEffect, useState } from "react";
import locationTypesApi from "@/lib/api/locationTypesApi";
import TreeView from "./TreeView";

export default function LocationTypesPage() {
  const [types, setTypes] = useState([]);
  const [showTree, setShowTree] = useState(false);

  const fetchTypes = async () => {
    try {
      const data = await locationTypesApi.getAll();
      setTypes(data);
    } catch (err) {
      console.error("Failed to fetch location types", err);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  // Helper function to get parent name by parent_id
  const getParentName = (parentId) => {
    if (!parentId) return "—";
    const parent = types.find(type => type.id === parentId);
    return parent ? parent.name : "Unknown";
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">All Location Types</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowTree((prev) => !prev)}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            {showTree ? "Hide Hierarchy" : "View Hierarchy"}
          </button>

          <a
            href="/location-types/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add New Type
          </a>
        </div>
      </div>

      {/* Simple list of all location types */}
      <div className="overflow-x-auto border rounded mb-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Parent</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-600">{type.id}</td>
                <td className="px-4 py-2 font-medium">{type.name}</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {getParentName(type.parent_id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hierarchical tree view */}
      {showTree && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-2">Hierarchy View (Editable)</h3>
          <TreeView types={types} onUpdate={fetchTypes} flag={false}/>
        </div>
      )}
    </div>
  );
}
