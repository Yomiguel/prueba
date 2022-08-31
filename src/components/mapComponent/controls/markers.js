import L from "leaflet";

import "leaflet-marker-rotation/src/rotatedMarker";

export const dynamicMarker = (icono, coords, angle) => {
  return L.rotatedMarker(coords, {
    icon: icono,
    rotationOrigin: "center",
    rotationAngle: angle,
  });
};
