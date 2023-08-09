const forM = document.querySelector(".form")
let map, mapEvent;
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        async function(position) {
            const { latitude } = await position.coords;
            const { longitude } = await position.coords;
            const coords = [latitude, longitude]
             map = L.map('map').setView(coords, 13);
            
            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            map.on('click', function(mapE){
                mapEvent = mapE;
                forM.style.display = 'flex'
                console.log(mapEvent)
            })
        }
    )
}

forM.addEventListener('submit', function(){
    const {lat, lng} = mapEvent.latlng;
    L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
        L.popup({
            maxWidth: 200,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: "myPopup",
        })
        )
        .setPopupContent(`${lat}`)
    .openPopup();
})