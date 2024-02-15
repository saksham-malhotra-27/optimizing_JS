// Fetching the initial data
const buttonForFetch = document.getElementById('forFetch');
const url = 'https://dummyjson.com/users/1';

buttonForFetch.addEventListener('click', () => {
    const initial = performance.now();
    let final;
    fetch(url)
        .then(res => {
            final = performance.now();
            return res.json();
        })
        .then(data => {
            const { id, firstName, lastName, email, phone } = data;
            const userInfo = `
                <p>ID: ${id}</p>
                <p>Name: ${firstName} ${lastName}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <p>Initial: ${Math.floor(initial)} ms</p>
                <p>Final: ${Math.floor(final)} ms</p>
                <p>Difference: ${Math.floor(final - initial)} ms</p>
            `;
            document.getElementById('targetFetch').innerHTML = userInfo;
        })
        .catch(error => console.error('Error fetching user data:', error));
});

document.getElementById('targetFetch').innerHTML = 'Click here to fetch';

// Fetching the data via cache
const buttonForFetchViaCache = document.getElementById('forFetchc');

const cacheName = 'cache1';

buttonForFetchViaCache.addEventListener('click', () => {
    const initial = performance.now();
    let final = 0;
    caches.open(cacheName)
        .then(cache => {
            cache.match(url)
                .then(resp => {
                    final=performance.now()
                    if (resp && resp.ok) { // Check if response exists and is OK
                        final = Math.floor(performance.now());
                        
                        return resp.text().then(resptext => {
                            resptext += `
                                <p>final : ${final}</p>
                                <p>initial : ${Math.floor(initial)}</p>
                                <p>diff: ${Math.floor(final-initial)}</p>
                            `;
                           return resptext // Get the response as text (HTML)
                        });

                    } else {
                        fetch(url)
                            .then(res => {
                                final = performance.now();
                                return res.json();
                            })
                            .then(data => {
                                const { id, firstName, lastName, email, phone } = data;
                                const userInfo = `
                                    <p>ID: ${id}</p>
                                    <p>Name: ${firstName} ${lastName}</p>
                                    <p>Email: ${email}</p>
                                    <p>Phone: ${phone}</p>
                                    <p>Initial: ${Math.floor(initial)} ms</p>
                                    <p>Final: ${Math.floor(final)} ms</p>
                                    <p>Difference: ${Math.floor(performance.now() - initial)} ms</p>
                                `;
                                document.getElementById('targetFetchc').innerHTML = userInfo;
                                return userInfo;
                            })
                            .then(userInfo => {
                                // Store data in the cache
                                cache.put(url, new Response(userInfo)); // Store HTML content in the cache
                            })
                            .catch(error => console.error('Error fetching user data:', error));
                    }
                })
                .then(htmlContent => {
                    // Set the cached HTML content to the target element
                    document.getElementById('targetFetchc').innerHTML = htmlContent;
                })
                .catch(error => console.error('Error fetching user data:', error));
        })
        .catch(err => {
            console.error(err);
        });
});

// W/O lazy loading

const size = 5;

const imgUrls  = 
[]

const fetchingImages = () => {
    const init = performance.now();
    const imgDiv = document.getElementById('imgVids');
    const imgUrls = []; 
    const fetchPromises = []; 
    for (let i = 0; i < size; i++) {
        fetchPromises.push(fetch('https://api.thecatapi.com/v1/images/search?')
            .then(res => res.json())
            .then(data => {
                imgUrls.push(data[0].url);
            })
        );
    }

    Promise.all(fetchPromises)
        .then(() => {
            imgUrls.forEach((url) => {
                const img = document.createElement('img');
                img.src = url;
                img.className = 'images';
                imgDiv.appendChild(img);
            });

            let result = (performance.now()-init).toFixed(4);
            document.getElementById('imgDiff').innerText += ` ${result}`;
            console.log(result);
        });
}

fetchingImages();

// Lazy implementation 
const imgUrlsLazy = [];
const lazyDiv = document.getElementById('lazy');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const init = performance.now();
            const img = entry.target;
            
            fetch('https://api.thecatapi.com/v1/images/search?')
                .then((res) => res.json())
                .then((data) => {
                    let src = data;
                    img.setAttribute('src', src[0].url);
                    observer.unobserve(img);
                    console.log("Img diff: " + (performance.now() - init).toFixed(4));
                });
        }
    });
}, { throttle: 500 }); 
// Specifying throttle interval directly here, decreases the render time by nearly half 


for (let i = 0; i < size; i++) {
    const img = document.createElement('img');
    img.className = 'images';
    lazyDiv.appendChild(img);
    observer.observe(img);
}


