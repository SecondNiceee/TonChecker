'use client'
import dynamic from 'next/dynamic';
import React from 'react';


const Home = dynamic(() => import('@/views/Home'), {ssr : false});
const page = () => {
  return (
    <Home />
  );
};

export default page;