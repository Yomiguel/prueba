import L from "leaflet";

//BASEMAPS
export var standard_osm = L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  { attribution: "©OpenStreetMap, ©Standard", minZoom: 0, maxZoom: 24 }
);
export var standard_osm_mm = L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  { attribution: "©OpenStreetMap, ©Standard", minZoom: 0, maxZoom: 24 }
);

export var carto_light = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  { attribution: "©OpenStreetMap, ©CartoDB", subdomains: "abcd", maxZoom: 24 }
);

export var predios_catastro = L.tileLayer.wms(
  "http://34.73.64.218:8080/geoserver/repelon/wms",
  {
    layers: "repelon:rp_gc_predios_catastro",
    format: "image/png",
    transparent: true,
  }
);
export var perimetro = L.tileLayer.wms(
  "http://34.73.64.218:8080/geoserver/repelon/wms",
  {
    layers: "repelon:rp_u_perimetro",
    format: "image/png",
    transparent: true,
  }
);
