import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className=" px-4">
        <div className="items-left grid grid-cols-1 md:grid-cols-5 gap-7 ">
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
              <li>Copyriht</li>
              <li>Terms of Use</li>
              <li>Your Privacy Choices</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">WWE.COM</h3>
            <ul>
              <li>WWE News</li>
              <li>WWE Videos</li>
              <li>WWE Photos</li>
              <li>Priority Pass</li>
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
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/WWE" target="_blank" className="text-gray-400 hover:text-white">
                Facebook
              </a>
              <a href="https://twitter.com/WWE" target="_blank" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="https://www.instagram.com/wwe/" target="_blank" className="text-gray-400 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">&copy; 2025 WWE Universe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
