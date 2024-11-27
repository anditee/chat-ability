import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { dts } from "rollup-plugin-dts";

//NEW
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

import packageJson from "./package.json" assert { type: "json" };

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            // NEW
            typescript(),
            peerDepsExternal(),

            resolve(),
            commonjs(),

            // NEW
            terser(),
        ],
    },
    {
        input: 'dist/cjs/types/src/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
        external: [/\.css$/],
    },
]