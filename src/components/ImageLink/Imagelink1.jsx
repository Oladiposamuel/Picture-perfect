import React, { useContext, useEffect, useRef, useState } from 'react';
import './imagelink.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
import { defaultTransition, defaultTransitionSlow } from '../../utils/transition';
import { TitleContext } from '../../context/titleContext';
import { useIsImageVisible } from '../../screens/Home/Home';


const Imagelink1 = ({index, element, gridVisible, id}) => {

  const { setTitle, setColor, setShowDefault } = useContext(TitleContext);

  return (

   <motion.img
   className='grid-item-media'
   src={element.cover} 
   title={element.title}
   color={element.color}
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

export default Imagelink1