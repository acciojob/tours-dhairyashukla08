import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) return <main id="main"><Loading /></main>;

  if (tours.length === 0) {
    return (
      <main id="main">
        <div className="title">
          <h2>No tours left</h2>
          <button className="btn" onClick={fetchTours}>Refresh</button>
        </div>
      </main>
    );
  }

  return (
    <main id="main">
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};

export default App;
