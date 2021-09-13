<template>
  <div>
    <div id="ol-map"></div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
import View from "ol/View";
import Map from "ol/Map";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import XYZ from "ol/source/XYZ";
import * as proj from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import VectorSource from "ol/source/Vector";
import Select from "ol/interaction/Select";
import Overlay from "ol/Overlay";

// import {Modify} from 'ol/interaction';

// Criação do ponto
const iconFeature = new Feature({
  geometry: new Point([-55.9, 0]),
  name: "Lugar Desconhecido",
  escola: "IFSP",
  alunos: 100,
});

// Aparência do ponto/pin
const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: "pixels",
    anchorYUnits: "pixels",
    src: require("../assets/marker3.png"),
  }),
});

// adicionando o estilo definido para o ponto/pin
iconFeature.setStyle(iconStyle);

// Criação do ponto
const iconFeature2 = new Feature({
  geometry: new Point([-57, -1]),
  name: "Lugar Desconhecido",
  population: 4000,
  rainfall: 500,
});

// Aparência do ponto/pin
const iconStyle2 = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: "pixels",
    anchorYUnits: "pixels",
    src: require("../assets/marker3.png"),
  }),
});

// adicionando o estilo definido para o ponto/pin
iconFeature2.setStyle(iconStyle2);

const vectorSource = new VectorSource({
  features: [iconFeature, iconFeature2],
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

// select interaction working on "click"
const selectClick = new Select();

// const modify = new Modify({
//   hitDetection: vectorLayer,
//   source: vectorSource,
// });

// const target = document.getElementById('ol-map');

// modify.on(['modifystart', 'modifyend'], function (evt) {
//   target.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
// });

export default {
  name: "MapContainer",
  components: {},
  props: {},
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    const container = document.getElementById("popup");
    const content = document.getElementById("popup-content");
    const closer = document.getElementById("popup-closer");

    // Pop-up para mostrar dados de um pino ao ser clicado
    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    this.map = new Map({
      target: "ol-map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "http://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
          }),
        }),
        vectorLayer,
      ],

      overlays: [overlay],

      view: new View({
        zoom: 6,
        projection: "EPSG:4326",
        center: proj.fromLonLat([-22.9, 0]),
        //center: [0, 0],
        constrainResolution: true,
      }),
    });

    // this.map.on('singleclick', function (evt) {
    //   const coordinate = evt.coordinate;
    //   //const hdms = toStringHDMS(toLonLat(coordinate));

    //   content.innerHTML = '<p>You clicked here:</p><code>' + coordinate + '</code>';
    //   overlay.setPosition(coordinate);
    // });
    //this.map.addInteraction(modify);

    this.map.addInteraction(selectClick);
    selectClick.on("select", (evt) => {
      // alert(`Escola: ${evt.selected[0].get('escola')} \nQtd alunos: ${evt.selected[0].get('alunos')}` +
      //       evt.selected[0].get('geometry').getCoordinates().toString())
      let coordinate = evt.selected[0].get("geometry").getCoordinates();
      content.innerHTML = `<p>Escola: ${evt.selected[0].get(
        "escola"
      )} \nQtd alunos: ${evt.selected[0].get("alunos")}</p>`;
      overlay.setPosition(coordinate);
      //console.log(evt);
    });
  },
};
</script>

<style>
#ol-map {
  width: 600px;
  height: 500px;
  border-radius: 4px;
}

.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>