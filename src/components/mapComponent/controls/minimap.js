import "leaflet/dist/leaflet.css";
import "leaflet-minimap/dist/Control.MiniMap.min.css";
import "leaflet-minimap";
import L from "leaflet";

import { standard_osm_mm } from "../layers/control-layers";

export const minimap = new L.Control.MiniMap(standard_osm_mm, {
  toggleDisplay: true,
  position: "bottomleft",
});
