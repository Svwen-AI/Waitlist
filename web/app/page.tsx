import Footer from "./components/Footer";
import Form from "./components/Form";

export default function Home() {
  return (
    <>
      <section className="w-full min-h-screen flex">
        <div className="w-full lg:w-1/2 relative px-6 sm:px-8 flex flex-col items-center">
          <div className="w-full max-w-md flex flex-col items-start mt-20">
            <div>
              <img src="./logo.svg" alt="Logo" className="w-56 md:w-64 lg:w-72" />
            </div>
            <div className="w-full mb-15 mt-10">
              <Form />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 items-center justify-end">
          <img
            src="./vector.svg"
            alt="Vector"
            className="h-full w-auto object-contain"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
