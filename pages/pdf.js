import React, {useEffect} from 'react'
import Script from 'next/script'
import {useRouter} from "next/router"

const pdf = () => {
    const router = useRouter()
    useEffect(() => {
        document.getElementById("pdf").click()
        router.push("/")
    }, [])
    return (
        <div>
            <Script strategy="beforeInteractive" src="/bundle.js"></Script>
            <a target="_blank" id="pdf"></a>
        </div>
    )
}

export default pdf
