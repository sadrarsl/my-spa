import React from "react";
import { Box } from "@mui/material";

/**
 * Map component renders an embedded Google Map for a given address.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.address - The address to display on the map.
 * @returns {JSX.Element} The rendered Map component.
 */
const Map: React.FC<{ address: string }> = ({ address }) => {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <Box>
      <iframe
        src={mapUrl}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="map"
      ></iframe>
    </Box>
  );
};

export default Map;
