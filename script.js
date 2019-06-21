(function(){
    let store;
    let start;
    let remaining;
    
      //load all breeds
      function loadBreeds(){
          $.ajax({
              url:'https://dog.ceo/api/breeds/list/all',
              method:'GET',
              success:function(response){
                  let messageJSON= response.message;
                  let array=Object.keys(messageJSON);
                  //Object.keys('obj name) brings all keys amongst key-value pairs of an obj
    
                  //Using them in Auto-complete
                  $( "#tags" ).autocomplete({
                    source: array
                  });
              }
          }).fail(function(){
                alert('error! check ur internet');
          });
      }
    
      loadBreeds();
    
    //display images.
    function displayImages(array){
        var x;
        if(array.length<=20){
            x=array.length;
            start=array.length;
            remaining=0;
        }else{
            x=20;
            start=x;
            remaining=array.length-x;
        }
        for (var i=0;i<x;i++){
            //creating img tag with these properties.
            $('<img>',{
                // height:'300px',
                // width:'300px',
                src:array[i],
                class:'dog-img'
            }).insertBefore('#main #more');
        }
    }
    
    //clear images
    function clearImages(){
        start=0;
        remaining=0;
    $('.dog-img').remove();   //this remove the selected query , so all img hv this class
    //so they will be removed.
    }
    
    
      //get all images of a breed
      function loadImages(breedType){
        let str="https://dog.ceo/api/breed/";
        str=str+breedType+"/images";
        
        $.ajax({ 
            url:str,
            method:'GET',
            success:function(response){
                let array=response.message;
                displayImages(array);
                store=array;
    
            }
          }).fail(function(){
            alert('error! check ur internet');
          });
          
      }
    
      //on search event
      $('#submit-button').on('click',function(){
          //clearing the old images before calling the new.
          clearImages();
    
        let breedType=$('#tags').val();
        loadImages(breedType);
        
        
        $('#tags').val('');
        //it should also clear/reset the input field.
      });
      
    
      //load more
      function loadmore(){
          if(remaining!=0){
              if(remaining<=20){
                  for (var i=start;i<start+remaining;i++){
                    $('<img>',{
                        // height:'300px',
                        // width:'300px',
                        src:store[i],
                        class:'dog-img'
                    }).insertBefore('#main #more');
                  }
                  start+=remaining;
                  remaining=0;
              }else{
                for (var i=start;i<start+20;i++){
                    $('<img>',{
                        // height:'300px',
                        // width:'300px',
                        src:store[i],
                        class:'dog-img'
                    }).insertBefore('#main #more');
                }
                start+=20;
                remaining-=20;
              }
          }
      }
    $('#more').on('click',loadmore);
})();



