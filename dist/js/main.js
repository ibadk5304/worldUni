(function(){ 
  
  let spinbody = getspinner();
  spinbody.spin(document.getElementById('spin'));

  var url ="https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";
  fetch(url)
  .then(response =>response.json())
  .then((data)=>{
    
    
      var realData= data;
      console.log(realData);
      var countries =[];
      var universities=[];
     
     
      var isCountryClick=false;
      $("#resetUni").click(()=>{showAllUniversities(realData)});

      var totalWorldUniversities=0;


      // var newArray = [1,2,3,4,5].map(function(number){
      //   return number + 1
      // })

      data.forEach(function(currentValue){          
          totalWorldUniversities++;
          var same = countries.some(myFunction);
          function myFunction(value) {return value == currentValue.country;}
          if(same == false){countries.push(currentValue.country)}


          //return something new for the new array
          //return something;

      })

      //Call all functions
      showCountries(countries,realData);
      showAllUniversities(realData);
      showUniversityByCountry(realData);

      function showCountries(countries,realData){
        countries.sort();
        for(let i=0;i<countries.length;i++){
        $("#myDropdown").append(`<a id="country${i}" class="country">${countries[i]}</a>`);
        //(function(count){
         
        }
      }        

      
      function showAllUniversities(data)
      {
        $("#uniNumberWorld").empty();
        $("#Universities").empty(); 
        $("#uniNumberCountry").empty();
        $("#flag").empty();
        var countUni=0;
        data.map(function(currentValue){
          countUni++;
          $("#Universities").append("<p class='uni' data-toggle='tooltip' data-placement='top' title='"+currentValue.country+"'><a href='"+currentValue.web_pages[0]+"' target='_blank' >"+currentValue.name+"</a></p>");
        })
        $("#uniNumberWorld").append(countUni);
        topTenUniversity();
        KUTE.fromTo(
          '#stats', // element
          {translateX:1000, rotateX:0, rotateY:0, rotateZ:0}, // from
          {translateX:0, rotateX:0, rotateY:0, rotateZ:0}, // to
          {perspective:400, perspectiveOrigin: 'center top'} // transform options
        ).start();

      }

      function showUniversityByCountry(d) {
        for(let i=0;i<countries.length;i++){
          $(`#country${i}`).click(function()
          {                  
              $("#Universities").empty(); 
              $("#uniNumberCountry").empty();
              var b =this.text;
              var countUni=0;     
              
              
              var newArray = [1,2,3,4,5].filter(function(number){
                return number % 2 == 0; //true or false
              })

              d.forEach(function(currentValue){if(currentValue.country == b){
                countUni++;
                $("#Universities").append("<p class='uni'><a href='"+currentValue.web_pages[0]+"' target='_blank' >"+currentValue.name+"</a></p>");
              }});
              var percentage = ((countUni/totalWorldUniversities)*100).toFixed(2);
              $("#uniNumberCountry").append("<h1>Country Name: "+b+"</h1>");
              $("#uniNumberCountry").append("<h4>Number of University: "+countUni+"</h4>");
              $("#uniNumberCountry").append("<h4>World Percentage in number: "+percentage+"%</h4>");
              showFlag(b); 
              $("#topTen").empty();
              kuteAnimation("stats");
          });
        }
        
      }
      function showFlag(currentCountry){        
        var imgplace = document.getElementById('flag');
        var x = document.createElement("IMG");
        imgplace.innerHTML =  x.setAttribute("src","flags/"+currentCountry+".png");
        imgplace.innerHTML = `<img src="flags/${currentCountry}.png" />`;
      }
      

      // number of university exist in each country       *******************************************
      function topTenUniversity()
      {
        var uniNumberEachCountryArray = [];                          
        var topTenArray=[];
        var topTenNumbers=[];

        // var uniNumberEachCountryArray = data.filter(function(item){
        //   return item.country == countries[i]
        // })

        for(var i=0;i<countries.length; i++){
          var count = 0;
          data.forEach(function(currentValue){
            if(currentValue.country == countries[i]){
              count++;
            }
          })
          uniNumberEachCountryArray.push([countries[i],count]);
        }        
        uniNumberEachCountryArray.sort(sortFunction);
        function sortFunction(a, b) {
          if (a[1] === b[1]) {return 0;}
          else {return ( a[1] < b[1]) ? -1 : 1; }
        }
        for(var i=uniNumberEachCountryArray.length-1; i>=uniNumberEachCountryArray.length-11;i--)
        {topTenArray.push(uniNumberEachCountryArray[i]);}
        console.log(topTenArray);
        var topTen = "<h3>Top ten Countries</h3>";

        for(var i=0;i<topTenArray.length;i++)
        {
          topTen += `<p>${topTenArray[i][0]}:${topTenArray[i][1]}</p>`
        }
        $("#topTen").empty();
        $("#topTen").append(topTen);
        spinbody.stop();
      }
      
      function kuteAnimation(divName)
      {
        KUTE.fromTo(
          '#'+divName, // element
          {translateX:1000, rotateX:0, rotateY:0, rotateZ:0}, // from
          {translateX:-10, rotateX:0, rotateY:-10, rotateZ:0}, // to
          {perspective:400, perspectiveOrigin: 'center top'} // transform options
        ).start();
      }
     
      

  })
  

  $("#myInput").keyup(()=>{filterFunction("myInput","myDropdown","country")});
  $("#uniInput").keyup(()=>{filterFunction("uniInput","myDiv","uni")});
  

  function filterFunction(myInput,myDropdown,className) {
    var input, filter, a;
    input = document.getElementById(myInput);
    filter = input.value.toUpperCase();
    div = document.getElementById(myDropdown);
    a = div.getElementsByClassName(className);
    for (var i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
        console.log(a[i]);
    } else {
        a[i].style.display = "none";
        
    }
    }
  }

  function getspinner(){
    var opts = {
    lines: 13, // The number of lines to draw
    length: 38, // The length of each line
    width: 17, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#000000', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-shrink', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    //fadeColor: transparent,
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'absolute' // Element positioning
  }

  let spinner = new Spin.Spinner(opts);
  return spinner;
}

       
})()

