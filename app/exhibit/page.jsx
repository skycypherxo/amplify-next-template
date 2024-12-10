import React from 'react';
import Image from 'next/image';

const page = () => {
  const Exhibitors = 30
  const Stalls = 20
  return (
    <div className='tracking-wide'>
      <div className='relative flex justify-center items-center' >
        {/* Background Image */}
        <div
          style={{
            backgroundImage: "url('/exihibit_image.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "90vh",
            width: "100vw",
            position: "relative",
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div className='absolute max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[80%] xl:max-w-[65%] px-4'>
          {/* Heading */}
          <h1 className="font-bold text-4xl sm:text-5xl text-white relative md:text-6xl lg:text-7xl font-montserrat tracking-wide">
            EXHIBIT WITH US
            <span className=" block mt-3 h-1 bg-white w-3/5 md:w-[70%] lg:w-[60%] xl:w-[60%] 2xl:w-[55%] "></span>
          </h1>

          {/* Paragraph */}
          <p className='text-white mt-10  text-md md:text-lg lg:text-lg leading-relaxed 2xl:text-2xl xl:mt-20 font-montserrat font-light text-justify'>
            The event provides an unparalleled networking opportunity, enabling exhibitors to engage
            with key decision-makers, potential collaborators, and like-minded changemakers. It serves
            as a powerful medium to attract partners, investors, and supporters who resonate with their
            vision and values. Additionally, exhibitors can gain valuable insights through interactions
            and feedback, fostering the exchange of ideas that can inspire new projects and
            collaborations.
            <br /><br />
            Beyond visibility and networking, exhibitors benefit from the event’s media coverage, digital
            outreach, and promotional activities, which further amplify their brand and initiatives.
            Exhibiting at the Maha CSR Event is more than just a showcase it’s an opportunity to build
            meaningful connections, drive impactful collaborations, and contribute to shaping a
            sustainable future.
          </p>
        </div>
      </div>
      <br />
      <div className='h-[50vh] flex justify-center items-center flex-col  mt-5'>
        {/* Heading */}
        <div className=' flex justify-center items-center flex-col xl:max-w-[90%] '>
          <div className='w-3/4'>
            <h1 className="font-bold text-4xl sm:text-5xl  relative md:text-6xl lg:text-7xl font-montserrat text-center ">
              Why Exhibit?
              <span className=" block mt-3 h-1 bg-black "></span>
            </h1>
          </div>
          <br />
          <p className=' md:w-3/4 mt-3 text-md lg:text-2xl p-3 font-montserrat text-justify'>The exhibition area at the Maha CSR Summit offers an interactive platform where
            organizations can display their most impactful CSR Projects, technologies, and solutions.
            This dynamic showcase allows participants to explore and engage with real world
            applications of CSR, facilitating networking and knowledge exchange. it highlights
            successful initiatives and provides practical examples of effective CSR in action
          </p>
        </div>
      </div>
      <br /><br /><br />
      <div className='flex justify-evenly items-center w-[90%] md:w-4/5 bg-[#153c5c] rounded-tr-[4rem]  md:rounded-tr-[6rem] text-center p-10 opacity-70 font-montserrat backdrop-blur-lg md:h-[40vh]'>
        <div>
          <h1 className='font-bold text-6xl md:text-8xl text-white '>{Exhibitors}</h1>
          <h2 className='font-bold text-3xl text-white pt-2'>Exhibitors</h2>
        </div>
        <div>
          <h1 className='font-bold text-6xl md:text-8xl text-white'>{Stalls}</h1>
          <h2 className='font-bold text-3xl text-white pt-2'>Stalls</h2>
        </div>
      </div>
      <div className='h-[10vh] md:h-[30vh] w-[10vh]'>
          {/* GAP */}
      </div>
      <div>
        <div className='flex justify-center items-center flex-col  gap-3 p-3 '>

          <h1 className="font-bold text-4xl sm:text-5xl  relative md:text-6xl lg:text-7xl font-montserrat text-center md:w-1/2">
            Stall Layout
            <span className=" block mt-3 h-1 bg-black "></span>
          </h1>
          <div className='h-[2vh] md:h-[10vh] w-[10vh]'>
          {/* GAP */}
          </div>
          <div className="h-6/12 w-6/12">
            <Image
              src="/layout1.svg"
              alt="Description of the image"
              layout="responsive"
              width={1400}
              height={1000}
            />
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center p-4 h-[10vh] mt-10'>
      <button className='bg-[#153c5c] p-2 w-[20vh] md:w-[40vh] rounded-full text-white text-2xl font-bold hover:opacity-85'>REGISTER</button>
      </div>
      <div className='h-[6vh] md:h-[20vh] w-[10vh]'>
          {/* GAP */}
        </div>
    </div>
  );
};

export default page;
