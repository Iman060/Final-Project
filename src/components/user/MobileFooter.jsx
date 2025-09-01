import { useState } from "react";
import { SiPuma } from "react-icons/si";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-600">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-3 font-bold uppercase text-white flex justify-between items-center"
      >
        {title}
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="pb-4 pl-2">{children}</div>}
    </div>
  );
};

const MobileFooter = () => {
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
    <div className="lg:hidden bg-[#111] text-[#ffffffbf] px-4 py-6 space-y-4">
      <Accordion title="Support">
        <ul className="space-y-1">
          {supportLinks.map(({ text, href, external }) => (
            <li key={text}>
              <a
                href={href}
                target={external ? "_blank" : "_self"}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-sm hover:text-white"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </Accordion>

      <Accordion title="About">
        <ul className="space-y-1">
          {aboutLinks.map(({ text, href }) => (
            <li key={text}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </Accordion>

      <Accordion title="Stay Up to Date">
        <a href="#" className="text-sm hover:text-white">
          Sign Up for Email
        </a>
      </Accordion>

      <Accordion title="Explore">
        <div className="flex gap-4">
          <a
            href="https://app.puma.com/web-download"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 flex flex-col items-center border border-puma-silver rounded-lg hover:border-white"
            title="THE BEST WAY TO SHOP"
          >
            <SiPuma className="h-8 w-12 pt-1.5" />
            <div className="text-xs">APP</div>
          </a>

          <a
            href="http://pumatr.ac/app"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 flex flex-col items-center border border-puma-silver rounded-lg hover:border-white"
            title="THE BEST WAY TO TRAIN"
          >
            <SiPuma className="h-8 w-12 pt-1.5" />
            <div className="text-xs">TRACK</div>
          </a>
        </div>
      </Accordion>
    </div>     
  );
};

export default MobileFooter;