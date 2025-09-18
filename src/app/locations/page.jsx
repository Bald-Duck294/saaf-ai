"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

export default function LocationsPage() {
  return (
    <div className="container mx-auto p-4">
      <MapView />
    </div>
  );
}
