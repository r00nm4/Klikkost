"use client";

import Link from "next/link";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  useMap
} from "react-leaflet";
import { useEffect } from "react";
import type { LatLngExpression } from "leaflet";
import type { Kost } from "@/types";
import { formatRupiah } from "@/utils/formatRupiah";

const campus: LatLngExpression = [-7.0505, 110.393];

interface InteractiveMapProps {
  kosts: Kost[];
  selectedId?: string;
  routeToSelected: boolean;
}

function FocusSelected({ kost }: { kost?: Kost }) {
  const map = useMap();

  useEffect(() => {
    if (kost) map.setView([kost.lat, kost.lng], 16, { animate: true });
  }, [kost, map]);

  return null;
}

export default function InteractiveMap({
  kosts,
  selectedId,
  routeToSelected
}: InteractiveMapProps) {
  const selected = kosts.find((kost) => kost.id === selectedId);
  const route: LatLngExpression[] = selected
    ? [campus, [selected.lat, selected.lng]]
    : [];

  return (
    <MapContainer
      center={campus}
      zoom={15}
      scrollWheelZoom
      className="h-full min-h-80 w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FocusSelected kost={selected} />
      <CircleMarker
        center={campus}
        radius={10}
        pathOptions={{ color: "#0A241B", fillColor: "#FACC15", fillOpacity: 1 }}
      >
        <Popup>
          <strong>Universitas Negeri Semarang</strong>
        </Popup>
      </CircleMarker>
      {routeToSelected && selected && (
        <Polyline
          positions={route}
          pathOptions={{ color: "#16A36A", dashArray: "8 8", weight: 5 }}
        />
      )}
      {kosts.map((kost) => (
        <CircleMarker
          key={kost.id}
          center={[kost.lat, kost.lng]}
          radius={selectedId === kost.id ? 10 : 8}
          pathOptions={{
            color: "#0A241B",
            fillColor: selectedId === kost.id ? "#FACC15" : "#4ADE9F",
            fillOpacity: 1
          }}
        >
          <Popup>
            <div className="min-w-40">
              <strong>{kost.nama}</strong>
              <p>
                {kost.jarakKampusM === null
                  ? "Jarak belum dicantumkan"
                  : `${kost.jarakKampusM} m dari UNNES`}
              </p>
              <p>{formatRupiah(kost.harga)}/bln</p>
              <Link href={`/kost/${kost.id}`}>Lihat detail kost</Link>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
