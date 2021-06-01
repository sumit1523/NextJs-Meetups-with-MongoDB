import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
const Homepage = (props) => {
	//   const [loadedMeetups, setLoadedMeetups] = useState([]);
	useEffect(() => {
		// send a http request and fetch data
		// setLoadedMeetups(DUMMY_MEETUPS);
	}, []);
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Add your own meetups and create amazing networls"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
};

// export const getServerSideProps = async (context) => {
// 	const req = context.req;
// 	const res = context.res;
//   //fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
	// fetch data from an API
	const client = await MongoClient.connect(
		'mongodb+srv://sumit1523:GO.clear@1523@cluster0.zmhg6.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();
	const meetupCollection = db.collection('meetups');
	const meetups = await meetupCollection.find().toArray();
	client.close();
	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
};

export default Homepage;
