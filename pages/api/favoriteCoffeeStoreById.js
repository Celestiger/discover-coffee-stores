import { findRecordByFilter, table, getMinifiedRecords } from '@/lib/airtable';

const favoriteCoffeeStoreById = async (req, res) => {
  if (req.method === 'PUT') {
    const { id } = req.body;

    try {
      if (id) {
        const ferchedRecord = await findRecordByFilter(id);
        if (ferchedRecord.length) {
          const record = ferchedRecord[0];
          const calculateVoting = parseInt(record.voting) + 1;

          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculateVoting,
              },
            },
          ]);

          if (updateRecord) {
            const minifiedRecord = getMinifiedRecords(updateRecord);
            res.json(minifiedRecord);
          }
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
  }
};

export default favoriteCoffeeStoreById;
