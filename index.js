import {exports} from "./loader.js";

const buff = new Uint8Array([120, 218, 99, 96, 96, 248, 127, 116, 199, 130, 255, 12, 16, 240, 159, 9, 11, 128, 202, 49, 192, 184, 140, 80, 192, 128, 202, 133, 8, 32, 113, 193, 2, 88, 249, 32, 211, 80, 248, 3, 77, 163, 185, 7, 143, 251, 209, 253, 139, 17, 30, 24, 225, 133, 2, 0, 63, 119, 6, 159])
const size = 2108;

fetch("./build/untouched.wasm")
    .then((response) => response.arrayBuffer())
    .then((buff) => exports.instantiate(buff))
    .then(({exports})=>{
        const {
			uploadBuffer,
			decodePart,
			getStatus,
			getErrorCode,
			parseColorMapped,
			Uint8Array_ID,
			__getUint8ClampedArrayView,
			__allocArray,
			__getArray,
			__retain,
			__release,
		} = exports;

		const decodeImage = ({data, width, height, tableSize, hasAlpha}) => {
			const arr = __allocArray(Uint8Array_ID, data);
			const ptr = parseColorMapped(arr, width | 0, height | 0, tableSize | 0 , !!hasAlpha);

			return  __getUint8ClampedArrayView(ptr);
		}

        const Inflate = (buff, size) =>{
			const arr = __allocArray(Uint8Array_ID, buff);

			uploadBuffer(arr);

			const ret = __getArray(decodePart(0,buff.length,size));

			__release(arr);
            return ret;
        }

		console.log("In", buff);

		const res = decodeImage({
			data: buff,
			width: 16,
			height: 22,
			hasAlpha: true,
			tableSize:3
		});

		console.log(res);
    })
