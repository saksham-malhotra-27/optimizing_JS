# Web Performance Optimization
This project showcases different techniques to improve web performance, focusing on fetching data efficiently and implementing lazy loading for images.

## Fetching Data
### Direct Fetch
The forFetch button fetches user data directly from an API endpoint. When clicked, it displays user information such as ID, name, email, and phone number. It also measures the time taken for fetching and processing the data.

### Fetch via Cache
The forFetchc button fetches user data either from a cache or directly from the API if not available in the cache. It demonstrates how to utilize browser caching for faster data retrieval. Similar to the direct fetch, it displays user information and measures the time taken for fetching and processing.

## Image Loading
### Without Lazy Loading
This section demonstrates image loading without lazy loading. Images are fetched and displayed immediately when the page loads. The average time taken for fetching and displaying images is calculated and shown.

### With Lazy Loading
The lazy loading technique delays loading of images until they are needed, improving initial page load time. Images are fetched and displayed only when they come into view. The average time taken for fetching and displaying lazy-loaded images is calculated and shown.

## How to Run
- Clone this repository to your local machine.
- Open index.html in a web browser.
- Click the respective buttons to see the different techniques in action.
## Technologies Used
- JavaScript
- HTML
- CSS
## Credits
- API used for fetching user data: Dummy JSON
- API used for fetching images: The Cat API
## Feel free to explore and experiment with the code! If you have any questions or suggestions, please don't hesitate to reach out. Happy coding! 🚀





