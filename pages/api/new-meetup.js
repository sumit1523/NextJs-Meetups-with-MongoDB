// /api/new-meetup/
// POST /api/new-meetup/
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const data = req.body;

		const client = await new MongoClient.connect(
			'mongodb+srv://sumit1523:GO.clear@1523@cluster0.zmhg6.mongodb.net/meetups?retryWrites=true&w=majority',
			{ useUnifiedTopology: true }
		);
		const db = client.db();
		const meetupCollection = db.collection('meetups');
		const result = await meetupCollection.insertOne(data);
		console.log(result);
		client.close();
		res.status(201).json({ message: 'Meetup inserted!!' });
	}
};

export default handler;
