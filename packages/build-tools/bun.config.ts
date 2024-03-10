await Bun.build({
    entrypoints: ['./index.ts'],
    outdir: './lib',
    splitting: true,
    minify: true,
    format: 'esm',
    naming: "build-tools.[ext]"
})