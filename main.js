const API_KEY='live_JcUEyGccUMLYJ3Bn3IoCVEl4PBDodEyGSc4lu90HKcA4EYdK4KQuT0EgDZtRW4yq'
const BASE_URL = 'https://api.thecatapi.com/v1/'
const API_URL_RANDOM=`${BASE_URL}images/search?limit=2&api_key=${API_KEY}`
const API_URL_FAVORITES=`${BASE_URL}favourites?limit=2&api_key=${API_KEY}`

const $spanError = document.getElementById('error')

async function loadRandomCats() {
    const response = await fetch(API_URL_RANDOM)
    const data = await response.json()
    console.log('loadRandomCats', data)

    if (response.status !== 200 ) {
        $spanError.innerHTML = `Hubo un error ${response.status} ${data.message}`
    } else {
        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')

        img1.src = data[0].url
        img2.src = data[1].url
    }
}

async function loadFavoriteCats() {
    const response = await fetch(API_URL_FAVORITES)
    const data = await response.json()
    console.log('loadFavoritesCats', data)

    if (response.status !== 200 ) {
        $spanError.innerHTML = `Hubo un error ${response.status} ${data.message}`
    }
}

async function saveFavoriteCat() {
    const response = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: 'dje',
        }),
    })
    const data = await response.json()
    console.log('saveFavoriteCat', response)
    if (response.status !== 200 ) {
        $spanError.innerHTML = `Hubo un error ${response.status} ${data.message}`
    }
}

loadRandomCats()
loadFavoriteCats()
