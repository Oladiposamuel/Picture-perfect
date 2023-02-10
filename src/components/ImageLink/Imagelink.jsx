import React, { useContext, useEffect, useRef, useState } from 'react';
import './imagelink.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
import { defaultTransition, defaultTransitionSlow } from '../../utils/transition';
import { TitleContext } from '../../context/titleContext';
import { useIsImageVisible } from '../../screens/Home/Home';


const Imagelink = ({index, element, gridVisible, id}) => {

  const { setTitle, setColor, setShowDefault } = useContext(TitleContext);

  const imageRef = useRef(null);

  const isImageVisible = useIsImageVisible(imageRef);

  //console.log(isImageVisible);

  return (

   <motion.img
   id={id}
   ref={imageRef}
   className='grid-item-media'
   src={element.cover} 
   title={element.title}
   loading="eager"
   //decoding='async'
   layoutId={`container-${index}`}
   transition={defaultTransitionSlow}
   whileHover={gridVisible && {scale: 1.1}}
   
   onHoverStart={() => {
    {gridVisible && setTitle(element.title)};
    {gridVisible && setColor(element.color)};
    {gridVisible &&setShowDefault(false)};
   }} 
   onHoverEnd={() => {
    {gridVisible && setTitle(null)};
    {gridVisible && setColor(null)};
    {gridVisible &&setShowDefault(true)};
   }}

   onClick={() => {
    setTitle(element.title);
    setColor(element.color);
    setShowDefault(false);
   }}

   />

  )
}

export default Imagelink