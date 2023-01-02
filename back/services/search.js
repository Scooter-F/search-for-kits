import { initDB } from '../data/mongo.js'

const filter = async (req, res) => {
  try {
    const { term } = req.params;
    const { fuzzy = 'false', count = 5, pagenum = 0 } = req.query;
    const searchTerm = fuzzy === 'true' ? { $regex: new RegExp(`^${term}.*`) } : term;
    const toSkip = Number(count) * Number(pagenum);

    const db = await initDB();
    const results = await db.collection('kits')
      .find({ 'label_id': searchTerm })
      .limit(Number(count))
      .skip(toSkip)
      .toArray();
    res.json(results);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

export default {
  filter,
}