import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
      <div className="home-page">
        <header className="hero-section">
          <h1>Welcome to Airbnb Clone</h1>
          <p>Discover and book unique accommodations around the world.</p>
          <Link to="/spots">
          <button className="cta-button">Explore</button>
        </Link>
        </header>
        <section className="features-section">
          <div className="feature">
            <h2>Find Unique Places to Stay</h2>
            <p>Book homes, apartments, cabins, and more for your next trip.</p>
          </div>
          <div className="feature">
            <h2>Host Your Space</h2>
            <p>Earn money by renting out your unused space or property.</p>
          </div>
          <div className="feature">
            <h2>Book Experiences</h2>
            <p>Discover unique activities and experiences hosted by locals.</p>
          </div>
        </section>
        <section className="testimonials-section">
          <h2>What Our Guests Are Saying</h2>
          <div className="testimonial">
            <p>"I had an amazing stay with Airbnb. The place was stunning and the host was incredibly hospitable."</p>
            <span>- John Doe</span>
          </div>
          <div className="testimonial">
            <p>"Airbnb made my trip unforgettable. I found a hidden gem in a beautiful location."</p>
            <span>- Jane Smith</span>
          </div>
        </section>
        <footer className="footer-section">
          <p>&copy; 2023 Airbnb Clone. All rights reserved.</p>
          <Link to="/about" className="about-link">About</Link>
        </footer>
      </div>
    );
  }

  export default HomePage;
