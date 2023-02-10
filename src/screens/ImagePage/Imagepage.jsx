import React, { useContext, useEffect, useState, useRef } from 'react';
import './imagepage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useAnimation, useMotionValue, useMotionValueEvent, useTime } from 'framer-motion';
import { TitleContext } from '../../context/titleContext';
import Loader from '../../components/Loader/Loader';
import { defaultTransition } from '../../utils/transition';
import jsonData from '../../utils/data.json';
import { BiPlayCircle } from 'react-icons/bi';
import { BiPauseCircle } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { useIsVisible } from '../../hooks/isBtnVisible';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ArrowLeft } from 'react-feather';
import { BsArrowUpRight } from 'react-icons/bs';

const Imagepage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, color, setTitle, setColor, setSlug } = useContext(TitleContext);

  const [inPlay, setInPlay] = useState(true);

  const [containerWidth, setContainerWidth] = useState();

  const [seconds, setSeconds] = useState(30);

  const [bool, setBool] = useState(false);

  const [visible, setVisible] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [percentage, setPercentage] = useState(0);

  const [size, setSize] = useState();

  const loaderControls = useAnimation();

  const nextControls = useAnimation();

  const nextBtnControls = useAnimation();

  const containerX = useMotionValue(0);

  const bgColor = useMotionValue("white");

  const mapData = Array.from(jsonData);

  const data = mapData.filter((x) => {
    return x.id==id;
  })

  const container = useRef(null);

  const containerControls = useAnimation();

  const buttonRef = useRef(null);

  const isVisible = useIsVisible(buttonRef);

  //console.log(isVisible);

  useEffect(() => {

    if(isVisible) {
      //setSeconds(5);

      async function sequence() {
        handleNextClick();
      }

        if (percentage > 60) {
          setTimeout(() => {
            handleNextClick();
          }, 0) 
        }

    }

  }, [isVisible, percentage, refresh])


  useEffect(() => {

    setVisible(false);

    setContainerWidth(-Math.abs(container.current.offsetWidth + container.current.offsetWidth/2));

    setTimeout(() => {

      loaderControls.start({
        y: '-105vh',
        transition: {type: 'spring', ease: 'easeInOut', duration: 3, delay: .25}
      })

      // loaderControls.start({
      //   opacity: 0,
      //   zIndex: -1,
      //   transition: {defaultTransition},
      // });
    }, 3000)

    containerControls.set({
      x: 0,
    })

    nextControls.set({
      y: 0,
      opacity: 0,
      zIndex: -1
    })

  }, [refresh])
  

  if (inPlay && !size) {
    containerControls.start({
      x: containerWidth,
      transition: {type: 'tween', duration: seconds, delay: 0}
    });
  } else if (!inPlay && !size) {
    containerControls.stop();
    //setSeconds(15);
  }


  const handleClick = (e) => {
    if (e && e.preventDefault) { 
      e.preventDefault()
    }

    setInPlay(!inPlay);
    setBool(!bool);
  }


  const handleNextClick = (refresh) => {

    setSeconds(30);

    setPercentage(0);

    containerControls.set({
      x: 0,
    })

    async function sequence () {

      nextControls.set({
        y: 0,
        zIndex: 30, 
        opacity: 1
      })

      if (id < 15 ) {
        navigate(`/view/${+id + 1}`);
      } else if (id == 15) {
        navigate(`/view/1`);
      } else if (id > 15) {
        navigate(`/view/1`);
      }

      containerControls.set({
        x: 0,
      })

      await nextControls.start({
        y: '-105vh',
        transition: {type: 'spring', ease: 'easeInOut', duration: 4, delay: .25}
      })
      .then(() => {
        //refresh = setRefresh(!refresh);
      })

    }

    sequence();

  }
  
  useEffect(() => {
    setTimeout(() => {
      if (percentage < 100 && isVisible) {
        setPercentage(percentage + 1);
      }
    }, 50);


    let mql = window.matchMedia('(max-width: 1023px)');
  
    //console.log(mql.matches);

    setSize(mql.matches);
    
  }, [percentage, isVisible, refresh]);

  const onMoveBack = (e) => {
    e.preventDefault();

    setTitle('picture perfect');
    setColor('black');

    navigate('/');
  }

  const onMoveExternal = (e) => {
    e.preventDefault();

    if(id == 1) {
      window.open("https://unsplash.com/@aiony", '_blank');
    }

    if(id ==2) {
      window.open("https://unsplash.com/@martino_pietropoli", '_blank');
    }

    if(id == 3) {
      window.open("https://unsplash.com/@davidhofmann", '_blank');
    }

    if(id ==4) {
      window.open("https://unsplash.com/@jovanvasiljevic", '_blank');
    }

    if(id ==5) {
      window.open("https://unsplash.com/@jabarib", '_blank');
    }

     if(id ==6) {
      window.open("https://unsplash.com/@lancereis", '_blank');
    }

    if(id ==7){
       window.open("https://unsplash.com/@raphaellovaski", '_blank');
    }

    if(id ==8){
      window.open("https://unsplash.com/@masaagungg", '_blank');
    }

    if(id ==9){
      window.open("https://unsplash.com/@princearkman", '_blank');
    }

     if(id ==10){
      window.open("https://unsplash.com/@jimmyferminphotography", '_blank');
    }

    if(id ==11){
      window.open("https://unsplash.com/@chrisjoelcampbell", '_blank');
    }

    if(id ==12){
      window.open("https://unsplash.com/@sbhnleo", '_blank');
    }

    if(id ==13){
      window.open("https://unsplash.com/@fireworks5_", '_blank');
    }

    if(id ==14){
      window.open("https://unsplash.com/@tifeclicks", '_blank');
    }

    if(id ==15){
      window.open("https://unsplash.com/@planeteelevene", '_blank');
    }
  }
  
  return (

    <>

      <Loader title={title} loaderControls={loaderControls} /> 

      <motion.div
        className='image-page-content "mq-value'
        style={{
          backgroundColor: bgColor,
          transition: 'background-color 1.25s ease-in-out'
        }}
      >
        
        <motion.div
          className='next-loader'
          animate={nextControls}
        >

        </motion.div>

        <motion.div
          ref={container}
          animate={containerControls}
          className='image-page-box'
        >

          <img src={data[0].image1} alt='img' className='image-page-img' />
          <img src={data[0].image2} alt='img' className='image-page-img' />
          <img src={data[0].image3} alt='img' className='image-page-img' />
          <img src={data[0].image4} alt='img' className='image-page-img' />

          <div className='big-button-box' ref={buttonRef}>   

            <div style={{ width: 150, marginLeft: 0, zIndex: 30, position: 'relative'}} className='circle'>
              <CircularProgressbar 
                value={percentage} 
                text={`${percentage}%`}
                styles={{
                  // Customize the root svg element
                  root: {},
                  // Customize the path, i.e. the "completed progress"
                  path: {
                    // Path color
                    stroke: `rgba(0, 0, 0, ${percentage / 100})`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Customize transition animation
                    transition: 'stroke-dashoffset 0.1s ease 0s',
                    // Rotate the path
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  // Customize the circle behind the path, i.e. the "total progress"
                  trail: {
                    // Trail color
                    stroke: '#ffffff',
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Rotate the trail
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  // Customize the text
                  text: {
                    // Text color
                    fill: '#000000',
                    // Text size
                    fontSize: '16px',
                    fontWeight: 'bold'
                  },
                  // Customize background - only used when the `background` prop is true
                  background: {
                    fill: '#ffffff',
                  },
                }}
              />
            </div>

          </div>

        </motion.div>
               
       
        <motion.div 
          className='icon-box'>
          { !inPlay && <BiPlayCircle className='icon' onClick={handleClick} /> }
          { inPlay && <BiPauseCircle className='icon'  onClick={handleClick} /> }
        </motion.div>

        <motion.div className='arrow-box-imagepage'>
          <ArrowLeft size={50} onClick={onMoveBack} className='arrow-left-imagepage' />
        </motion.div>

        <motion.div className='arrow-box-imagepage-small'>
          <ArrowLeft size={50} onClick={onMoveBack} className='arrow-left-imagepage' />
        </motion.div>

        <motion.div className='arrow-right-up-box'>
          <BsArrowUpRight size={25} onClick={onMoveExternal} className='arrow-right-up' />
        </motion.div>
        
      </motion.div>

    </>

  )
}

export default Imagepage
