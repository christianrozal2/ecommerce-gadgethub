import Banner from '../components/Banner';

export default function Error() {

	const data = {
		title: "404 - Not found",
		content: "The page you are looking for cannot be found",
		destination: "/",
		label: "Back home"
	}

	return (
		<div className="flex-grow md:px-14 sm:px-12 px-6">
			<Banner data={data}/>
		</div>
	)
}