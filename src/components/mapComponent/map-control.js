import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.scss";
import {
  standard_osm,
  // 5.a. Cargar las capas repelon:predios y repelon:perimetro
  predios_catastro,
  perimetro,
} from "./layers/control-layers";
// 3.a. Agregar el minimapa
import { minimap } from "./controls/minimap";
// 3.b. Agregar otro plugin diferente
import { antPathPlugin } from "./controls/ant-path";
// 4. Añadir un marcador en el centro del mapa
import { dynamicMarker } from "./controls/markers";
import { imgIcon } from "./controls/icons/imgIcon";
import townhall from "../../assets/img/townhall.jpg";

export const map = L.map("map", {
  // 1. Localizar el mapa en el municipio de repelon
  center: [10.494864, -75.125319],
  // 2. Cambiar el mapa base y ajustar al centro de pantalla
  layers: [standard_osm],
  zoom: 16,
});

L.control.zoom({ position: "topright" }).addTo(map);

// scale control
new L.control.scale({ imperial: false }).addTo(map);

// 3.a. Agregar el minimapa
minimap.addTo(map);

// 3.b. Agregar otro plugin diferente
const path = antPathPlugin();
map.addLayer(path);

// 4. Añadir un marcador en el centro del mapa

const townHallIcon = imgIcon(townhall, 30);
const townHall = dynamicMarker(townHallIcon, [10.494864, -75.125319]);
townHall.addTo(map);

// 5.a. Cargar las capas repelon:predios y repelon:perimetro

predios_catastro.addTo(map);
perimetro.addTo(map);

// 5.b. Al dar click en un poligono se debe mostrar el codigo y el area
async function loadPolygons() {
  // Obtenemos los datos desde el geoservidor
  const result = await fetch(
    "http://34.73.64.218:8080/geoserver/repelon/ows?" +
      new URLSearchParams({
        service: "WFS",
        version: "1.0.0",
        request: "GetFeature",
        typeName: "repelon:rp_gc_predios_catastro",
        maxFeatures: 30000,
        outputFormat: "application/json",
      })
  );

  const data = await result.json();

  // Definimos un popup
  const popup = L.popup();

  function popUpInfo(mouseEvent) {
    const layer = mouseEvent.target;
    const { area, codigo } = layer.feature.properties;

    popup
      .setLatLng(mouseEvent.latlng)
      .setContent(
        `
        <b>Area:</b> ${area} m2
        <br>
        <b>Codigo:</b> ${codigo}
    `
      )
      .openOn(map);

    map.fitBounds(mouseEvent.target.getBounds());
  }

  function onEachFeature(_, layer) {
    layer.on({
      click: popUpInfo,
    });
  }

  const geojson = L.geoJson(data, {
    onEachFeature,
  });

  geojson.addTo(map);
}

loadPolygons();
