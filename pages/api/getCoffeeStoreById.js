import { findRecordByFilter } from '@/lib/airtable';

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const record = await findRecordByFilter(id);
      if (record.length) {
        res.json(record);
      } else {
        res.json({ message: `id could not be found` });
      }
    } else {
      res.status(400);
      res.json({ message: `Id is missing` });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: 'Something went wrong', error });
  }
};

export default getCoffeeStoreById;
