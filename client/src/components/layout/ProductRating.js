import React, {Component} from 'react'
import Ratings from 'react-ratings-declarative';


export default class ProductRating extends Component {
  
        constructor(props) {
            super(props)
            this.state = {
                x: this.props.customerRating
            }
        }
        render() {
        if(this.state.x = null) {
            return (
                <div>no ratings</div>
            )
        }
       
      else return (
        <Ratings
          rating={this.props.customerRating}
          widgetDimensions="40px"
          widgetSpacings="15px"
        >
          <Ratings.Widget widgetRatedColor="Gold" widgetSpacing="1px" widgetDimension="15px" />
          <Ratings.Widget widgetRatedColor="Gold" widgetSpacing="1px" widgetDimension="15px" />
          <Ratings.Widget widgetRatedColor="Gold" widgetSpacing="1px" widgetDimension="15px" />
          <Ratings.Widget widgetRatedColor="Gold" widgetSpacing="1px" widgetDimension="15px" />
          <Ratings.Widget widgetRatedColor="Gold" widgetSpacing="1px" widgetDimension="15px" />
        </Ratings>
      );
    }
  }
