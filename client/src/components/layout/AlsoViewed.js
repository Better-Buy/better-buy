import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Grid } from "@mui/material"
import AlsoViewedProductList from "./AlsoViewedProductList"
import Loader from "../layout/Loader"
import Message from "../layout/Message"

export default function AlsoViewed(props) {
  const { sku } = useParams()

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [viewed1Sku, setViewed1Sku] = useState([])
  const [viewed2Sku, setViewed2Sku] = useState([])
  const [viewed3Sku, setViewed3Sku] = useState([])

  const [viewed1MainImage, setViewed1MainImage] = useState([])
  const [viewed2MainImage, setViewed2MainImage] = useState([])
  const [viewed3MainImage, setViewed3MainImage] = useState([])

  const [viewed1Name, setViewed1Name] = useState([])
  const [viewed2Name, setViewed2Name] = useState([])
  const [viewed3Name, setViewed3Name] = useState([])

  const [viewed1Price, setViewed1Price] = useState([])
  const [viewed2Price, setViewed2Price] = useState([])
  const [viewed3Price, setViewed3Price] = useState([])

  const [averageScore1, setAverageScore1] = useState([])
  const [averageScore2, setAverageScore2] = useState([])
  const [averageScore3, setAverageScore3] = useState([])

  const [count1, setCount1] = useState([])
  const [count2, setCount2] = useState([])
  const [count3, setCount3] = useState([])

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY
    fetch(
      "https://api.bestbuy.com/v1/products/" +
        sku +
        "/alsoViewed?apiKey=" +
        API_KEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result)
          if (result.results.length) {
            setIsLoaded(true)

            setViewed1Sku(result.results[0].sku)
            setViewed2Sku(result.results[1].sku)
            setViewed3Sku(result.results[3].sku)

            setViewed1MainImage(result.results[0].images.standard)
            setViewed2MainImage(result.results[1].images.standard)
            setViewed3MainImage(result.results[3].images.standard)

            setViewed1Name(result.results[0].names.title)
            setViewed2Name(result.results[1].names.title)
            setViewed3Name(result.results[3].names.title)

            setViewed1Price(result.results[0].prices.current)
            setViewed2Price(result.results[1].prices.current)
            setViewed3Price(result.results[3].prices.current)

            setAverageScore1(result.results[0].customerReviews.averageScore)
            setAverageScore2(result.results[1].customerReviews.averageScore)
            setAverageScore3(result.results[2].customerReviews.averageScore)

            setCount1(result.results[0].customerReviews.count)
            setCount2(result.results[1].customerReviews.count)
            setCount3(result.results[2].customerReviews.count)
          } else {
            console.log("Data isn't being fetched.")
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [sku])

  if (error) {
    return <Message variant="error">{error.message}</Message>
  } else if (!isLoaded) {
    return <Loader />
  } else {
    return (
      <div
        style={{
          marginBottom: "8vh",
        }}
      >
        <p className="also-viewed">Customers Also Viewed</p>
        <Grid container justifyContent="space-around">
          <AlsoViewedProductList
            sku={viewed1Sku}
            name={viewed1Name}
            price={viewed1Price}
            mainImage={viewed1MainImage}
            score={averageScore1}
            count={count1}
          />
          <AlsoViewedProductList
            sku={viewed2Sku}
            name={viewed2Name}
            price={viewed2Price}
            mainImage={viewed2MainImage}
            score={averageScore2}
            count={count2}
          />
          <AlsoViewedProductList
            sku={viewed3Sku}
            name={viewed3Name}
            price={viewed3Price}
            mainImage={viewed3MainImage}
            score={averageScore3}
            count={count3}
          />
        </Grid>
      </div>
    )
  }
}
