import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { HTTP } from '../../utils/http-common';
import * as turf from '@turf/turf'
import maplibregl from 'maplibre-gl'
import {TreeModel} from '../../utils/TreeModel';
import * as THREE from 'three'
import {ScenegraphLayer} from '@deck.gl/mesh-layers';
import {MapboxLayer} from '@deck.gl/mapbox';
import {Deck, MapView, OrthographicView} from '@deck.gl/core';


const getTreesOSM = {
    namespaced: true,
    state: {
        draw: null,
        ids: []
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
                    .then(response=>{
                        console.log(response.data)
                    })
                    
                }
                
            })

         
                    
        },
        
        retrieveTrees({state, rootState}){
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
                    state.ids.push(makeid(5))
                } 
                /*for (let i=0; i<response.data.features.length; i++){
                    rootState.map.map.addLayer(TreeModel(response.data.features[i].geometry.coordinates[0], response.data.features[i].geometry.coordinates[1],
                     state.ids[i]));
                }*/
                
                
                const myDeckLayer = new MapboxLayer({
                    id: 'hexagon2D',
                    type: ScenegraphLayer,
                    data: response.data.features,
                    pickable: true,
                    scenegraph: 'https://raw.githubusercontent.com/QSafariallahkheili/ligfinder_refactor/master/GenericNewTree.glb',
                    getPosition: f => f.geometry.coordinates,
                    getOrientation: d => [0, Math.random() * 180, 90],
                    sizeScale: 5,
                    _lighting: 'pbr'
                   
                });
                rootState.map.map.addLayer(myDeckLayer, "building-3d");
                

                

                

            })
        }
    },
    getters:{

    }

}

export default getTreesOSM