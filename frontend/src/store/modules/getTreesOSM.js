import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { HTTP } from '../../utils/http-common';
import * as turf from '@turf/turf'
import maplibregl from 'maplibre-gl'
import {TreeModel} from '../../utils/TreeModel';
import * as THREE from 'three'


const getTreesOSM = {
    namespaced: true,
    state: {
        draw: null,
    },
    mutations:{

    },
    actions:{
        getGeomArea({state, rootState}){
            
            state.draw = new MapboxDraw({
                displayControlsDefault: false,
                controls: {
                    polygon: true,
                    trash: true
                },
                defaultMode: 'draw_polygon'
            });
            rootState.map.map.addControl(state.draw);
            console.log(state.draw)
            
            rootState.map.map.on('draw.create', function() {
                if(state.draw!==null){
                    let AOI = state.draw.getAll()
                    HTTP
                    .post('get-trees', {
                        data : AOI,
                        bbox: turf.bbox(AOI)
                    })
                    
                }
                
            })
                    
        },
        
        retrieveTrees({rootState}){
            HTTP
            .get('retrieve-trees')
            .then(response=>{
                console.log(response.data)
                const mapLayer = rootState.map.map.getLayer('tree');
                if(typeof mapLayer !== 'undefined'){
                    rootState.map.map.removeLayer('tree')
                    rootState.map.map.removeSource('tree')
                }
                rootState.map.map.addSource('tree',{'type': 'geojson', 'data': response.data});
                rootState.map.map.addLayer({
                    'id': 'tree',
                    'type': 'circle',
                    'source': 'tree',
                    'paint': {
                        'circle-color': '#00ff00'
                    }
                });
                function makeid(length) {
                    var result           = [];
                    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var charactersLength = characters.length;
                    for ( var i = 0; i < length; i++ ) {
                      result.push(characters.charAt(Math.floor(Math.random() * 
                      charactersLength)));
                    }
                    return result.join('');
                }
                console.log(response.data.features.length)
                
                //rootState.map.map.addLayer(TreeModel(obj[1].lng, obj[1].lat, makeid(5)));
                for (let i=0; i<response.data.features.length; i++){
                    rootState.map.map.addLayer(TreeModel(response.data.features[i].geometry.coordinates[0], response.data.features[i].geometry.coordinates[1],
                     makeid(5)));
                }
            })
        }
    },
    getters:{

    }

}

export default getTreesOSM