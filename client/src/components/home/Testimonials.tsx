import { Star, StarHalf } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Green Harvest Collective",
    role: "Urban Farming Cooperative",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    content: "We connected three urban farmers with a marketing specialist and a retail expert. Together, we've created a thriving local food collective with equitable profit sharing. The revenue sharing templates were invaluable.",
    rating: 5
  },
  {
    name: "Sustainable Materials Innovation",
    role: "Research & Production Collaborative",
    image: "https://images.unsplash.com/photo-1562788869-4ed32648eb72",
    content: "Our team of scientists, designers, and manufacturers found each other through Eco-Collective. We're now developing biodegradable packaging solutions with a business model that rewards all contributors fairly.",
    rating: 5
  },
  {
    name: "Solar Commons Project",
    role: "Community Energy Initiative",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    content: "We've established a community-owned solar installation that shares profits among all participants. The platform helped us find technical experts, legal advisors, and community organizers who all share our values.",
    rating: 4.5
  }
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(Math.floor(rating))].map((_, i) => (
        <Star key={i} className="text-yellow-400 fill-yellow-400 h-5 w-5" />
      ))}
      {rating % 1 === 0.5 && <StarHalf className="text-yellow-400 fill-yellow-400 h-5 w-5" />}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h3 className="font-medium">{testimonial.name}</h3>
          <p className="text-sm text-neutral-600">{testimonial.role}</p>
        </div>
      </div>
      <blockquote className="text-neutral-800 italic">"{testimonial.content}"</blockquote>
      <div className="mt-4">
        <RatingStars rating={testimonial.rating} />
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900">Success Stories</h2>
          <p className="mt-4 text-lg text-neutral-800 max-w-3xl mx-auto">
            See how collaborators are building sustainable businesses together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
