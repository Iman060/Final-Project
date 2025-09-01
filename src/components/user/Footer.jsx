import { FaFacebook, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiPuma } from "react-icons/si";
import CountrySelector from "../ui/CountrySelector";
import MobileFooter from "./MobileFooter";



const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden border-b border-gray-600">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-3 font-bold uppercase text-white flex justify-between items-center"
      >
        {title}
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};



const Footer = () => {
  const supportLinks = [
    { text: 'Contact Us', href: '/us/en/help/contact-us' },
    { text: 'NYC Flagship Store', href: '/us/en/puma/nyc' },
    { text: 'FAQ', href: '/us/en/help/faq' },
    { text: 'Las Vegas Flagship Store', href: '/us/en/puma/las-vegas' },
    { text: 'Shipping and Delivery', href: '/us/en/help/delivery' },
    { text: 'Store Locator', href: 'https://stores.puma.com/', external: true },
    { text: 'Return Policy', href: '/us/en/help/return-policy' },
    { text: 'Buy a Gift Card', href: 'https://puma.cashstar.com/store/recipient?locale=en-us', external: true },
    { text: 'Terms & Conditions', href: '/us/en/help/terms-and-conditions' },
    { text: 'Gift Card Balance', href: 'https://giftcard.puma.com/us/en/home', external: true },
    { text: 'Privacy Policy', href: '/us/en/help/privacy-policy' },
    { text: 'Service Discount', href: '/us/en/puma/service-discount' },
    { text: 'Promotion Exclusions', href: '/us/en/puma/sale-terms-and-conditions' },
    { text: 'Student Discount', href: 'https://connect.studentbeans.com/v4/hosted/puma/us', external: true },
    { text: 'Do Not Sell or Share My Information', href: '/us/en/do-not-sell-my-personal-information' },
    { text: 'Refer a Friend', href: 'https://us.puma.com/us/en/share', external: true },
    { text: 'Transparency in Supply Chain', href: 'https://about.puma.com/en/sustainability/social/modern-slavery', external: true },
    { text: 'Sitemap', href: 'https://us.puma.com/us/en/sitemap', external: true },
    { text: 'Cookie Settings', href: '/us/en#' }
  ];

  const aboutLinks = [
    { text: 'Company', href: 'https://about.puma.com/en/this-is-puma' },
    { text: 'Corporate News', href: 'https://about.puma.com/en/newsroom' },
    { text: 'Press Center', href: 'https://about.puma.com/en/newsroom' },
    { text: '#REFORM', href: '/us/en/reform' },
    { text: 'Investors', href: 'https://about.puma.com/en/investor-relations' },
    { text: 'Sustainability', href: 'https://about.puma.com/forever-better' },
    { text: 'Careers', href: 'https://us.puma.com/us/en/careers' }
  ];

  

  return (
    <footer className="inter-Puma relative bg-[#111] text-[#ffffffbf]" role="contentinfo" aria-label="Main Footer">
      <nav className=" py-8 lg:py-10 space-y-6 px-4" aria-label="Footer Nav">
        <div className="w-full max-w-screen-xl mx-auto">
          <div>
          <MobileFooter/>
        </div>
        <div className=" flex flex-col lg:flex-row justify-between gap-6">
          <div className="lg:flex-[2]">
            <div className="hidden lg:flex flex-col">
              <div className="text-[18px] text-white font-bold uppercase">Support</div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
                {supportLinks.map(({ text, href, external }) => (
                  <li key={text} className="flex">
                    <a
                      href={href}
                      target={external ? '_blank' : '_self'}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="hover:text-white text-sm transition-colors"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:flex-[1]">
            <div className="hidden lg:flex flex-col">
              <div className="text-[18px] text-white font-bold uppercase">About</div>
              <ul className="grid grid-cols-1 gap-y-1">
                {aboutLinks.map(({ text, href }) => (
                  <li key={text} className="flex">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white text-sm transition-colors"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:flex-[1] flex flex-col gap-4">
            <div className="hidden lg:flex flex-col">
              <div className="text-[18px] text-white font-bold uppercase">Stay up to date</div>
              <ul>
                <li>
                  <a href="#" className="hover:text-white text-sm transition-colors">
                    Sign Up for Email
                  </a>
                </li>
              </ul>
            </div>

            <div className="hidden lg:flex flex-col">
              <div className="text-[18px] text-white font-bold uppercase">Explore</div>
              <div className="flex flex-row gap-4 mt-2">
                <a
                  rel="noopener noreferrer"
                  href="https://app.puma.com/web-download"
                  target="_blank"
                  data-test-id="puma-app-footer-link"
                  className="p-1.5 flex flex-col items-center justify-center border border-puma-silver rounded-lg hover:border-white hover:rounded-lg focus:border-white focus:ring-2 focus:ring-gray-50 focus:rounded-lg"
                  title="THE BEST WAY TO SHOP"
                >
                  <SiPuma className='margin-auto pt-1.5 h-8 w-12' />
                  <div className='text-xs' ><h6>APP</h6></div>
                </a>

                <a 
                  href="http://pumatr.ac/app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="THE BEST WAY TO TRAIN"
                  className="p-1.5 flex flex-col items-center justify-center border border-puma-silver rounded-lg hover:border-white hover:rounded-lg focus:border-white focus:ring-2 focus:ring-gray-50 focus:rounded-lg"
                >
                  <SiPuma className='margin-auto pt-1.5 h-8 w-12' />
                  <div className='text-xs' ><h5>TRACK</h5></div>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
        

        <div
      data-test-id="footer-bottom"
      data-footer-position="bottom"
      className="w-full max-w-screen-2xl mx-auto grid gap-x-3 gap-y-6 grid-rows-[auto_1px_auto_auto] grid-cols-1 items-start xs:grid-rows-[auto_1px_auto] xs:grid-cols-2 lg:grid-rows-[1px_auto] lg:grid-cols-3 lg:items-center"
    >
      <div className="row-start-1 xs:row-start-1 xs:col-start-1 xs:col-span-2 lg:row-start-2 lg:col-start-2 lg:col-span-1 lg:justify-self-center">
        <button
          data-test-id="select-location"
          type="button"
          className="group tw-35txv7 tw-ozwx86 flex-row w-full lg:w-auto lg:mx-auto"
        >
          <div data-uds-child="icon" className="relative opacity-100">
            <svg
              data-uds-child="icon"
              aria-hidden="true"
              focusable="false"
              className="tw-3s3pxe tw-78qgvr w-[1em] h-[1em] tw-1h4nwdw tw-1jgcml9"
            >
              <use href="/_next/static/assets/icons/flag-us.svg#icon" xlinkHref="/_next/static/assets/icons/flag-us.svg#icon" />
            </svg>
          </div>
          <div
            data-uds-child="text-label"
            aria-hidden="false"
            className="relative font-bold uppercase px-2 text-base lg:px-3 lg:text-lg"
          >
            <div className="Country-select"><CountrySelector /></div>
          </div>
        </button>
      </div>
              
      <hr className="border-0 border-t border-puma-black-400 row-start-2 xs:row-start-2 xs:col-span-2 lg:row-start-1 lg:col-start-1 lg:col-span-3" />

      <div className="row-start-3 xs:row-start-3 lg:row-start-2 lg:col-start-1 lg:col-span-1">
        <div data-test-id="social-media-footer-links">
          <ul className="flex lg:gap-8 gap-5 justify-center lg:justify-start" role="menu" aria-label="More Inspiration">
            {[
              { href: "https://www.youtube.com/puma", label: "YouTube", icon: <FaYoutube /> },
              { href: "https://x.com/PUMA", label: "Twitter", icon: <FaXTwitter /> },
              { href: "https://www.pinterest.com/puma/", label: "Pinterest", icon: <FaPinterest /> },
              { href: "https://instagram.com/puma/", label: "Instagram", icon: <FaInstagram /> },
              { href: "https://www.facebook.com/PUMA/", label: "Facebook", icon: <FaFacebook /> },
            ].map((item) => (
              <li key={item.label} role="none">
                <a
                  className="group tw-4xsq9o tw-o47a5z"
                  role="menuitem"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={item.href}
                  data-uds-child="link-icon"
                  data-test-id={`social-${item.label.toLowerCase()}-social-link`}
                >
                  <div
                    data-uds-child="action-icon-icon"
                    className="tw-hzl1vp tw-11sn0o2 flex-none transition ease-out-expo duration-300 group-focus-visible:after::block tw-10skrdm"
                  >
                    <svg
                      data-uds-child="icon"
                      aria-hidden="true"
                      focusable="false"
                      className="tw-1q7uo4v tw-78qgvr w-[1em] h-[1em] tw-1h4nwdw tw-1jgcml9"
                    >
                      <use
                        href={`/_next/static/assets/icons/${item.icon}.svg#icon`}
                        xlinkHref={`/_next/static/assets/icons/${item.icon}.svg#icon`}
                      />
                    </svg>
                  </div>
                  <span 
                    data-uds-child="action-icon-label"
                    className="text-2xl font-bold leading-[1.15] transition ease-out-expo duration-300 "
                  >
                    {item.icon}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center lg:block text-gray-400 row-start-4 xs:row-start-3 lg:row-start-2 lg:col-start-3 lg:col-span-1">
        <div className="flex flex-col text-xs lg:text-right text-center text-neutral-40 ">
          <div data-test-id="copyright-notice">
            © PUMA made by <a href="https://github.com/Iman060" target="_blank" className="text-blue-400 font-semibold ">Iman060</a>
          </div>
          <ul data-test-id="footer-legal-section uppercase" role="menu">
            <li role="none">
              <a
                className="tw-1h4nwdw tw-1jgcml9 tw-1u5i0v3 tw-1tcc7ux underline-offset-0"
                role="menuitem"
                href="#"
                data-test-id="imprint-legal-data-link"
              >
                <span
                  data-uds-child="text-label"
                  className="font-inherit decoration-underline decoration-1 underline-offset-[0.18em]"
                  aria-hidden="false"
                >
                  A website written for educational purposes
                </span>
              </a>
            </li>
          </ul>
          <div data-test-id="forter-web-id">
            Student ID: <span className="whitespace-nowrap">230 106 047</span>
          </div>
        </div>
      </div>
    </div>
      </nav>
    </footer>
  );
};

export default Footer;