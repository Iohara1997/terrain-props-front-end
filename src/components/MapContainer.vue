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
const httpClient = require("../http/http-client.js");
import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';
import {defaults as defaultControls} from 'ol/control';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';

// import {Modify} from 'ol/interaction';

const rome = new Feature({
  geometry: new Point(fromLonLat([12.5, 41.9])),
});

const london = new Feature({
  geometry: new Point(fromLonLat([-0.12755, 51.507222])),
});

const madrid = new Feature({
  geometry: new Point(fromLonLat([-3.683333, 40.4])),
});
const paris = new Feature({
  geometry: new Point(fromLonLat([2.353, 48.8566])),
});
const berlin = new Feature({
  geometry: new Point(fromLonLat([13.3884, 52.5169])),
});

rome.setStyle(
  new Style({
    image: new Icon({
      color: '#BADA55',
      crossOrigin: 'anonymous',
      // For Internet Explorer 11
      imgSize: [20, 20],
      src: 'data/square.svg',
    }),
  })
);

london.setStyle(
  new Style({
    image: new Icon({
      color: 'rgba(255, 0, 0, .5)',
      crossOrigin: 'anonymous',
      src: 'data/bigdot.png',
      scale: 0.2,
    }),
  })
);

madrid.setStyle(
  new Style({
    image: new Icon({
      crossOrigin: 'anonymous',
      src: 'data/bigdot.png',
      scale: 0.2,
    }),
  })
);

paris.setStyle(
  new Style({
    image: new Icon({
      color: '#8959A8',
      crossOrigin: 'anonymous',
      // For Internet Explorer 11
      imgSize: [20, 20],
      src: 'data/dot.svg',
    }),
  })
);

berlin.setStyle(
  new Style({
    image: new Icon({
      crossOrigin: 'anonymous',
      // For Internet Explorer 11
      imgSize: [20, 20],
      src: 'data/dot.svg',
    }),
  })
);
const vectorSource = new VectorSource({
  features: [rome, london, madrid, paris, berlin],
});

const center = this.map.getView().getCenter();
console.log(center);
const feature = new Feature(new Point([0,0]));
const pinLayer = new VectorLayer ({
  source: new VectorSource ({
    features: [feature]
  }),
  style: new Style ({
    image: new Icon({
      src: require('@/assets/marker3.png')
    })
  })
});

this.map.addLayer(pinLayer);

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

// select interaction working on "click"
const selectClick = new Select();

const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
});

export default {
  name: "MapContainer",
  components: {},
  data() {
    return {
      map: null
    }
  },
  props: {},
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
      controls: defaultControls().extend([mousePositionControl]),
      target: "ol-map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "http://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
          }),
        }),
        vectorLayer,
        new TileLayer({
          source: new OSM(),
         }),
      ],
      overlays: [overlay],
      view: new View({
        zoom: 6,
        projection: "EPSG:4326",
        center: proj.fromLonLat([-22.9, 0])
      }),
    });

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
    this.map.on('singleclick', (e) => {
      const coordinates = e.coordinate;
      httpClient.sendMapInfo({lat: coordinates[1], lon: coordinates[0]}); 
    });
  },
};

</script>

<style scoped>
  #ol-map {
    width: 100%;
    height: 500px;
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