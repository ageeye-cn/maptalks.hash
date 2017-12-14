const map = new maptalks.Map('map', {
    center: [104,31],
    zoom: 5,
    attribution: {
        content: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    },
    baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a','b','c','d']
    })
})

const hash = new maptalks.Hash(map)