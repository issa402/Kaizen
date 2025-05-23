import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
    </div>
  );
}