import { Link } from "react-router";

const Video = () => {
  return (
    <div className="w-full !h-[500px] md:h-full overflow-hidden flex items-center justify-center relative">
      <video
        src="../../../public/video/homeVid.webm"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        className="w-full h-full object-cover pointer-events-none"
      >
        Your browser does not support the video tag.
      </video>
      
      {/* Text  */}
      <div className="absolute inset-0 sm:flex hidden  items-center inter-Puma lg:ml-30 p-4 md:p-8">
        <div className="text-left w-full max-w-4xl mobile:text-center mobile:text-black text-white">
          <div className="text-inherit">
            <div className="heading-base">
              <h1 className="pointer-events-auto font-bold text-3xl md:text-4xl lg:text-5xl  mb-2">
                BACK TO SCHOOL READY
              </h1>
            </div>
            <p className="pointer-events-auto mt-1 text-sm md:text-lg lg:text-xl  mb-6">
              CLOSET REFRESH. CONFIDENCE ON.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 xs:gap-4 mt-3 mobile:justify-center justify-start">
            <Link 
              to="/categorypage?gender=women"
              className="text-black bg-white px-6 py-3 font-bold text-sm md:text-base hover:bg-gray-200 transition-colors cursor-pointer pointer-events-auto whitespace-nowrap uppercase tracking-wide"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;