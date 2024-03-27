import React from 'react'
import { Container } from 'react-bootstrap'

const ImageComp = ({ image }) => {

  console.log(image, "image is this ")
  return (
    <div class="image-container mb-2">
        <img src={image} alt='Image' />
    </div>
  )
}

export default ImageComp
