import React, {Component} from 'react'
import Ratings from 'react-ratings-declarative';


export default class ProductRating extends Component {
    
        render() {
        if(this.props.customerRating == null) {
            return (
                <div>N/A</div>
            )
        }
       
      else return (
        <Ratings
          rating={this.props.customerRating}
          widgetDimensions="40px"
          widgetSpacings="15px"
        >
          <Ratings.Widget widgetRatedColor="Gold" widgetSpacing="1px" widgetDimension="20px" />
          <Ratings.Widget widgetRatedColor="Gold" widgetSpacing="1px" widgetDimension="20px" />
          <Ratings.Widget widgetRatedColor="Gold" widgetSpacing="1px" widgetDimension="20px" />
          <Ratings.Widget widgetRatedColor="Gold" widgetSpacing="1px" widgetDimension="20px" />
          <Ratings.Widget widgetRatedColor="Gold" widgetSpacing="1px" widgetDimension="20px" />
        </Ratings>
      );
    }
  }
