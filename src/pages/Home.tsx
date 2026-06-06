import Hero from '@components/Hero/Hero';
import WeddingQuote from '@components/WeddingQuote/WeddingQuote';
import EventTimeline from '@components/EventTimeline/EventTimeline';
import Countdown from '@components/Countdown/Countdown';
import Venue from '@components/Venue/Venue';

import Celebration from '@components/Celebration/Celebration';
import Footer from '@components/Footer/Footer';

const Home = () => {
  return (
    <main id="main-content">
      <Hero />
      <WeddingQuote />
      <EventTimeline />
      <Countdown />
      <Venue />
      {/* <RSVP /> */}
      <Celebration />
      <Footer />
    </main>
  );
};

export default Home;
