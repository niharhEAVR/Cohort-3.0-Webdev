import { useState, useEffect } from 'react'

export function useFetch(url) {
    const [post, setpost] = useState({})
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
        setLoading(true)
        await fetch(url)
        .then(res => res.json())
        .then(res => setpost(res))
        setLoading(false)
    })()
  }, [url]) // if we dont use dependency over here then everytime the post page no changes, the data will never get changes
  //thats why we have the dependency as url, to tell react that change the data also when the url changes
    return {
        post,
        loading
    }
}