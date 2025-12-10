import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="px-4">
        <div className="items-left grid grid-cols-1 md:grid-cols-5 gap-20">
          
          <div>
            <h3 className="text-lg font-bold mb-4">CORPORATE</h3>
            <ul>
              <li>Corporate</li>
              <li>Careers</li>
              <li>Impact</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">ABOUT</h3>
            <ul>
              <li>Privacy Policy</li>
              <li>Copyright</li>
              <li>Terms of Use</li>
              <li>Your Privacy Choices</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">WWE.COM</h3>
            <ul>
              <li><a href="https://www.wwe.com/news" target="_blank" rel="noopener noreferrer">WWE News</a></li>
              <li><a href="https://www.wwe.com/videos" target="_blank" rel="noopener noreferrer">WWE Videos</a></li>
              <li><a href="https://www.wwe.com/photos" target="_blank" rel="noopener noreferrer">WWE Photos</a></li>
              <li><a href="https://onlocationexp.com/wwe?utm_source=wwe.com&utm_medium=referral&utm_campaign=wwe-footer" target="_blank" rel="noopener noreferrer">Priority Pass</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">HELP</h3>
            <ul>
              <li>Security</li>
              <li>Help Center</li>
              <li>Cookie Policy</li>
              <li>Closed Captions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-7">FOLLOW US</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/WWE" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-4xl">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/wwe/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-4xl">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/user/WWEFanNation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-4xl">
                <FaYoutube />
              </a>
            </div>
          </div>

        </div>

        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} WWE Universe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
