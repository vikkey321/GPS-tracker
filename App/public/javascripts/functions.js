let data;
function getnotedata() {
    var notenumber = document.getElementById('notenumber').value
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/getdata/"+notenumber,
        "method": "GET",
        "headers": {
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        data = response;
        if(data.length != []){
            let newtab = "";
            let serialno = 1;
            for(let i=(data.length)-1;i>=0;i--)
            {
                newtab = newtab + `<tr>
                    <td> `+serialno+`</td>
                    <td> `+data[i].notenumber+`</td>
                    <td> `+data[i].latitude+`</td>
                    <td> `+data[i].longitude+`</td>
                    <td> `+moment(data[i].lastupdate).format("MM/DD/YYYY h:mm:ss a")+`</td>
                    <td> <button type="button" class="btn btn-primary" id="`+i+`" onclick="updatelocation(this.id)">View</button></td>
                    </tr>`;

                serialno++;
            } 
            $("table").find('tbody').html("");
            $("table").find('tbody').append(newtab);
            // console.log("Lat : "+data[(data.length)-1].latitude + "  |  Lon : "+data[(data.length)-1].longitude)
            updatemap(data[(data.length)-1].latitude, data[(data.length)-1].longitude)

        }
        else
        {
                $("table").find('tbody').html("");
                $('#myAlert').show();
        }
      });
}

function updatemap(lat,long){
  var myLatlng = new google.maps.LatLng(lat,long);
  var mapOptions = {
    zoom: 4,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      title:"Note Number"
  });
  marker.setMap(map);
}

function updatelocation(click_id){
  updatemap(data[click_id].latitude, data[click_id].longitude);
}