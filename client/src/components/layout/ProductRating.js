import React, { Component } from 'react'
import Ratings from 'react-ratings-declarative'

export default class ProductRating extends Component {
  render() {
    if (this.props.customerRating == null) {
      return null
    } else
      return (
        <Ratings
          rating={this.props.customerRating}
          widgetDimensions="40px"
          widgetSpacings="15px"
        >
          <Ratings.Widget
            widgetRatedColor="#FFB75A"
            widgetSpacing="1px"
            widgetDimension="21px"
          />
          <Ratings.Widget
            widgetRatedColor="#FFB75A"
            widgetSpacing="1px"
            widgetDimension="21px"
          />
          <Ratings.Widget
            widgetRatedColor="#FFB75A"
            widgetSpacing="1px"
            widgetDimension="21px"
          />
          <Ratings.Widget
            widgetRatedColor="#FFB75A"
            widgetSpacing="1px"
            widgetDimension="21px"
          />
          <Ratings.Widget
            widgetRatedColor="#FFB75A"
            widgetSpacing="1px"
            widgetDimension="21px"
          />
        </Ratings>
      )
  }
}
