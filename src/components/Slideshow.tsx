// feed array of images 
// make each image be fed into the card component 
// make animation somehow 
// export and place on homepage 
'use client'
import { useState, useEffect, useRef } from "react";
import Card from "./Card"
import image1 from '/public/slideshow_tweets/meatball_fruit_blur.png'
import image2 from '/public/slideshow_tweets/cereal_blur.png'
import image3 from '/public/slideshow_tweets/sonic_blur.png'
import image4 from '/public/slideshow_tweets/grandma_blur.png'
import image5 from '/public/slideshow_tweets/dump_blur.png'
import image6 from '/public/slideshow_tweets/cops_blur.png'

const Slideshow = () => {

    //using array of img paths to map over and feed to slideshow 
    const images = [
        image1, 
        image2, 
        image3, 
        image4, 
        image5, 
        image6,
    ]
  


  return (
    <div className="slideshow-container">
     
        {images.map((image, idx) => (
          <Card key={idx} imgPath={image} />
        ))}

      </div>

    
  );
};

export default Slideshow