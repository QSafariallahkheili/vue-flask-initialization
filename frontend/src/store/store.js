import { createStore } from "vuex";
import product from'./modules/product'
import map from './modules/map'
import getTreesOSM from './modules/getTreesOSM'

export default createStore({
    modules: {
      product,
      map,
      getTreesOSM
    }
})