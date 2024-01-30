// api.js

const BASE_URL = 'https://collegeapplicationbackend.onrender.com';

export const getEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/event`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch events');
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
