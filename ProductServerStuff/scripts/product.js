


function addToQuantity(id){
    var str = localStorage.getItem('keyCartArray');
    var json_cart = JSON.parse(str);

    for (i in json_cart.items) {
      if(json_cart.items[i].vals[4] == id){
        json_cart.items[i].vals[3] += 1;
      }
    }

    formatted_send = JSON.stringify(json_cart);
    localStorage.setItem('keyCartArray', formatted_send);
  }

  function inCartAlready(id){
    if(localStorage.getItem('keyCartArray') == null || localStorage.getItem('keyCartArray') == "{\"items\":[]}"){
      return 0;
    }

    var str = localStorage.getItem('keyCartArray');
    var json_cart = JSON.parse(str);

    for (i in json_cart.items) {
      if(json_cart.items[i].vals[4] == id){
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

  function parseJsonToLocalStorage(passed_id){
    var pic_src = document.querySelector('#main-image').src;
    var item_name = document.querySelector('#product-name-text').textContent;
    var item_price = document.querySelector('#product-price').textContent;
    var item_id = passed_id;
    if(inCartAlready(item_id) == 1){
        addToQuantity(item_id);
    }else{
      var send = [pic_src, item_name, item_price, 1, item_id];
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


  function addToCart(passed_id){
    createLocalStorageArray();
    parseJsonToLocalStorage(passed_id);
    alert("Added To Cart");
    console.log(localStorage.getItem('keyCartArray'));
  }
