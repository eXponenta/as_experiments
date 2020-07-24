import {exports} from "./loader.js";
import FF_JS from "./way4";

let FF_WASM = (...args) => {};


fetch("./build/optimized.wasm")
    .then((response) => response.arrayBuffer())
    .then((buff) => exports.instantiate(buff))
    .then(({exports})=>{
        const {floodFill, Uint32Array_ID, __allocArray, __getArray, __retain, __release} = exports;
        let res = [];
        FF_WASM = (x, y, c, w, h, buff) =>{
            const arr = __retain(__allocArray(Uint32Array_ID, buff));
            floodFill(x,y,c,w,h,arr);
            //const ret = __getArray(arr);
            __release(arr);
            return [];
        }

        function test(func) { 
            const buff = new Array(100 * 100).fill(0);
            const start = performance.now();
            const out = func(0,0, 0xff00ffff, 100, 100, buff);
            const end = performance.now() - start;

            console.log(end, func.name);
            res.push(out);
        }

        for(let i = 0; i < 100; i ++) {
            test(FF_WASM);
            test(FF_JS);
        }

    })
