import sideimage from './sideimg.png'
function MyCreateRoleType(props) {
	console.log('data from list ', props.userData?.user_types)
	return (
		<div>


			<h1 className='text-3xl text-cyan-600 '>Role : {props.userData?.role}</h1>
			{
				props.userData?.user_types.map((data) => (

					<>
						<span></span>
						<div className="max-w-sm w-1\3 lg:max-w-1\3 lg:inline-flex m-5">
							<div className="h-24 lg:h-auto lg:w-36 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ "background-image": `url(${sideimage})` }} title="Woman holding a mug">
							</div>
							<div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
								<div className="mb-8">
									<p className="text-sm text-gray-600 flex items-center">
										<svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
											<path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
										</svg>
										{/* <h1>members only  {data.id}</h1> */}
									</p>
									<div className="text-gray-900 font-bold text-xl mb-2">{data.user_type}</div>

								</div>
								<div className="flex items-center">
									<img className="w-10 h-10 rounded-full mr-4" src="https://static.vecteezy.com/system/resources/previews/000/420/940/original/avatar-icon-vector-illustration.jpg" alt="Avatar of Jonathan Reinink" />
									<div className="text-sm">
										<p className="text-gray-900 leading-none">Jonathan Reinink</p>
										<p className="text-gray-600">Aug 18</p>
									</div>
								</div>
							</div>
						</div>
					</>
				))
			}
		</div>

	);
}

export default MyCreateRoleType;

