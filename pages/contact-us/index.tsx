import Seo from "@/components/Seo";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import React, { FormEvent } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import poster from "@/public/images/aboutus.jpg";
import Image from "next/image";

type Props = {};

interface ContactFormElement extends EventTarget {
  name: {
    value: string;
  };
  email: {
    value: string;
  };
  phone: {
    value: string;
  };
  subject: {
    value: string;
  };
  message: {
    value: string;
  };
}

const index = (props: Props) => {
  const emailHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as ContactFormElement;
    const { name, email, phone, subject, message } = target;

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        phone: phone.value,
        subject: subject.value,
        message: message.value,
      }),
    });

    if (response.ok) {
      alert("Your message has been sent.");
      name.value = "";
      email.value = "";
      phone.value = "";
      subject.value = "";
      message.value = "";
    } else {
      alert("Failed to send your message. Please try again.");
    }
  };

  return (
    <>
      <Seo
        metaTitle="PK Entertainment | Contact Us"
        metaDesc="PK Entertainment Contact Us for more information"
        metaKey="Event Promotor"
      />
      <Header />

      <div className="relative h-[40.25vw]">
        <Image
          className="w-full h-[56.25vw] md:h-[40vw] lg:h-[40vw] object-cover brightness-[30%] lg:rounded-b-[100px]"
          src={poster}
          alt="poster"
        />
      </div>
      <div className="py-10 mt-10 max-w-[1600px] px-2 lg:px-0 mx-auto">
        <div className="w-full lg:h-screen h-full relative">
          <div className="bg-zinc-800/60 backdrop-blur-lg lg:w-5/12 w-full h-full lg:absolute block left-[15%] -top-[5%] z-30 rounded-3xl shadow-xl">
            <div className="px-10 lg:pt-36 pt-10 lg:pb-20 pb-5 h-full text-white">
              <div className="font-black lg:text-[70px] text-[30px] lg:absolute block top-[5%] -left-[20%]">
                <h1 className="">Contact Us</h1>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-zinc-800 w-[200px] h-[5px] -mt-4 ml-3 lg:block hidden"
                ></motion.div>
              </div>
              <h3 className="text-white pb-5 lg:pl-2 font-medium lg:text-[20px] text-[14px]">
                Send us a message
              </h3>
              <form
                className="flex h-full flex-col justify-between "
                onSubmit={emailHandler}
              >
                <div className="flex flex-col gap-6 text-white">
                  <input
                    className="bg-transparent border-white border-0 border-b-2 focus:border-0 focus:border-black placeholder:text-white"
                    placeholder="Full Name"
                    type="text"
                    name="name"
                    id="name"
                    required
                  />
                  <input
                    className="bg-transparent border-white border-0 border-b-2 focus:border-0 focus:border-black placeholder:text-white"
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                  <input
                    className="bg-transparent border-white border-0 border-b-2 focus:border-0 focus:border-black placeholder:text-white"
                    placeholder="Phone Number"
                    type="text"
                    name="phone"
                    id="phone"
                    required
                  />
                  <input
                    className="bg-transparent border-white border-0 border-b-2 focus:border-0 focus:border-black placeholder:text-white"
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    id="subject"
                    required
                  />
                  <textarea
                    className="bg-transparent border-white h-full rounded-lg focus:border-0 focus:border-black placeholder:text-white"
                    placeholder="Your Message"
                    name="message"
                    id="message"
                    required
                  ></textarea>
                  <div className="">
                    <button
                      type="submit"
                      className="bg-zinc-900 px-5 py-2 rounded-xl font-medium hover:bg-white hover:text-black transition-all"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full h-full block lg:absolute z-10 lg:rounded-[100px] rounded-md overflow-hidden">
            <iframe
              className="lg:absolute lg:w-[2000px] lg:h-[1400px] w-full  block lg:-top-[20%] brightness-75  lg:brightness-50 transition-all"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.300553065403!2d106.8395897763258!3d-6.224044260959967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f38cdaf8036f%3A0x5b089a7efa3cab9c!2sPK%20Entertainment!5e0!3m2!1sid!2sid!4v1683171210355!5m2!1sid!2sid"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default index;
