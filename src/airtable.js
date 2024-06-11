// src/airtable.js

const AIRTABLE_API_KEY = import.meta.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.AIRTABLE_BASE_ID;
const AIRTABLE_TOKEN_ID = import.meta.env.AIRTABLE_TOKEN_ID;
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

export const getRecords = async (tableName) => {
  try {
    const response = await fetch(`${AIRTABLE_API_URL}/${tableName}?sort[0][field]=${'name'}&sort[0][direction]=asc`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'X-Token-ID': AIRTABLE_TOKEN_ID,  // Add Token ID in headers
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching records: ${response.statusText}`);
    }

    const data = await response.json();

    return data.records;
  } catch (error) {
    console.error('Error fetching records from AirTable:', error);
    throw error;
  }
};
