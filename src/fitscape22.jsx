import React, { useState } from "react";
import ClothingStore from "./productlisting1";
import FitscapeFooter from "./footer";

// Helper function for color compatibility
function colorCompatibility(color1, color2) {
  const goodCombos = [
    ["black", "white"], ["navy", "white"], ["red", "black"], ["blue", "yellow"], ["pink", "grey"], 
    ["green", "white"], ["beige", "brown"], ["purple", "yellow"], ["orange", "blue"], ["white", "denim"], 
    ["black", "grey"], ["red", "white"], ["blue", "white"], ["brown", "cream"], ["olive", "tan"], 
    ["teal", "coral"], ["maroon", "gold"], ["navy", "grey"], ["yellow", "grey"], ["pink", "white"], 
    ["black", "beige"], ["white", "khaki"], ["blue", "khaki"], ["red", "denim"], ["white", "green"], 
    ["black", "red"], ["white", "blue"], ["grey", "pink"], ["grey", "yellow"], ["navy", "pink"], 
    ["brown", "blue"], ["cream", "olive"], ["tan", "navy"], ["coral", "teal"], ["gold", "maroon"], 
    ["grey", "navy"], ["grey", "yellow"], ["white", "pink"], ["beige", "black"], ["khaki", "white"], 
    ["khaki", "blue"], ["denim", "white"], ["denim", "red"], ["green", "white"]
  ];
  const c1 = color1.trim().toLowerCase();
  const c2 = color2.trim().toLowerCase();
  return goodCombos.some(function(pair) {
    const [a, b] = pair;
    return (a === c1 && b === c2) || (a === c2 && b === c1);
  });
}

// Outfit Compatibility Checker Component
function OutfitCompatibilityChecker() {
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = function() {
    if (!color1 || !color2) {
      setResult("Please enter both colors.");
      return;
    }
    if (color1.trim().toLowerCase() === color2.trim().toLowerCase()) {
      setResult("Try mixing two different colors for a stylish combo!");
      return;
    }
    setResult(
      colorCompatibility(color1, color2)
        ? "Cool! These colors go well together."
        : "Not a great match. Try another combo."
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6">
      <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
        <div className="flex flex-col items-center w-full md:w-1/2">
          <label className="mb-2 font-semibold text-gray-700">Outfit 1 Color</label>
          <input
            type="text"
            value={color1}
            onChange={function(e) { setColor1(e.target.value); }}
            placeholder="e.g. navy, red, beige"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2">
          <label className="mb-2 font-semibold text-gray-700">Outfit 2 Color</label>
          <input
            type="text"
            value={color2}
            onChange={function(e) { setColor2(e.target.value); }}
            placeholder="e.g. white, black, pink"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
      </div>
      <button
        onClick={handleCheck}
        className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors mt-2"
      >
        Check Compatibility
      </button>
      {result && (
        <div className={"mt-4 text-xl font-bold " + (result.includes("Cool") ? "text-green-600" : result.includes("not") ? "text-red-500" : "text-yellow-600") }>
          {result}
        </div>
      )}
    </div>
  );
}

// Main component
export default function FitscapeHero() {
  const [img8, setImg8] = React.useState("https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop&crop=face");
  const [img9, setImg9] = React.useState("https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=300&h=200&fit=crop&crop=face");
  const [img3, setImg3] = React.useState("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop&crop=face");
  
  React.useEffect(() => {
    const loadImages = async () => {
      try {
        if (window.fs) {
          // Load your uploaded images
          const image1Data = await window.fs.readFile('image-1.jpg');
          const image2Data = await window.fs.readFile('image-2.jpg'); 
          const image3Data = await window.fs.readFile('image-3.jpg');
          
          setImg8(URL.createObjectURL(new Blob([image1Data])));
          setImg9(URL.createObjectURL(new Blob([image2Data])));
          setImg3(URL.createObjectURL(new Blob([image3Data])));
        }
      } catch (error) {
        console.log('Using fallback images');
      }
    };
    loadImages();
  }, []);

  // Category images - female fashion focused
  const img10 = "https://i.pinimg.com/736x/e0/2a/3b/e02a3be82cb40ed11454d52ecb666b69.jpg"; // Women's casual wear
  const img11 = "https://i.pinimg.com/736x/7c/32/11/7c32113ccdbd82c29442a9b7ca833deb.jpg"; // Women's formal wear
  const img12 = "https://i.pinimg.com/736x/34/37/9a/34379ad2e43b5d990bf8ff97d9bde17d.jpg";
  const img21 = "https://i.pinimg.com/1200x/25/d1/5e/25d15e68233504703e862fc6009f7b88.jpg";
  const img22 = "https://i.pinimg.com/736x/e1/c4/8f/e1c48f5811501dbc5684ea295f0b234e.jpg";  // Women's hero page

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-purple-200 to-purple-100 relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-12 py-8">
        <div className="text-4xl font-bold tracking-[0.3em] text-gray-800">
          FITSCAPE
        </div>
        <nav className="flex items-center space-x-12 text-lg text-gray-700">
          <a href="#" className="hover:text-gray-900 transition-colors">New arrivals</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Customize</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Try out 3d</a>
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
            <svg className="w-7 h-7 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-180px)] px-12">
        <div className="max-w-7xl w-full grid grid-cols-12 gap-12 items-center">
          
          {/* Left Model Image */}
          <div className="col-span-4 relative">
            <div className="w-[400px] h-[500px] bg-purple-400 rounded-full relative overflow-hidden mx-auto">
              <img
                src={img21}
                alt="Model"
                className="absolute inset-0 w-full h-full object-contain z-10"
              />
              {/* Pink accent shape */}
              <div className="absolute top-12 right-16 w-24 h-12 bg-pink-300 rounded-full transform rotate-12 opacity-80"></div>
            </div>
          </div>

          {/* Center Text Content */}
          <div className="col-span-4 text-center">
            <div className="relative">
              {/* Yellow accent circle */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-yellow-400 rounded-full opacity-80"></div>
              
              <h1 className="text-7xl font-bold text-gray-900 leading-tight mb-12 relative z-10">
                <span className="text-8xl">"</span>swipe.
                <br />
                style.  
                <br />
                  Slay It<span className="text-8xl">"</span>
              </h1>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-md mx-auto">
                Create your own outfits. Preview them in 3D, 
                and get personalized style suggestions that 
                match your body, mood and vibe. Fitscape is 
                your digital fashion playground - from sketch 
                to play.
              </p>
              
              <div className="flex justify-center space-x-6">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 px-10 rounded text-lg transition-colors">
                  Shop Now
                </button>
                <button className="border-2 border-gray-400 hover:border-gray-600 text-gray-700 font-semibold py-4 px-10 rounded text-lg transition-colors">
                  Collections
                </button>
              </div>
            </div>
          </div>

          {/* Right Model Images */}
          <div className="col-span-4 rounded-2xl  space-y-8">
            {/* Top right image */}
            
              <img 
                src={img22}
                alt="Model in casual outfit"
                className="w-full h-full object-cover"
              />
            
            
          
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full opacity-40 blur-sm"></div>
      <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-pink-200 rounded-full opacity-40 blur-sm"></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-yellow-200 rounded-full opacity-40 blur-sm"></div>
      <div className="absolute top-1/3 left-1/5 w-28 h-28 bg-purple-300 rounded-full opacity-30 blur-sm"></div>
      <div className="absolute bottom-1/3 right-1/5 w-20 h-20 bg-pink-300 rounded-full opacity-30 blur-sm"></div>

      {/* Outfit Compatibility Checker Section */}
      <section className="py-24 px-12 bg-gradient-to-r from-purple-100 via-pink-50 to-yellow-50 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Outfit Compatibility Checker</h2>
            <p className="text-xl text-gray-600 mb-4">Enter two outfit colors to see if they make a stylish match!</p>
          </div>
          <OutfitCompatibilityChecker />
        </div>
      </section>

      {/* Body Structure Suggestions Section */}
      <section className="py-24 px-12 bg-gradient-to-br from-yellow-50 via-purple-50 to-pink-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Select Your Body Type</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose your body type to get personalized clothing recommendations that flatter your shape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 items-stretch">
            {/* Pear Shape */}
            <div className="flex flex-col items-center bg-purple-100 p-8 rounded-3xl shadow-xl hover:bg-purple-200 transition-colors">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <ellipse cx="12" cy="10" rx="7" ry="9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pear Shape</h3>
              <p className="text-gray-600 mb-4 text-center">Wider hips and thighs, smaller bust and shoulders.</p>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-semibold transition-colors mt-auto">Show Outfits</button>
            </div>
            {/* Apple Shape */}
            <div className="flex flex-col items-center bg-pink-100 p-8 rounded-3xl shadow-xl hover:bg-pink-200 transition-colors">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <ellipse cx="12" cy="12" rx="8" ry="9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Apple Shape</h3>
              <p className="text-gray-600 mb-4 text-center">Fuller midsection, broader shoulders, slimmer legs.</p>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold transition-colors mt-auto">Show Outfits</button>
            </div>
            {/* Hourglass Shape */}
            <div className="flex flex-col items-center bg-yellow-100 p-8 rounded-3xl shadow-xl hover:bg-yellow-200 transition-colors">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-14 h-14 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 3c0 4 3 6 3 9s-3 5-3 9h12c0-4-3-6-3-9s3-5 3-9H6z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Hourglass Shape</h3>
              <p className="text-gray-600 mb-4 text-center">Balanced bust and hips, defined waist.</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full font-semibold transition-colors mt-auto">Show Outfits</button>
            </div>
            {/* Rectangle Shape */}
            <div className="flex flex-col items-center bg-blue-100 p-8 rounded-3xl shadow-xl hover:bg-blue-200 transition-colors">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="12" height="16" rx="6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Rectangle Shape</h3>
              <p className="text-gray-600 mb-4 text-center">Similar width for bust, waist, and hips.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-colors mt-auto">Show Outfits</button>
            </div>
          </div>
        </div>
      </section>
    <ClothingStore/>
     
    
      {/* Categories Section */}
      <section className="py-24 px-12 bg-gradient-to-br from-purple-50 via-yellow-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center bg-purple-100 p-6 rounded-2xl shadow-lg hover:bg-purple-200 transition-colors h-full min-h-[420px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Casual Wear</h3>
              <div className="w-full flex-1 flex items-center justify-center mb-4">
                <img 
                  src={img10}
                  className="w-full max-h-56 rounded-2xl object-cover shadow"
                  alt="Casual Wear"
                />
              </div>
              <p className="text-gray-600 text-center mt-auto">Comfortable and stylish outfits for everyday wear.</p>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-center bg-pink-100 p-6 rounded-2xl shadow-lg hover:bg-pink-200 transition-colors h-full min-h-[420px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Formal Wear</h3>
              <div className="w-full flex-1 flex items-center justify-center mb-4">
                <img 
                  src={img11}
                  className="w-full max-h-56 rounded-2xl object-cover shadow"
                  alt="Formal Wear"
                />
              </div>
              <p className="text-gray-600 text-center mt-auto">Elegant attire for special occasions and events.</p>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center bg-yellow-100 p-6 rounded-2xl shadow-lg hover:bg-yellow-200 transition-colors h-full min-h-[420px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Sportswear</h3>
              <div className="w-full flex-1 flex items-center justify-center mb-4">
                <img 
                  src={img12}
                  className="w-full max-h-56 rounded-2xl object-cover shadow"
                  alt="Sportswear"
                />
              </div>
              <p className="text-gray-600 text-center mt-auto">Activewear designed for performance and comfort.</p>
            </div>
          </div>
        </div>
      </section>
      <FitscapeFooter/>
    </div>
  );
}