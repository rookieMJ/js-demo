;(function(doc, win){
  var oImgList = doc.getElementsByClassName('J_imgList')[0],
      data = JSON.parse(doc.getElementById('J_data').innerHTML),
      imgTpl = doc.getElementById('J_imgTpl').innerHTML,
      oImgs = doc.getElementsByClassName('list-img');

  var init = function(){
    renderList(data);
    bindEvent();
    setTimeout(function(){
      window.scrollTo(0, 0);
    }, 150);
  }

  function renderList(data){
    var list = '';
    data.forEach(function(elem){
      list += imgTpl.replace(/{{(.*?)}}/g, function(node, key){
        return {
          img: elem.img,
          name: elem.name
        }[key];
      });
    });
    oImgList.innerHTML = list;
  }

  function bindEvent(){
    window.onload = window.onscroll = throttle(imgLazyLoad(oImgs), 400);
  }

  init();
})(document, window);

function imgLazyLoad(images) {
  var len = images.length,
      n = 0;
  return function() {
    var cHeight = document.documentElement.clientHeight,
        sTop = document.documentElement.scrollTop || document.body.scrollTop,
        imgItem;
    for (var i = n; i < len; i++) {
      imgItem = images[i];
      if (imgItem.offsetTop < cHeight + sTop) {
        imgItem.src = imgItem.getAttribute('data-src');
        imgItem.removeAttribute('data-src');
        n++;
      }
    }
  }
}
