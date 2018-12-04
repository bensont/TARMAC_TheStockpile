
function addToQuantity(id){
      var str = localStorage.getItem('keyCartArray');
      var json_cart = JSON.parse(str);

      for (i in json_cart) {
        if(json_cart[i][4] == id){
          json_cart[i][3] += 1;
          break;
        }
      }

      formatted_send = JSON.stringify(json_cart);
      localStorage.setItem('keyCartArray', formatted_send);
    }

    function inCartAlready(id){
      var str = localStorage.getItem('keyCartArray');
      var json_cart = JSON.parse(str);

      for (i in json_cart) {
        if(json_cart[i][4] == id){
          return true;
        }
      }
      return false;
    }

    function parseJsonToLocalStorage(passed_id){
      var pic_src = document.querySelector('#main-image').src;
      var item_name = document.querySelector('#product-name-text').textContent;
      var item_price = document.querySelector('#product-price').textContent;
      var item_id = passed_id;
      if(inCartAlready(item_id)){
          addToQuantity(item_id);
      }else{
        var json_cart_string = localStorage.getItem('keyCartArray');
        var json_cart = JSON.parse(json_cart_string);
        json_cart["id_" + item_id] = [pic_src, item_name, item_price, 1, item_id];
        var formatted_send = JSON.stringify(json_cart);
        localStorage.setItem('keyCartArray', formatted_send);
      }
    }

    function createLocalStorageArray(){
      if(localStorage.getItem('keyCartArray') == null){
        var empty_json = {};
        var empty_cart_string = JSON.stringify(empty_json);
        localStorage.setItem('keyCartArray',empty_cart_string);
      }
    }


    function addToCart(passed_id){
      createLocalStorageArray();
      parseJsonToLocalStorage(passed_id);
      alert("Added To Cart");
      console.log(localStorage.getItem('keyCartArray'));
    }
