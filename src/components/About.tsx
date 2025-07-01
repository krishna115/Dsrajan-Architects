import aboutImage from '../assets/about.jpg'; // Replace with your image

export default function About() {
  return (
    <section id="about" className="bg-[#f8f8f8] py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-12 relative">

       {/* Left: Image with fixed height */}
<div className="w-full md:w-[50%]">
  <div className="h-[400px] w-full overflow-hidden rounded shadow-md">
    <img
      src={aboutImage}
      alt="About DSrajan"
      className="w-full h-full object-cover"
    />
  </div>
</div>


        {/* Right: Title + Description */}
        <div className="w-full md:w-[50%] flex flex-col justify-between">
          {/* Title aligned to top */}
          <div className="mb-6">
            <h2 className="text-5xl font-semibold text-gray-900 leading-tight">
              About <span className="font-light">/ DSrajan Architects</span>
            </h2>
          </div>

          {/* Description aligned to bottom of image */}
          <div className="mt-auto text-gray-700">
            <p className="text-lg font-medium mb-3">
              DSrajan Architects is a team of experienced architects and interior designers.
            </p>
            <p className="text-base leading-relaxed">
              Passionate about creating beautiful, functional spaces.
              We believe that good design should be accessible to everyone,
              and we work hard to bring our clients' visions to life with thoughtful and timeless architecture.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
