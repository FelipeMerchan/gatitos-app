const API_KEY='live_JcUEyGccUMLYJ3Bn3IoCVEl4PBDodEyGSc4lu90HKcA4EYdK4KQuT0EgDZtRW4yq'
const BASE_URL = 'https://api.thecatapi.com/v1/'
const API_URL_RANDOM =`${BASE_URL}images/search?limit=2`
const API_URL_FAVORITES =`${BASE_URL}favourites`
const getApiUrlFavoritesDelete = (id) => `${BASE_URL}favourites/${id}`

const $spanError = document.getElementById('error')

async function loadRandomCats() {
    const response = await fetch(API_URL_RANDOM)
    const data = await response.json()
    console.log('loadRandomCats', data)

    if (response.status !== 200 ) {
        $spanError.innerHTML = `Hubo un error ${response.status} ${data.message}`
    } else {
        const $img1 = document.getElementById('img1')
        const $img2 = document.getElementById('img2')
        const $button1 = document.getElementById('btn1')
        const $button2 = document.getElementById('btn2')

        $img1.src = data[0].url
        $img2.src = data[1].url

        $button1.onclick = () => saveFavoriteCat(data[0].id)
        $button2.onclick = () => saveFavoriteCat(data[1].id)
    }
}

async function loadFavoriteCats() {
    const response = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
        }
    })
    const data = await response.json()
    console.log('loadFavoritesCats', data)

    if (response.status !== 200 ) {
        $spanError.innerHTML = `Hubo un error ${response.status} ${data.message}`
    } else {
        const $section = document.getElementById('favotireMichis')
        $section.innerHTML = ''
        const $h2 = document.createElement('h2')
        const h2Text = document.createTextNode('Gatitos favoritos')
        $h2.appendChild(h2Text)
        $section.appendChild($h2)

        data.forEach(cat => {
            const $article = document.createElement('article')
            const $img = document.createElement('img')
            const $button = document.createElement('button')
            const btnText = document.createTextNode('Eliminar michi de los favoritos')
            $button.appendChild(btnText)
            $img.src = cat.image.url
            $img.width = 150

            $button.onclick = () => deleteFavoriteCat(cat.id)

            $article.appendChild($img)
            $article.appendChild($button)
            $section.appendChild($article)
        }) 
    }
}

async function saveFavoriteCat(id) {
    const response = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        },
        body: JSON.stringify({
            image_id: id,
        }),
    })
    const data = await response.json()
    console.log('saveFavoriteCat', response)

    if (response.status !== 200 ) {
        $spanError.innerHTML = `Hubo un error ${response.status} ${data.message}`
    } else {
        loadFavoriteCats()
        console.log('Gato agregado a los favoritos')
    }
}

async function deleteFavoriteCat(id) {
    const response = await fetch(getApiUrlFavoritesDelete(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': API_KEY,
        }
    })
    const data = await response.json()

    if (response.status !== 200 ) {
        $spanError.innerHTML = `Hubo un error ${response.status} ${data.message}`
    } else {
        loadFavoriteCats();
        console.log('Gato eliminado de los favoritos')
    }
}

loadRandomCats()
loadFavoriteCats()
