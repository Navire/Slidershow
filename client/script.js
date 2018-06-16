const renderSlider = (index, recommendation) => {
  let i = 0;
  for(let item of recommendation){
    div = $(`#${item.businessId}`);       
    div.attr('style', `display:none;`);        
    if (  (i>(index+3)) || (i<index) )
      div.attr('style', `display:none;`);
    else  
      div.attr('style', ``);
    i++;
  }
}

const createElements = (data) => {
  let img;
  let href;
  const limitText = 80;
  
  href = $(`<a href="${data.detailUrl}" target="_blank">`);
  href.appendTo(`#${data.businessId}`)

  img = $(`<img id="${data.businessId}" class="img-product">`);
  img.attr('src',`http:${data.imageName}`);
  img.appendTo(href)

  $(`#${data.businessId}`).append(`<p>${data.name.substring(0,limitText)} ${(data.name.length>limitText?'...':'')}</p>`);
  $(`#${data.businessId}`).append(`<p class="subcomment">Por: ${data.price}</p>`);
  $(`#${data.businessId}`).append(`<p class="subcomment"> ${data.productInfo.paymentConditions}</p>`);
}

$(document).ready( () => {
  $.get('/data', (res) => {
    const data = JSON.parse(res);
    //console.log(data);detailUrl
    const {reference, recommendation} = data.data;
    let img, div;
    let i = 0;
    let index=0;
    
    div = $(`<div id="${reference.item.businessId}" class="containerD">`);
    div.appendTo('#destaque')
    createElements(reference.item);

    for(let item of recommendation){
      div = $(`<div id="${item.businessId}" class="container">`);       
      div.appendTo('#recomendacoes')            
      if (  (i>(index+3)) || (i<index) )
        div.attr('style', `display:none;`);
      i++;
      createElements(item);
    }

    $("#next" ).click( () => {       
      if (!((index+5)>recommendation.length))
        index++;      
      renderSlider(index, recommendation);
    });

    $("#prev" ).click( () => {       
      if (((index-1)>=0))
        index--;
      renderSlider(index, recommendation);      
    });
  })
});
