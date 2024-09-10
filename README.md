Here’s an updated README including the `usePolling` hook:

---

# `react-api-toolkit`

Welcome to `react-api-toolkit`, a versatile and powerful collection of React hooks for handling API requests, mutations, pagination, infinite scrolling, file uploads, polling, and more. Whether you're building a robust application or a simple prototype, `react-api-toolkit` simplifies your data-fetching needs and helps you focus on building great features.

## 🚀 Features

- **`useFetch`**: Fetch data with ease, handle loading and error states, and refetch data when needed.
- **`useMutation`**: Manage API mutations (POST, PUT, DELETE), track loading and error states, and handle success and failure scenarios.
- **`usePagination`**: Simplify paginated data fetching and management.
- **`useInfiniteScroll`**: Effortlessly implement infinite scrolling for your data-driven UIs.
- **`useUpload`**: Handle file uploads with progress tracking and multipart data support.
- **`usePolling`**: Automatically poll an API endpoint at regular intervals.

## 🔗 Installation

Install the package via npm or yarn:

```bash
npm install react-api-toolkit
```

or

```bash
yarn add react-api-toolkit
```

## 📚 Usage

### `useFetch`

Fetch data from an API and handle loading, error, and data states.

```typescript
import { useFetch } from 'react-api-toolkit';

const { data, loading, error, refetch } = useFetch({
  url: '/api/data',
  token: 'your-token',
  onSuccess: (data) => console.log('Data fetched successfully:', data),
  onError: (error) => console.error('Error fetching data:', error),
});

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
return <div>Data: {JSON.stringify(data)}</div>;
```

### `useMutation`

Perform mutations (POST, PUT, DELETE) and handle different states.

```typescript
import { useMutation } from 'react-api-toolkit';

const { data, loading, error, mutate } = useMutation({
  method: 'post',
  url: '/api/submit',
  data: { key: 'value' },
  onSuccess: (response) => console.log('Mutation successful:', response),
  onError: (error) => console.error('Mutation error:', error),
});

const handleSubmit = async () => {
  await mutate();
};

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
return <button onClick={handleSubmit}>Submit</button>;
```

### `usePagination`

Manage paginated data fetching.

```typescript
import { usePagination } from 'react-api-toolkit';

const { data, loading, error, fetchNextPage } = usePagination({
  url: '/api/data',
  params: { page: 1, size: 10 },
});

return (
  <div>
    {loading && <div>Loading...</div>}
    {error && <div>Error: {error}</div>}
    {data && (
      <div>
        <ul>
          {data.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
        <button onClick={fetchNextPage}>Load More</button>
      </div>
    )}
  </div>
);
```

### `useInfiniteScroll`

Implement infinite scrolling with ease.

```typescript
import { useInfiniteScroll } from 'react-api-toolkit';

const { data, loading, error, loadMore } = useInfiniteScroll({
  url: '/api/infinite',
  params: { page: 1, size: 10 },
});

return (
  <div>
    {loading && <div>Loading...</div>}
    {error && <div>Error: {error}</div>}
    {data && (
      <div>
        <ul>
          {data.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
        <button onClick={loadMore}>Load More</button>
      </div>
    )}
  </div>
);
```


### `useUpload`

Handle file uploads with progress.

```typescript
import { useUpload } from 'react-api-toolkit';

const { progress, error, upload } = useUpload({
  url: '/api/upload',
  onSuccess: (response) => console.log('Upload successful:', response),
  onError: (error) => console.error('Upload error:', error),
});

const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {
    upload(event.target.files[0]);
  }
};

return (
  <div>
    <input type="file" onChange={handleUpload} />
    {progress && <div>Upload progress: {progress}%</div>}
    {error && <div>Error: {error}</div>}
  </div>
);
```

### `usePolling`

Poll an API endpoint at regular intervals.

```typescript
import { usePolling } from 'react-api-toolkit';

const { data, loading, error } = usePolling({
  url: '/api/polling',
  interval: 5000, // Poll every 5 seconds
  onSuccess: (data) => console.log('Polling data:', data),
  onError: (error) => console.error('Polling error:', error),
});

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
return <div>Data: {JSON.stringify(data)}</div>;
```

## 🛠️ Development

To build the package:

```bash
npm run build
```

## 📦 Publishing

To publish your package to npm:

1. Ensure you're logged in:

    ```bash
    npm login
    ```

2. Publish:

    ```bash
    npm publish
    ```

## 💬 Support

For any issues or questions, please open an issue on [GitHub](https://github.com/AnTIdoTe003/react-api-toolkit).

---

Feel free to adjust any specifics based on your package’s features and your preferred documentation style.
