import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className=" px-4 py-20 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className=" overflow-hidden bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Welcome to Text -> Speech Conversion.
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            This Project converts Your text to Speech with the help of
            DeepgramAPI
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/text-speech-playground"
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            >
              Get Started
            </Link>

            <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="https://playground.deepgram.com/?endpoint=speak"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
