import React, { Fragment, useRef } from "react";
import ComboCard from "../../Components/Home/ComboCard";
import ClientReviewCard from "../../Components/Home/ClientReviewCard";
import Slider from "react-slick";
const ClientReview = (props) => {
  const { title, introduction } = props;
  const reviews = [
    {
      id: 1,
      image: "",
      review:
        "Amazing experience with the desert safari! The dune bashing was thrilling.",
      name: "John Doe",
      address: "Downtown Dubai",
      rating: 5,
    },
    {
      id: 2,
      image: "",
      review: "The Dubai Marina cruise was breathtaking, especially at sunset.",
      name: "Jane Smith",
      address: "Palm Jumeirah",
      rating: 4,
    },
    {
      id: 3,
      image: "",
      review:
        "Burj Khalifa is a must-see! The view from the top is incredible.",
      name: "Michael Johnson",
      address: "Jumeirah Beach Residence",
      rating: 5,
    },
    {
      id: 4,
      image: "",
      review: "The Dubai Aquarium was fascinating. My kids loved it!",
      name: "Sarah Williams",
      address: "Deira",
      rating: 4,
    },
    {
      id: 5,
      image: "",
      review: "The city tour was well-organized, but a bit rushed.",
      name: "David Brown",
      address: "Al Barsha",
      rating: 3,
    },
    {
      id: 6,
      image: "",
      review: "Dubai Miracle Garden is a floral paradise. Highly recommend!",
      name: "Emma Davis",
      address: "Business Bay",
      rating: 5,
    },
    {
      id: 7,
      image: "",
      review:
        "The evening dhow cruise was relaxing, but the food could be better.",
      name: "Chris Wilson",
      address: "Dubai Marina",
      rating: 3,
    },
    {
      id: 8,
      image: "",
      review:
        "Loved the traditional markets in Old Dubai. Great place to shop.",
      name: "Sophia Taylor",
      address: "Al Fahidi",
      rating: 4,
    },
    {
      id: 9,
      image: "",
      review:
        "The Ski Dubai experience was unique. Hard to believe it's in the desert!",
      name: "Liam Martinez",
      address: "Mall of the Emirates",
      rating: 5,
    },
    {
      id: 10,
      image: "",
      review: "The Dubai Frame is a cool attraction, but the queue was long.",
      name: "Olivia Anderson",
      address: "Al Kifaf",
      rating: 4,
    },
  ];

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      {/* Testimonial Start */}
      <div className="container-fluid testimonial pb-5">
        <div className="container pb-5">
          <div
            className="text-center mx-auto pb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 800 }}
          >
            <h1 className="display-5 text-capitalize mb-3">
              Our Clients<span className="text-primary"> Reviews</span>
            </h1>
            <p className="mb-0">
              Voices of Delight: Travelpack365`s Cherished Travellers Discover
              what our customers have to say about Travelpack365. Read their
              reviews and testimonials to see why we are their preferred choice.
            </p>
          </div>
          <div
            className="owl-carousel testimonial-carousel wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div class="container-fluid categories pb-5">
              <div class="container pb-5">
                <Slider
                  ref={(slider) => {
                    sliderRef = slider;
                  }}
                  {...settings}
                >
                  {reviews.map((item, index) => (
                    <div key={index} className="px-1">
                      <ClientReviewCard item={item} />
                    </div>
                  ))}
                </Slider>
                <div className="md:flex  justify-between">
                  {/* {comboList &&
                  comboList.slice(0, 8).map((item, index) => (
                    <div className="md:w-[24%] mb-2" key={index}>
                      <ComboCard item={item} />
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}
    </Fragment>
  );
};

export default ClientReview;
