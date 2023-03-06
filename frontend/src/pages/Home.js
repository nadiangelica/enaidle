// import Container from 'react-bootstrap/Container';


// const Home = () => {
//     return(
//         // <Container>
//         <div>
//             <p className="intro">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
//             <h3>Sign up now!</h3>
//             <p>I am an:</p>
//             <button className="btn">Organisation</button>
//             <button className="btn">Individual</button>
//             <p className="small-paragraph">Already signed up?</p>
//             <button className="btn">Login</button>
//         </div>
//         // </Container>
//     )
// }

// export default Home;

import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../Styling/home.css'

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

 
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-90"
          src="https://victorytransformation.com/images/2020/02/23/untitled-design__1280x960.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Connecting organisations and individuals to create a positive impact  </h3>
          {/* <h6>Join us now and be a part of the change you want to see!</h6> */}
        </Carousel.Caption>
        </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          src="https://d13kjxnqnhcmn2.cloudfront.net/AcuCustom/Sitename/DAM/067/Legacy_for_large_charities_-_Main.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Together, we can build a stronger community</h3>
          <h6>Join us now and be a part of the change you want to see</h6>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-90"
          src="https://www.london.gov.uk/what-we-do/volunteering/search/sites/default/files/styles/content_image_large/public/components/image-with-text/City%20Harvest%20Heros%20%282%29.jpg?itok=XI5j3gSp"
          alt="Third slide"
        />
         <Carousel.Caption>
          <h3>Check out the opportunities on our feed</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;



