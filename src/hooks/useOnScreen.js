// React
import { useState, useEffect, useRef } from "react";

// Tracks the visibility of elements on the screen
export default function useOnScreen(options) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // setIsIntersecting(entry.isIntersecting);
       if (entry.isIntersecting) {
         setIsIntersecting(true); // Only set true once
         observer.disconnect(); // Stop observing once visible
       }
    }, options);

    // Store current ref in a variable
    const currenRef = ref.current;

    // Start observing if ref is valid
    if (currenRef) observer.observe(currenRef);

    // Cleanup the observer when the component is unmounted or when ref changes
    return () => {
      if (currenRef) observer.unobserve(currenRef);
    };
  }, [options]); // Run only when options change

  return [ref, isIntersecting];
}
