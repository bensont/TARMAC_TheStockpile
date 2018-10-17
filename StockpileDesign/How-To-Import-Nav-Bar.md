***
# How to import the new and improved NavBar to your webpage!

The new NavBar is a standalone html file that can't be browsed by itself...  To get this element into a page you just follow some simple steps.  
***
## 1. Make sure you import the right files for everything!  
***
### Stylesheets  
Add these stylesheet imports to <head>
##### Bootstrap:  
```
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">  
```
##### FontAwesome (for the nice icons):  
```
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">  
```
##### Custom styling for components:

```
<link rel="stylesheet" href="navbar.css">  
```
***
### Scripts:  
Add these scripts in <head>
The script that does the actual loading is the loadDefault.js.  For now this file lives in the NavBar folder of StockpileDesign
Import this using a relative path:
##### loadDefault.js (use a relative path here depending on where your code lives in the repo):
```
<script src="loadDefault.js"></script>  
```
##### JQuery:
```
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>  
```
##### Popper (dropdowns are built using this 3rd-party library):
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>  
```
##### Bootstrap:
```
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"   integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>  
```
***
## 2. Get your nav bar
To actually get the NavBar to appear in your HTML file, all you have to do is make a div like so:
```
<div class="stockpile-navbar"></div>
```
The loadDefault.js will automatically update.
***
## 3. Navigate!
##### That's it! Thanks for reading  :)
***
