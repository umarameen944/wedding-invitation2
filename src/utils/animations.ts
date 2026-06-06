import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollTrigger = () => {
  ScrollTrigger.defaults({
    markers: false,
  });
};

export const revealFromBottom = (
  element: Element | string,
  options: gsap.TweenVars = {}
) => {
  return gsap.fromTo(
    element,
    { y: 80, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      ...options,
    }
  );
};

export const revealFromLeft = (
  element: Element | string,
  options: gsap.TweenVars = {}
) => {
  return gsap.fromTo(
    element,
    { x: -60, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      ...options,
    }
  );
};

export const staggerReveal = (
  elements: Element[] | string,
  options: gsap.TweenVars = {}
) => {
  return gsap.fromTo(
    elements,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      ...options,
    }
  );
};

export const createScrollReveal = (
  trigger: string | Element,
  animation: () => gsap.core.Tween | gsap.core.Timeline,
  scrollOptions: ScrollTrigger.Vars = {}
) => {
  return ScrollTrigger.create({
    trigger,
    start: 'top 80%',
    onEnter: animation,
    once: true,
    ...scrollOptions,
  });
};

export const createParallax = (
  element: string | Element,
  speed: number = 0.5
) => {
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

export const goldShimmer = (element: string | Element) => {
  return gsap.to(element, {
    backgroundPosition: '200% center',
    duration: 3,
    ease: 'none',
    repeat: -1,
  });
};

export const floatAnimation = (
  element: string | Element,
  amplitude: number = 20,
  duration: number = 4
) => {
  return gsap.to(element, {
    y: -amplitude,
    duration,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
  });
};
