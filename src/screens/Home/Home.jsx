import React, { useState, Suspense, lazy, useEffect, useRef, useContext } from 'react';
import './home.css';
import { motion, AnimateSharedLayout, AnimatePresence, useAnimation, useMotionValue, useSpring, transform } from 'framer-motion';
import Imagelink from '../../components/ImageLink/Imagelink';
import Imagelink1 from '../../components/ImageLink/Imagelink1';
import Loader from '../../components/Loader/Loader';
import jsonData from '../../utils/data.json';
import { Columns, Grid, ArrowLeft, ArrowRight } from 'react-feather';
import { Link, useParams } from 'react-router-dom';
import { defaultTransition } from '../../utils/transition';
import { defaultTransitionSlow } from '../../utils/transition';
import { TitleContext } from '../../context/titleContext';
//import { useIsImageVisible } from '../../hooks/isImageVisible';

export function useIsImageVisible(ref) {

  const { title, color, setTitle, setColor, showDefault, setShowDefault, scroll } = useContext(TitleContext);

  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {

    let options = {
      rootMargin: '0px 0px 0px 0px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting ) {

          async function load() {

            const data = jsonData.filter((x) => {
              return x.title == entry.target.title
            })

            await setTitle(null);

          //console.log(scroll);

          setTimeout(() => {
            if(scroll < 80) {
              setColor(data[0].color);
              setTitle(null);
            } else {
              setColor(data[0].color);
              setTitle(entry.target.title);
            }
          }, 100)

          }

          load();

        }
      })
    }
     , options
    );


    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, scroll]);

  return isIntersecting;
}

const Home = () => {

  const [gridVisible, setGridVisible] = useState(true);

  const [listJustify, setListJustify] = useState(false);

  const [distance, setDistance] = useState(0);

  const [hideArrow, setHideArrow] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const { title, color, setTitle, setColor, showDefault, setShowDefault, setScroll } = useContext(TitleContext);

  const mapData = Array.from(jsonData);

  const centerBox =  useRef(null);

  const gridRef = useRef(null);

  const listRef = useRef(null);

  const onScroll = () => {
    setScroll(listRef.current?.scrollLeft);
  }


  useEffect(() => {
    const element = document.getElementById('scroll-section-grid');

    gridVisible && element.scrollIntoView({behavior: "auto"});

  }, [gridVisible]);


  const gridUtils = [600, 400, 600, 800, 600];

  const loaderControls = useAnimation();

  const animation = useAnimation();

  const bgColor = useMotionValue("white");

  {color ? bgColor.set(color) : bgColor.set('white')};

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {

    setColor(null);
    setShowDefault(true);

    async function sequence() {

      animation.set((index) => ({
        y: gridUtils[index % 5],
        scale: 1.5,
      }))

      await animation.start(() => ({
        y: 0,
        transition: defaultTransition
      }))

      setTitle(null);

      bgColor.set("black");

      await animation.start(() => ({
        scale: 1.3,
        transition: defaultTransition
      }))

      bgColor.set("white");

      setTimeout(() => {
        setGridVisible(false);
        setTitle(null);
      }, 500) 

    }

    setTimeout(() => {
      sequence();
    }, 4800)

  }, [isLoading])

  const handleGridParallax = (e) => {
    const speed = 10;
    if(gridRef.current) {
      const {width, height } = gridRef.current.getBoundingClientRect();

      const offsetX = e.pageX - width * 0.5;
      const offsetY = e.pageY - height * 0.3;

      const newTransformX = (offsetX * speed) /60;
      const newTransformY = (offsetY * speed) /12;

      x.set(-newTransformX);
      y.set(-newTransformY);

    }
  }

  const xMotion = useSpring(x, {stiffness: 400, damping: 90});
  const yMotion = useSpring(y, {stiffness: 400, damping: 120});

  const justify = useMotionValue("center");

  if(listJustify) {
    justify.set("flex-start");
  }

  const onMoveLeft = (e) => {
    e.preventDefault();

    setTimeout(() => {
      setListJustify(true);
      setHideArrow(true);
    }, 1000)

  }

  useEffect(() => {
    const data = jsonData.map(({id, title, slug, color, image1, image2, image3, image4, ...rest}) => {
      return rest.cover
    })

    //console.log(data);

    cacheImages(data);
  }, [])

  const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();

        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      })
    })

    await Promise.all(promises);

    setTimeout(() => {
      setIsLoading(false);
    }, 5000)
  }


  return (
    <div className='home'>

    {isLoading && <Loader loaderControls={loaderControls} /> }

    <motion.header
    className='header-container header-btn'>
        <button onClick={() => {
            setGridVisible(!gridVisible);
            if(gridVisible==null) { setGridVisible(true) };
            x.set(0);
            y.set(0);

            setTitle(null);
            setColor(null);

            if(gridVisible) {
              setTitle(null);
            }

            if(gridVisible==null) {
              setTitle(null);
            }

            setScroll(0)
        }}>

          {gridVisible ? <Grid /> :  <Columns />}
        </button>
    </motion.header>

    {title && gridVisible && !showDefault &&
    <motion.div
    initial={{scale: 0}}
    animate={{scale: 1}}
    transition={{type:'tween', duration: .4, delay: .8}}
    style={{
      backgroundColor: bgColor,
      transition: 'background-color 1.25s ease-in-out'
    }}
    className='title-box'
    >
      <span className='title-text'>{ title }</span>
    </motion.div>}

    {title && !gridVisible && showDefault &&
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{type:'spring', duration: .4, delay: .8}}
    style={{
      backgroundColor: bgColor,
      transition: 'background-color 1.25s ease-in-out'
    }}
    className='title-box'
    >
       <span className='title-text'>{ title }</span>
    </motion.div>}

    <AnimatePresence>
    <motion.div
      className='content'
      style={{
        backgroundColor: bgColor,
        transition: 'background-color 1.25s ease-in-out'
      }}
    >
        {gridVisible && (
          <motion.div className='grid-container'
           >
            <motion.div className='grid-elements'
            transition={defaultTransition}
            onMouseMove={handleGridParallax}
            ref={gridRef}
            style={{
              x: xMotion,
              y: yMotion,
            }}
            >
              {mapData.map((element, index) => (
                <motion.div
                animate={animation}
                custom={index}
                className='element' key={index}>

                  <motion.div
                    layout={`container-box${index}`}
                    initial={{opacity: .5}}
                    animate={{opacity: 1, scaleX: 1}}
                    transition={{type: 'spring', ease: 'easeOut', duration: .3, delay: 0}}
                    className='thumbnail-wrapper'>
                    <Link to = {`/view/${element.id}`}><Imagelink1 element={element} index={index} gridVisible = {gridVisible} /></Link>
                  </motion.div>

                </motion.div>
              ))}
            </motion.div>

            {gridVisible && <div id='scroll-section-grid' className='grid-center' ref={centerBox} />}
          </motion.div>
        )}



        {!gridVisible && <>
          <motion.div className='list-elements'
          ref={listRef}
          onScroll={onScroll}
          style={ listJustify ? {justifyContent: justify, marginLeft: "100", transition: 'justifyContent 4s easeIn' } : {justifyContent: justify , transition: 'justifyContent 4s easeIn' } }
          >

            {mapData.map((element, index) => {
              //console.log(index);

              return(
                <motion.div
                initial={{x: 0}}
                animate={{x: distance}}
                transition={{type: 'spring',duration: .8, delay: .4, ease: 'easeInOut'}}
                 className='list-element' key={index}>

                  <motion.div
                    layoutId={`container-box${index}`}
                    initial={{opacity: 1}}
                    animate={{opacity: 1, scaleX: 1.1}}
                    transition={{type: 'spring', ease: 'easeOut', duration: 1.6, delay: .5}}
                    className='thumbnail-wrapper'>
                    <Link to = {`/view/${element.id}`}> <Imagelink element={element} index={index} id={element.id} /> </Link>
                  </motion.div>

                </motion.div>
              )})}

          </motion.div>
          </>}

          {!gridVisible &&
          <motion.div className='arrow-box'>
            {!hideArrow && <ArrowLeft size={50} onClick={onMoveLeft} className='arrow-left' />}
          </motion.div>
          }

      </motion.div>
      </AnimatePresence>

    </div>
  )
}

export default Home