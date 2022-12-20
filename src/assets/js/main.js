const urlAPI = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCu82jZmTCaggapyoeSBymoQ&part=snippet%2Cid&order=date&maxResults=10';
const contentVideos = null || document.getElementById('ContainerVideos');
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '50ee1ba6c8msh6274f85f1b5aff6p154e28jsn8f9dc2e41799',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlAPI) {
    const response = await fetch(urlAPI, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(urlAPI);
        let view = `
        ${videos.items.map(video => `
            <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
        `).slice(0,7).join('')}
        `; 
        contentVideos.innerHTML = view;
    } catch (error) {
        console.error(error);
    }
})();

fetch(urlAPI, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

