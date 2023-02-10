import React from 'react'
import { useState, useEffect } from "react"

export function useIsVisible(ref) {
    const [isIntersecting, setIntersecting] = useState(false);
  
    useEffect(() => {

      let options = {
        threshold: 1.0
      }

      const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
        
        , options
      );
  
      observer.observe(ref.current);
      
      return () => {
        observer.disconnect();
      };
    }, [ref]);
  
    return isIntersecting;
  }

