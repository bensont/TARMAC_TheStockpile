


function addToQuantity(name){
    var str = localStorage.getItem('keyCartArray');
    var json_cart = JSON.parse(str);

    for (i in json_cart.items) {
      if(json_cart.items[i].vals[1] == name){
        json_cart.items[i].vals[3] += 1;
      }
    }

    formatted_send = JSON.stringify(json_cart);
    localStorage.setItem('keyCartArray', formatted_send);
  }

  function inCartAlready(name){
    if(localStorage.getItem('keyCartArray') == null || localStorage.getItem('keyCartArray') == "{\"items\":[]}"){
      return 0;
    }

    var str = localStorage.getItem('keyCartArray');
    var json_cart = JSON.parse(str);

    for (i in json_cart.items) {
      if(json_cart.items[i].vals[1] == name){
        return 1;
      }
    }
    return 0;
  }

  function formmatToJSON(old , str){
    if(localStorage.getItem('keyCartArray') == "{\"items\":[]}"){
      str = "{\"vals\":" + str + "}";
    }else{
      str = "{\"vals\":" + str + "},";
    }
    var ret = old.substring(0,10) + str + old.substring(10,old.length);
    return ret;
  }

  function parseJsonToLocalStorage(){
    var pic_src = document.querySelector('#main-image').src;
    var item_name = document.querySelector('#product-name-text').textContent;
    var item_price = document.querySelector('#product-price').textContent;
    if(inCartAlready(item_name) == 1){
        addToQuantity(item_name);
    }else{
      var send = [pic_src, item_name, item_price, 1];
      var oldstr = localStorage.getItem('keyCartArray');
      var formatted_send = formmatToJSON(oldstr,JSON.stringify(send));
      localStorage.setItem('keyCartArray', formatted_send);
    }
  }

  function createLocalStorageArray(){
    if(localStorage.getItem('keyCartArray') == null){
      var cartstr = "{\"items\":[]}";
      localStorage.setItem('keyCartArray',cartstr);
    }
  }


  function addToCart(){
    createLocalStorageArray();
    parseJsonToLocalStorage();
    alert("Added To Cart");
    console.log(localStorage.getItem('keyCartArray'));
  }
