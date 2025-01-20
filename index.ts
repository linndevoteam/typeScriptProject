type ModelData = {
    id: string,
    object: string,
    owned_by: string
}
type ModelResponse = {
    data: ModelData[],
    object: string
}

async function fetchFunction() {
    let response = await fetch("https://small-pens-warn.loca.lt/v1/models");
    let data: ModelResponse = await response.json();
    
    console.log(data.data[0]);
}

fetchFunction();