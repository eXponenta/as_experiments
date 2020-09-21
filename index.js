import {exports} from "./loader.js";

const buff = new Uint8Array([120, 218, 99, 96, 32, 15, 252, 135, 98, 122, 3, 176, 189, 48, 48, 80, 246, 82, 201, 254, 255, 196, 98, 92, 128, 4, 51, 8, 250, 133, 150, 96, 160, 236, 69, 15, 167, 129, 48, 123, 176, 248, 155, 152, 244, 133, 77, 61, 182, 180, 70, 170, 60, 181, 216, 196, 184, 147, 218, 246, 145, 18, 70, 244, 244, 43, 53, 236, 198, 22, 111, 132, 196, 136, 77, 15, 195, 37, 127, 15, 214, 178, 141, 220, 186, 132, 10, 24, 6, 0, 171, 53, 215, 97])
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
			Uint8Array_ID,
			__allocArray,
			__getArray,
			__retain,
			__release,
		} = exports;

        const Inflate = (buff, size) =>{
			const arr = __allocArray(Uint8Array_ID, buff);

			uploadBuffer(arr);

			const ret = __getArray(decodePart(0,buff.length,size));

			__release(arr);
            return ret;
        }

		console.log("In", buff);

		const res = Inflate(buff, size);
		const status = getStatus();
		const error = getErrorCode();

		console.log(res, status, error);
    })
