"use client";

export default function MapView({ mapUrl }: { mapUrl: string }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden mb-6 shadow-sm h-64 sm:h-110 md:h-146">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      ></iframe>
    </div>
  );
}
