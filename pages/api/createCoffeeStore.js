import { table, getMinifiedRecords } from '@/lib/airtable';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();
        if (findCoffeeStoreRecords.length) {
          const record = getMinifiedRecords(findCoffeeStoreRecords);
          res.json(record);
        } else {
          // create record

          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: 'name is missing' });
          }
        }
      } else {
        res.status(400);
        res.json({ message: 'id is missing' });
      }
    } catch (error) {
      res.status(500);
      res.json('Error creating or finding a store', error);
    }
  }
};

export default createCoffeeStore;
