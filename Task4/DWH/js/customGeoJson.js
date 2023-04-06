import map from './3Dmodel.js'
console.log(map)



// 请求geojson
var custom = null;
$.ajax({
    url: './data/custom.geojson',
    method: 'GET',
    dataType: 'json',
    success:(response)=>{
        custom = response
        console.log("part buildings", custom)
    },
    error:(error)=>{
        console.log(error);
    }
});

