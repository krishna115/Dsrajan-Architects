import heroImage from '../assets/hero.jpg';


export default function Hero() {
  return (


<section
  className="h-screen bg-cover bg-center flex items-center justify-center text-white relative"
//   style={{
//     backgroundImage: `url('https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1920&q=80')`,
//   }}
  style={{ backgroundImage: `url(${heroImage})` }}

>

      <div className="relative z-10 text-center px-6 max-w-2xl">
<h1 className="text-5xl md:text-6xl font-medium leading-snug mb-4 text-gray-800">
  <span className="block">Every Space has its own story,</span>
  <span className="block">Let's create yours.</span>
</h1>
        
        <a
          href="#projects"
          className="inline-block px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-200 transition"
        >
          Explore Projects
        </a>
      </div>
    </section>
  );
}
