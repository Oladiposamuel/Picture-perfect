import React, { useEffect, useContext } from 'react';
import './loader.css';
import { motion, AnimationControls, useMotionValue, animate } from 'framer-motion';
import { defaultTransition } from '../../utils/transition';
import { TitleContext } from '../../context/titleContext';

const Loader = ({loaderControls}) => {

  const { color, title, setTitle, setColor, slug } = useContext(TitleContext);

  const bgColor = useMotionValue(color ? color : 'black');

  //console.log(title);
  //console.log(color);

  useEffect(() => {
    bgColor.set(color);
  }, [])

  const variant = {
    initial: {
      y: 0,
      opacity: 1,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        staggerChildren: 0.1,
        delay: 0,
      }
    }
  }

  const letterVariant = {
    initial: {opacity : 0},
    animate: {opacity: 1}
  }

  return (
    <motion.div 
      className={title === 'picture perfect' ? 'full-loader-white' : 'full-loader-black'}
      animate={loaderControls}
      style={{
        //backgroundColor: color===null|undefined ? 'black' : bgColor,
        backgroundColor: bgColor,
        transition: 'background-color 1.25s ease-in-out'
      }}
    >

      <motion.h1
      variants={variant}
      initial="initial"
      animate="animate"
      className='big-title-text'
      >
        {
          title == 'picture perfect'|null|undefined ?
            <motion.div
            variants={variant}
            initial="initial"
            animate="animate"
            className='text'
            >
              <motion.div
              variants={letterVariant}>
                P
              </motion.div>
              <motion.div
              variants={letterVariant}
              >
                I
              </motion.div>
              <motion.div
              variants={letterVariant}>
                C
              </motion.div>
              <motion.div
              variants={letterVariant}>
                T
              </motion.div>
              <motion.div
              variants={letterVariant}>
                U
              </motion.div>
              <motion.div
              variants={letterVariant}>
                R
              </motion.div>
              <motion.div
              variants={letterVariant}>
                E
              </motion.div>
              <motion.div
              variants={letterVariant}>
                -
              </motion.div>
              <motion.div
              variants={letterVariant}>
                P
              </motion.div>
              <motion.div
              variants={letterVariant}>
                E
              </motion.div>
              <motion.div
              variants={letterVariant}>
                R
              </motion.div>
              <motion.div
              variants={letterVariant}>
                F
              </motion.div>
              <motion.div
              variants={letterVariant}>
                E
              </motion.div>
              <motion.div
              variants={letterVariant}>
                C
              </motion.div>
              <motion.div
              variants={letterVariant}>
                T
              </motion.div>


            </motion.div> :  title
        }
      </motion.h1>

    </motion.div>
  )
}

export default Loader