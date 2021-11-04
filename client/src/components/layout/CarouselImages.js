import React, {Component} from 'react'

import Family from '../../assets/img/Family.jpg'
import Gaming from '../../assets/img/Gaming.jpg'
import Processor from '../../assets/img/Processor.jpg'

import makeCarousel from 'react-reveal/makeCarousel';
// we'll need the Slide component for sliding animations
// but you can use any other effect
import Slide from 'react-reveal/Slide';
import styled, { css } from 'styled-components';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 65vw;
  height: 79vh;
  margin: auto;
`;

const CarouselUI = ({ children }) => <Container>{children}</Container>;
const Carousel = makeCarousel(CarouselUI);

export default class CarouselImages extends Component {


render() {
    return (
        <Carousel defaultWait={4500} /*wait for 4500 milliseconds*/ >
          <Slide right>
            <div>
              <img classname="carousel-image" src={Family} alt="Family"></img>
            </div>
          </Slide>
          <Slide right>
            <div>
            <img classname="carousel-image" src={Gaming} alt="Gaming"></img>
            </div>
          </Slide>
          <Slide right>
            <div>
            <img classname="carousel-image" src={Processor} alt="Processor"></img>
            </div>
          </Slide>
        </Carousel>
      );
    }
}