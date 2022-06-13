import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { HTTP } from '../../utils/http-common';

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
                    .post('get_trees', {
                        data : AOI
                    })
                    
                }
                
            })
                    
        }
    },
    getters:{

    }

}

export default getTreesOSM