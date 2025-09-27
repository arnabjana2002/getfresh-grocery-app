import { assets, footerLinks } from "../assets/assets.js";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        {/* Left Side */}
        <div>
          <img src={assets.logo} alt="logo" className="w-34 md:w-32" />

          <p className="max-w-[410px] mt-6">
            GetFresh is your one-stop online grocery store, delivering fresh and
            quality essentials right to your doorstep with ease and convenience.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="hover:underline transition">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Section */}
      <p className="py-4 text-center text-sm md:text-base text-gray-600/80">
        Copyright {new Date().getFullYear()} © <a href="#">GetFresh</a> All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
