import { ref } from 'vue'
import axios from 'axios'

export const searchItem = ref('')

const api = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    api_key: import.meta.env.VITE_APIKEY,
  },
})

export const gifs = ref([])
export const gif = ref()

export const getGifs = async () => {
  try {
    const resource = searchItem.value ? 'search' : 'trending'
    const response = await api(resource, { params: { q: searchItem.value } })
    gifs.value = response.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getGif = async id => {
  try {
    const response = await api(id)
    gif.value = response.data.data
  } catch (error) {
    console.log(error)
  }
}

export const cleanGif = () => (gif.value = null)
